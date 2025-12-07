import { BudgetData, GenerateBudgetRequest } from './types/budget'

/**
 * Servicio para generar presupuestos usando OpenAI GPT-4
 */

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4'

// Prompt base del cliente adaptado para automatización
const FUEGUITO_PROMPT = `
#OBJETIVO PRINCIPAL
Eres Fueguito, experto en cálculos de cotizaciones para la empresa de catering "Fuegos d'Azur".
Tu objetivo es crear un presupuesto detallado, profesional y preciso.

#CARACTERÍSTICAS
- Experto en cálculos y precios
- Alta capacidad de análisis de costos
- Sigues precios establecidos y márgenes de beneficio
- Generas presupuestos en formato estructurado JSON

#INSTRUCCIONES

## 1. PRECIOS POR PERSONA (Degresivos según cantidad)

**Groupe de 10 à 25 personnes:** 110€ à 80€ par personne (TTC)
**Groupe de 25 à 40 personnes:** 85€ à 70€ par personne (TTC)
**Groupe de 40 à 70 personnes:** 75€ à 60€ par personne (TTC)
**Groupe de 70 ou plus personnes:** 65€ à 45€ par personne (TTC)

**Variables dentro de cada franja:**

### Entradas Premium (más caras):
- Secreto de porc Ibérique
- Miniburger maison au brasero
- Empanadas (especialidad argentina)

### Entradas Clásicas:
- Tapas au Chorizo grillé
- Brochettes de jambon ibérique

### Carnes Clásicas:
- Vacio / Bavette d'aloyau (Irlande)
- Entrecôte / Ojo de bife (France)
- Entraña / Hampe (Irlande)
- Magret de Canard (France)

### Carnes Premium:
- Entrecôte / Ojo de bife (Argentine)
- Picanha (Argentine)
- Côte de bœuf / Tomahawk (France/USA)
- Faux filet / Bife de chorizo (Argentine)
- Saumon (Norvège)

## 2. ACOMPAÑAMIENTOS (Siempre incluidos)
- Pommes de terre "Rústicas" à la plancha
- Légumes grillés
- Salade verte, pêches, grains, feta et vinaigrette
- Sauces: "Chimichurri" et "Salsa Criolla"
- Pain (divers)

## 3. POSTRE
- **Grupos +50 personas:** Fruits grillés flambés au cognac
- **Grupos -50 personas:** Panqueques con dulce de leche fondu au brasero

## 4. MATERIAL

### A) Solo vajilla (menos de 60 personas):
- Usar vajilla propia
- Tarifa: 5€ por persona + 100€ limpieza
- Mange-debout propios: 20€ cada uno (tenemos 8)

### B) Vajilla + Mesas/Sillas (cualquier cantidad):
- Alquilar todo a empresa externa
- Agregar 200€ de gestión
- Mange-debout alquilados: 25€ cada uno
- Si distancia >50km de Nice: +150€ por envío y +150€ por reprise

## 5. DESPLAZAMIENTO
- Si evento >50km de Nice: 1,5€ por km

## 6. TVA
- **Catering (menú):** 10%
- **Material y desplazamiento:** 20%

## 7. SERVICIO DE MOZOS
- Precio: 40€ por hora por mozo
- Incluir si el cliente solicitó servicio

## 8. DESCUENTO MEDIODÍA
- Eventos al mediodía: 10% de descuento
- **Estrategia:** Inflar precio 10%, luego mostrar descuento 10% para llegar al precio inicial

## 9. FORMATO DE RESPUESTA

Debes responder ÚNICAMENTE con un JSON válido con esta estructura exacta:

{
  "clientInfo": {
    "name": "string",
    "email": "string",
    "phone": "string",
    "eventDate": "string",
    "eventType": "string",
    "guestCount": number,
    "address": "string",
    "menuType": "dejeuner" | "diner"
  },
  "menu": {
    "pricePerPerson": number,
    "totalPersons": number,
    "entrees": [{"name": "string", "quantity": number, "pricePerUnit": number, "total": number}],
    "viandes": [{"name": "string", "quantity": number, "pricePerUnit": number, "total": number}],
    "dessert": {"name": "string", "quantity": number, "pricePerUnit": number, "total": number},
    "accompagnements": ["Pommes de terre...", "Légumes grillés", ...],
    "totalHT": number,
    "tva": number,
    "tvaPct": 10,
    "totalTTC": number,
    "notes": "Explicación breve de por qué este precio"
  },
  "material": {
    "items": [{"name": "string", "quantity": number, "pricePerUnit": number, "total": number}],
    "gestionFee": number,
    "deliveryFee": number,
    "totalHT": number,
    "tva": number,
    "tvaPct": 20,
    "totalTTC": number,
    "notes": "Explicación de material"
  },
  "deplacement": {
    "distance": number,
    "pricePerKm": 1.5,
    "totalHT": number,
    "tva": number,
    "tvaPct": 20,
    "totalTTC": number,
    "notes": "Distancia desde Nice"
  },
  "service": {
    "mozos": number,
    "hours": number,
    "pricePerHour": 40,
    "totalHT": number,
    "tva": number,
    "tvaPct": 20,
    "totalTTC": number,
    "notes": "Servicio de mozos"
  },
  "totals": {
    "totalHT": number,
    "totalTVA": number,
    "totalTTC": number,
    "discount": {
      "reason": "Événement à midi",
      "percentage": 10,
      "amount": number
    }
  },
  "notes": "Notas generales para el cliente en francés",
  "internalNotes": "Notas internas/cálculos",
  "generatedAt": "ISO date string",
  "validUntil": "ISO date string (30 días después)"
}

**IMPORTANTE:**
- Todos los textos para el cliente deben estar en FRANCÉS
- Usa precios realistas dentro de las franjas establecidas
- Calcula bien todas las TVA
- Sé preciso con los totales
- Si no aplica alguna sección (material, deplacement, service), omítela del JSON o ponla en null
`

export async function generateBudgetWithAI(request: GenerateBudgetRequest): Promise<BudgetData> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY no está configurada')
  }

  // Construir el contexto específico del pedido
  const orderContext = `
DATOS DEL PEDIDO A COTIZAR:

Cliente: ${request.contactData.name}
Email: ${request.contactData.email}
Teléfono: ${request.contactData.phone}
Fecha del evento: ${request.contactData.eventDate}
Tipo de evento: ${request.contactData.eventType}
Número de invitados: ${request.contactData.guestCount} personas
Dirección del evento: ${request.contactData.address}
Tipo de menú: ${request.menuType === 'dejeuner' ? 'Déjeuner (aplicar descuento 10%)' : 'Dîner'}

SELECCIONES DEL CLIENTE:

Entrées seleccionadas:
${request.entrees.map((e, i) => `${i + 1}. ${e}`).join('\n')}

Viandes seleccionadas:
${request.viandes.map((v, i) => `${i + 1}. ${v}`).join('\n')}

Dessert seleccionado:
${request.dessert}

Servicios extras:
- Vinos: ${request.extras.wines ? 'Sí' : 'No'}
- Decoración: ${request.extras.decoration ? 'Sí' : 'No'}
- Material solicitado: ${request.extras.equipment.length > 0 ? request.extras.equipment.join(', ') : 'Ninguno'}
${request.extras.otherEquipmentDetails ? `- Detalles adicionales: ${request.extras.otherEquipmentDetails}` : ''}
${request.extras.specialRequest ? `- Solicitud especial: ${request.extras.specialRequest}` : ''}

TAREA:
Genera un presupuesto completo y detallado siguiendo todas las reglas de precios.
Responde ÚNICAMENTE con el JSON, sin texto adicional antes ni después.
  `

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: FUEGUITO_PROMPT
          },
          {
            role: 'user',
            content: orderContext
          }
        ],
        temperature: 0.3, // Baja temperatura para respuestas más consistentes
        max_tokens: 2000
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`OpenAI API error: ${error.error?.message || response.statusText}`)
    }

    const data = await response.json()
    const aiResponse = data.choices[0]?.message?.content

    if (!aiResponse) {
      throw new Error('No se recibió respuesta de OpenAI')
    }

    // Parsear la respuesta JSON
    let budgetData: BudgetData
    try {
      // Limpiar posibles caracteres extras antes/después del JSON
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('No se encontró JSON válido en la respuesta')
      }
      budgetData = JSON.parse(jsonMatch[0])
    } catch {
      console.error('Error parseando respuesta de OpenAI:', aiResponse)
      throw new Error('La respuesta de la IA no es un JSON válido')
    }

    // Validar que tenga la estructura mínima requerida
    if (!budgetData.clientInfo || !budgetData.menu || !budgetData.totals) {
      throw new Error('La respuesta de la IA no tiene la estructura esperada')
    }

    return budgetData

  } catch (error) {
    console.error('Error generando presupuesto con IA:', error)
    throw error
  }
}

/**
 * Estimar costo de generación (útil para logging/analytics)
 */
export function estimateAICost(): { estimatedTokens: number, estimatedCostUSD: number } {
  // Estimación aproximada
  const promptTokens = 1500 // Prompt base
  const contextTokens = 500 // Datos del pedido
  const responseTokens = 1000 // Respuesta esperada
  const totalTokens = promptTokens + contextTokens + responseTokens

  // GPT-4 pricing (aproximado): $0.03 / 1K prompt tokens, $0.06 / 1K completion tokens
  const costUSD = ((promptTokens + contextTokens) / 1000 * 0.03) + (responseTokens / 1000 * 0.06)

  return {
    estimatedTokens: totalTokens,
    estimatedCostUSD: Math.round(costUSD * 100) / 100
  }
}

