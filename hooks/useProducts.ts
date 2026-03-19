import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabaseClient'

export interface Product {
    id: string // UUID
    name: string
    description: string | null
    image_url: string | null
    subtitle: string | null
    category: 'entrees' | 'viandes' | 'desserts' | 'material'
    subcategory: string | null // 'premium' | 'classique' for viandes
    origin: string | null
    price_per_portion: number | null
    active: boolean
}

interface UseProductsResult {
    products: Product[]
    loading: boolean
    error: Error | null
    refetch: () => Promise<void>
}

// In-memory cache to avoid re-fetching the same products across steps
const productsCache = new Map<string, { data: Product[], timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCacheKey(category: string, subcategory?: string): string {
    return subcategory ? `${category}:${subcategory}` : category
}

/**
 * Custom hook to fetch products from Supabase by category.
 * Results are cached in memory to avoid redundant fetches across form steps.
 *
 * @param category - Product category to filter by
 * @param subcategory - Optional subcategory filter (e.g., 'premium', 'classique')
 * @returns Products array, loading state, error, and refetch function
 *
 * @example
 * const { products, loading } = useProducts('entrees')
 * const { products: premiumMeats } = useProducts('viandes', 'premium')
 */
export function useProducts(
    category: 'entrees' | 'viandes' | 'desserts',
    subcategory?: string
): UseProductsResult {
    const cacheKey = getCacheKey(category, subcategory)
    const cached = productsCache.get(cacheKey)
    const hasFreshCache = cached && (Date.now() - cached.timestamp) < CACHE_TTL

    const [products, setProducts] = useState<Product[]>(hasFreshCache ? cached.data : [])
    const [loading, setLoading] = useState(!hasFreshCache)
    const [error, setError] = useState<Error | null>(null)

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)

            let query = supabase
                .from('products')
                .select('id, name, description, image_url, subtitle, category, subcategory, origin, price_per_portion, active')
                .eq('category', category)
                .eq('active', true)
                .order('name')

            if (subcategory) {
                query = query.eq('subcategory', subcategory)
            }

            const { data, error: fetchError } = await query

            if (fetchError) {
                throw fetchError
            }

            const result = data || []
            setProducts(result)
            productsCache.set(cacheKey, { data: result, timestamp: Date.now() })
        } catch (err) {
            console.error(`Error fetching products for category "${category}":`, err)
            setError(err instanceof Error ? err : new Error('Failed to fetch products'))
        } finally {
            setLoading(false)
        }
    }, [category, subcategory, cacheKey])

    useEffect(() => {
        if (!hasFreshCache) {
            fetchProducts()
        }
    }, [category, subcategory])

    return {
        products,
        loading,
        error,
        refetch: fetchProducts
    }
}

/**
 * Fetch products by their UUIDs
 * Useful for displaying selected products in review step
 */
export async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) return []

    const { data, error } = await supabase
        .from('products')
        .select('id, name, description, image_url, subtitle, category, subcategory, origin, price_per_portion, active')
        .in('id', ids)

    if (error) {
        console.error('Error fetching products by IDs:', error)
        return []
    }

    return data || []
}
