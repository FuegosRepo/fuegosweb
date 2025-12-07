# Fuegos d'Azur - Setup Sistema de Presupuestos
# Windows PowerShell Script

Write-Host "🔥 Fuegos d'Azur - Setup Sistema de Presupuestos" -ForegroundColor Yellow
Write-Host "=================================================" -ForegroundColor Yellow
Write-Host ""

# Verificar que estamos en el directorio correcto
if (-Not (Test-Path "package.json")) {
    Write-Host "❌ Error: Debes ejecutar este script desde la carpeta Fuegos" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Paso 1: Instalando dependencias..." -ForegroundColor Yellow
npm install jspdf jspdf-autotable

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📝 Paso 2: Verificando archivo .env.local..." -ForegroundColor Yellow

if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠️  .env.local no existe. Creando desde ejemplo..." -ForegroundColor Yellow
    
    $envContent = @"
# OpenAI (REQUERIDO - obtén tu key en platform.openai.com)
OPENAI_API_KEY=tu-api-key-aqui
OPENAI_MODEL=gpt-4

# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-de-supabase

# Resend
RESEND_API_KEY=re_YjPUm6D7_EbT9z1fmphFbjykQMkd1r1qf

# Emails
ADMIN_EMAIL=fuegosdazur@proton.me
EMAIL_FROM=onboarding@resend.dev
EMAIL_FROM_NAME=Fuegos d'Azur

# URLs
NEXT_PUBLIC_SITE_URL=http://localhost:3000
ADMIN_PANEL_URL=http://localhost:3001
"@

    $envContent | Out-File -FilePath ".env.local" -Encoding UTF8
    
    Write-Host "✅ Archivo .env.local creado" -ForegroundColor Green
    Write-Host "⚠️  IMPORTANTE: Edita .env.local y agrega tus API keys" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env.local ya existe" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Setup completado!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Edita .env.local y agrega:"
Write-Host "   - OPENAI_API_KEY (obtén en: https://platform.openai.com/api-keys)"
Write-Host "   - NEXT_PUBLIC_SUPABASE_URL"
Write-Host "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
Write-Host ""
Write-Host "2. En Supabase Dashboard:"
Write-Host "   - Ejecuta el SQL de: supabase/migrations/create_budgets_table.sql"
Write-Host "   - Crea bucket 'budgets' en Storage (público)"
Write-Host ""
Write-Host "3. Inicia el servidor:"
Write-Host "   npm run dev"
Write-Host ""
Write-Host "4. Prueba en: http://localhost:3000/catering"
Write-Host ""
Write-Host "📚 Lee INICIO-RAPIDO-PRESUPUESTOS.md para más detalles" -ForegroundColor Yellow
Write-Host ""

