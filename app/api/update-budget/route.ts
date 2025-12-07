import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'
import { BudgetData } from '@/lib/types/budget'

export async function POST(request: NextRequest) {
  try {
    const { budgetId, budgetData, editedBy, changesSummary } = await request.json()

    if (!budgetId || !budgetData) {
      return NextResponse.json(
        { error: 'budgetId y budgetData son requeridos' },
        { status: 400 }
      )
    }

    console.log(`✏️ Actualizando presupuesto ${budgetId}...`)

    // Obtener versión actual
    const { data: currentBudget, error: fetchError } = await supabase
      .from('budgets')
      .select('*')
      .eq('id', budgetId)
      .single()

    if (fetchError || !currentBudget) {
      console.error('Error obteniendo presupuesto:', fetchError)
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }

    const newVersion = (currentBudget.version || 1) + 1
    const versionHistory = currentBudget.version_history || []

    // Agregar al historial
    const newHistoryEntry = {
      version: newVersion,
      changed_by: editedBy || 'admin',
      changed_at: new Date().toISOString(),
      changes: calculateChanges(currentBudget.budget_data, budgetData),
      summary: changesSummary || 'Presupuesto editado manualmente'
    }

    versionHistory.push(newHistoryEntry)

    // Actualizar presupuesto
    const { data: updatedBudget, error: updateError } = await supabase
      .from('budgets')
      .update({
        budget_data: budgetData,
        version: newVersion,
        edited_by: editedBy || 'admin',
        edited_at: new Date().toISOString(),
        version_history: versionHistory,
        status: 'pending_review', // Volver a revisión después de editar
        pdf_url: null // Invalidar PDF antiguo
      })
      .eq('id', budgetId)
      .select()
      .single()

    if (updateError) {
      console.error('Error actualizando presupuesto:', updateError)
      return NextResponse.json(
        { error: 'Error al actualizar presupuesto', details: updateError.message },
        { status: 500 }
      )
    }

    console.log(`✅ Presupuesto actualizado a versión ${newVersion}`)

    return NextResponse.json({
      success: true,
      budget: updatedBudget,
      message: 'Presupuesto actualizado exitosamente'
    })

  } catch (error) {
    console.error('❌ Error inesperado en update-budget:', error)
    return NextResponse.json(
      {
        error: 'Error inesperado al actualizar presupuesto',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}

/**
 * Calcula los cambios entre dos versiones del presupuesto
 */
function calculateChanges(oldData: BudgetData, newData: BudgetData): Array<{ field: string, oldValue: unknown, newValue: unknown }> {
  const changes: Array<{ field: string, oldValue: unknown, newValue: unknown }> = []

  // Comparar totales principales
  if (oldData?.totals?.totalTTC !== newData?.totals?.totalTTC) {
    changes.push({
      field: 'Total TTC',
      oldValue: oldData?.totals?.totalTTC,
      newValue: newData?.totals?.totalTTC
    })
  }

  if (oldData?.menu?.pricePerPerson !== newData?.menu?.pricePerPerson) {
    changes.push({
      field: 'Prix par personne',
      oldValue: oldData?.menu?.pricePerPerson,
      newValue: newData?.menu?.pricePerPerson
    })
  }

  if (oldData?.menu?.totalTTC !== newData?.menu?.totalTTC) {
    changes.push({
      field: 'Total Menu TTC',
      oldValue: oldData?.menu?.totalTTC,
      newValue: newData?.menu?.totalTTC
    })
  }

  if (oldData?.material?.totalTTC !== newData?.material?.totalTTC) {
    changes.push({
      field: 'Total Matériel TTC',
      oldValue: oldData?.material?.totalTTC,
      newValue: newData?.material?.totalTTC
    })
  }

  if (oldData?.service?.mozos !== newData?.service?.mozos) {
    changes.push({
      field: 'Nombre de serveurs',
      oldValue: oldData?.service?.mozos,
      newValue: newData?.service?.mozos
    })
  }

  if (oldData?.service?.hours !== newData?.service?.hours) {
    changes.push({
      field: 'Heures de service',
      oldValue: oldData?.service?.hours,
      newValue: newData?.service?.hours
    })
  }

  return changes
}

/**
 * API para obtener historial de versiones de un presupuesto
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const budgetId = searchParams.get('budgetId')

    if (!budgetId) {
      return NextResponse.json(
        { error: 'budgetId es requerido' },
        { status: 400 }
      )
    }

    const { data: budget, error } = await supabase
      .from('budgets')
      .select('version_history, version')
      .eq('id', budgetId)
      .single()

    if (error || !budget) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      currentVersion: budget.version,
      history: budget.version_history || []
    })

  } catch (error) {
    console.error('Error obteniendo historial:', error)
    return NextResponse.json(
      { error: 'Error al obtener historial' },
      { status: 500 }
    )
  }
}

