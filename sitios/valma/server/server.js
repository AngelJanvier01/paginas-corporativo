'use strict';

const path = require('node:path');
const express = require('express');
const multer = require('multer');
const { rateLimit } = require('express-rate-limit');
const nodemailer = require('nodemailer');

const site = path.resolve(__dirname, '..');
const sender = 'it@bioteczac.com';
const recipient = 'direccion@ingenieriavalma.com';
const maxPdf = 5 * 1024 * 1024;

function createApp(transport) {
    const app = express();
    app.disable('x-powered-by');
    app.use((req, res, next) => {
        res.set('X-Content-Type-Options', 'nosniff');
        res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
        next();
    });
    const limiter = rateLimit({ windowMs: 10 * 60 * 1000, limit: 30, standardHeaders: 'draft-8', legacyHeaders: false,
        message: { error: 'Se alcanzó el límite de intentos. Espera unos minutos y vuelve a intentarlo.' } });
    const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: maxPdf, files: 1, fields: 8, fieldSize: 8192, parts: 9 } });
    const clean = (value, max) => typeof value === 'string' ? value.trim().slice(0, max + 1) : '';
    const validEmail = value => value.length <= 254 && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,63}$/.test(value);
    const sameOrigin = (req, res, next) => {
        const origin = req.get('origin');
        try { if (origin && new URL(origin).host === req.get('host')) return next(); } catch {}
        return res.status(403).json({ error: 'No fue posible verificar la solicitud. Recarga la página e inténtalo otra vez.' });
    };
    app.post(['/api/contacto', '/api/postulacion'], limiter, sameOrigin, (req, res) => {
        upload.single('cv')(req, res, async error => {
            if (error) return res.status(400).json({ error: 'Revisa el archivo: debe ser PDF y pesar máximo 5 MB.' });
            const name = clean(req.body.nombre, 120);
            const email = clean(req.body.correo, 254);
            const message = clean(req.body.mensaje, 4000);
            const area = clean(req.body.area, 160);
            const isJob = req.path === '/api/postulacion';
            if (req.body.sitio) return res.status(200).json({ ok: true });
            if (!name || name.length > 120 || /[\r\n]/.test(name) || !validEmail(email) || message.length > 4000 || area.length > 160 || (!isJob && !message) || (isJob && !area)) {
                return res.status(400).json({ error: 'Revisa los campos e inténtalo de nuevo.' });
            }
            if (req.file && (!isJob || req.file.mimetype !== 'application/pdf' || req.file.buffer.subarray(0, 5).toString('ascii') !== '%PDF-')) {
                return res.status(400).json({ error: 'El currículum debe ser un archivo PDF válido de hasta 5 MB.' });
            }
            const body = [`Nombre: ${name}`, `Correo: ${email}`];
            if (isJob) body.push(`Área de interés: ${area}`);
            if (message) body.push('', 'Mensaje:', message);
            try {
                await transport.sendMail({ from: sender, to: recipient, replyTo: email,
                    subject: isJob ? 'Postulación desde el sitio de VALMA' : 'Consulta desde el sitio de VALMA',
                    text: body.join('\n'),
                    ...(req.file ? { attachments: [{ filename: 'curriculum.pdf', content: req.file.buffer, contentType: 'application/pdf' }] } : {}) });
                return res.json({ ok: true });
            } catch {
                return res.status(503).json({ error: 'No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a direccion@ingenieriavalma.com.' });
            }
        });
    });

    const staticFiles = new Set(['index.html', 'bolsa.html', 'tienda.html', 'empleados.html', 'aviso-privacidad.html', 'valma.css', 'productos-carrusel.js', 'formularios.js', 'images.json', 'logovalma.jpg', 'valma-insumos-web.jpg']);
    const imageOnly = (req, res, next) => /\.(?:jpe?g|jfif|png|apng|webp|gif|avif|svg|bmp|ico)$/i.test(req.path) ? next() : res.sendStatus(404);
    app.use('/images', imageOnly, express.static(path.join(site, 'images'), { fallthrough: false, dotfiles: 'deny', index: false }));
    app.use('/assets', imageOnly, express.static(path.join(site, 'assets'), { fallthrough: false, dotfiles: 'deny', index: false }));
    app.get('/health', (req, res) => res.json({ ok: true }));
    app.get('/{*file}', (req, res, next) => {
        const file = req.path === '/' ? 'index.html' : req.path.slice(1);
        if (!staticFiles.has(file)) return next();
        if (file === 'images.json') res.set('Cache-Control', 'no-store');
        return res.sendFile(path.join(site, file));
    });
    app.use((err, req, res, next) => res.status(err.status || 500).send('No disponible'));
    return app;
}

if (require.main === module) {
    if (!process.env.SMTP_APP_PASSWORD) throw new Error('Falta SMTP_APP_PASSWORD.');
    const transport = nodemailer.createTransport({ host: 'smtp.gmail.com', port: 587, secure: false, requireTLS: true, disableFileAccess: true, disableUrlAccess: true,
        auth: { user: sender, pass: process.env.SMTP_APP_PASSWORD }, connectionTimeout: 15000, greetingTimeout: 15000, socketTimeout: 30000 });
    createApp(transport).listen(Number(process.env.PORT) || 3000, '0.0.0.0', () => console.log('VALMA iniciado'));
}
module.exports = { createApp };
