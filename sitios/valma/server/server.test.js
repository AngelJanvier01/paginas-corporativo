'use strict';
const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { createApp } = require('./server');
let server, base, messages = [];
before(async () => {
    const app = createApp({ sendMail: async mail => { messages.push(mail); if (mail.text.includes('simulate failure')) throw new Error('smtp down'); } });
    server = await new Promise(resolve => { const instance = app.listen(0, '127.0.0.1', () => resolve(instance)); });
    base = `http://127.0.0.1:${server.address().port}`;
});
after(() => server.close());
const submit = (route, data, origin = base) => fetch(base + route, { method: 'POST', headers: { Origin: origin }, body: data });
const fields = () => { const form = new FormData(); form.set('nombre', 'Prueba'); form.set('correo', 'prueba@example.com'); return form; };
test('contacto envia al destino fijo y permite responder al remitente', async () => {
    const form = fields(); form.set('mensaje', 'Consulta de prueba');
    const response = await submit('/api/contacto', form);
    assert.equal(response.status, 200); assert.equal((await response.json()).ok, true);
    assert.equal(messages.at(-1).from, 'it@bioteczac.com'); assert.equal(messages.at(-1).to, 'direccion@ingenieriavalma.com');
    assert.equal(messages.at(-1).replyTo, 'prueba@example.com');
});
test('postulacion adjunta PDF en memoria y rechaza otro contenido', async () => {
    const form = fields(); form.set('area', 'Logística'); form.set('cv', new Blob(['%PDF-1.4\nexample'], { type: 'application/pdf' }), 'cv.pdf');
    assert.equal((await submit('/api/postulacion', form)).status, 200);
    assert.equal(messages.at(-1).attachments[0].content.toString(), '%PDF-1.4\nexample');
    const bad = fields(); bad.set('area', 'Logística'); bad.set('cv', new Blob(['no es pdf'], { type: 'application/pdf' }), 'cv.pdf');
    assert.equal((await submit('/api/postulacion', bad)).status, 400);
});
test('valida origen, campos y reporta fallo SMTP', async () => {
    const form = fields(); form.set('mensaje', 'Hola');
    assert.equal((await submit('/api/contacto', form, 'https://otro.example')).status, 403);
    const missing = fields(); assert.equal((await submit('/api/contacto', missing)).status, 400);
    const fail = fields(); fail.set('mensaje', 'simulate failure'); assert.equal((await submit('/api/contacto', fail)).status, 503);
});
test('no expone archivos internos del servidor', async () => {
    assert.equal((await fetch(base + '/server/server.js')).status, 404);
    assert.equal((await fetch(base + '/assets/clientes/FUENTES.md')).status, 404);
    assert.equal((await fetch(base + '/index.html')).status, 200);
});
