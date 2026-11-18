$imageDirectory = Join-Path $PSScriptRoot 'images'
$manifest = Join-Path $PSScriptRoot 'images.json'
$files = @(Get-ChildItem -LiteralPath $imageDirectory -File | Where-Object { $_.Extension -match '^\.(jpe?g|jfif|png|apng|webp|gif|avif|svg|bmp|ico)$' } | Sort-Object Name | ForEach-Object { $_.Name })
$json = ConvertTo-Json -InputObject $files
[System.IO.File]::WriteAllText($manifest, $json, [System.Text.UTF8Encoding]::new($false))
Write-Host "Lista actualizada: $($files.Count) imágenes."
