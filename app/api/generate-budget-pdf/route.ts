import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { generateBudgetPDF, getBudgetPDFFilename } from '@/lib/budgetPDFService'
import { BudgetData } from '@/lib/types/budget'

export async function POST(request: NextRequest) {
  try {
    const { budgetId } = await request.json()

    if (!budgetId) {
      return NextResponse.json(
        { error: 'budgetId es requerido' },
        { status: 400 }
      )
    }

    console.log(`📄 Generando PDF para presupuesto ${budgetId}...`)

    // Obtener datos del presupuesto de Supabase
    const { data: budget, error: fetchError } = await supabase
      .from('budgets')
      .select('*')
      .eq('id', budgetId)
      .single()

    if (fetchError || !budget) {
      console.error('Error obteniendo presupuesto:', fetchError)
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }

    const budgetData = budget.budget_data as BudgetData

    // Generar PDF
    const pdfBlob = await generateBudgetPDF(budgetData)
    const filename = getBudgetPDFFilename(budgetData)

    // Subir a Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('budgets')
      .upload(`${budgetId}/${filename}`, pdfBlob, {
        contentType: 'application/pdf',
        upsert: true
      })

    if (uploadError) {
      console.error('Error subiendo PDF a Storage:', uploadError)
      return NextResponse.json(
        { error: 'Error al guardar PDF', details: uploadError.message },
        { status: 500 }
      )
    }

    // Obtener URL pública del PDF
    const { data: urlData } = supabase
      .storage
      .from('budgets')
      .getPublicUrl(uploadData.path)

    const pdfUrl = urlData.publicUrl

    // Actualizar registro en la tabla budgets con la URL del PDF
    const { error: updateError } = await supabase
      .from('budgets')
      .update({ pdf_url: pdfUrl })
      .eq('id', budgetId)

    if (updateError) {
      console.error('Error actualizando URL del PDF:', updateError)
      return NextResponse.json(
        { error: 'Error al actualizar registro', details: updateError.message },
        { status: 500 }
      )
    }

    console.log(`✅ PDF generado y guardado: ${pdfUrl}`)

    return NextResponse.json({
      success: true,
      pdfUrl,
      filename,
      message: 'PDF generado exitosamente'
    })

  } catch (error) {
    console.error('❌ Error inesperado en generate-budget-pdf:', error)
    return NextResponse.json(
      { 
        error: 'Error inesperado al generar PDF',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

