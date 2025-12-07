import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabaseClient'

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const { id } = params

    const { data: budget, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !budget) {
      return NextResponse.json(
        { error: 'Presupuesto no encontrado' },
        { status: 404 }
      )
    }

    return NextResponse.json(budget)
  } catch (error) {
    console.error('Error obteniendo presupuesto:', error)
    return NextResponse.json(
      { error: 'Error al obtener presupuesto' },
      { status: 500 }
    )
  }
}

