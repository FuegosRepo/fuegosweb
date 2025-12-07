#!/bin/bash

echo "🔥 Fuegos d'Azur - Setup Sistema de Presupuestos"
echo "================================================="
echo ""

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Debes ejecutar este script desde la carpeta Fuegos${NC}"
    exit 1
fi

echo -e "${YELLOW}📦 Paso 1: Instalando dependencias...${NC}"
npm install jspdf jspdf-autotable

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Dependencias instaladas correctamente${NC}"
else
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi

echo ""
echo -e "${YELLOW}📝 Paso 2: Verificando archivo .env.local...${NC}"

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local no existe. Creando desde ejemplo...${NC}"
    cat > .env.local << 'EOF'
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
EOF
    echo -e "${GREEN}✅ Archivo .env.local creado${NC}"
    echo -e "${YELLOW}⚠️  IMPORTANTE: Edita .env.local y agrega tus API keys${NC}"
else
    echo -e "${GREEN}✅ .env.local ya existe${NC}"
fi

echo ""
echo -e "${GREEN}✅ Setup completado!${NC}"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Edita .env.local y agrega:"
echo "   - OPENAI_API_KEY (obtén en: https://platform.openai.com/api-keys)"
echo "   - NEXT_PUBLIC_SUPABASE_URL"
echo "   - NEXT_PUBLIC_SUPABASE_ANON_KEY"
echo ""
echo "2. En Supabase Dashboard:"
echo "   - Ejecuta el SQL de: supabase/migrations/create_budgets_table.sql"
echo "   - Crea bucket 'budgets' en Storage (público)"
echo ""
echo "3. Inicia el servidor:"
echo "   npm run dev"
echo ""
echo "4. Prueba en: http://localhost:3000/catering"
echo ""
echo "📚 Lee INICIO-RAPIDO-PRESUPUESTOS.md para más detalles"
echo ""

