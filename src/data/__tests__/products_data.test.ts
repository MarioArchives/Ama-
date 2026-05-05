import { describe, expect, it } from 'vitest'
import productsData from '../products_data.json'

describe('products_data.json', () => {
  it('has at least one product', () => {
    expect(productsData.length).toBeGreaterThan(0)
  })

  it('has unique ids', () => {
    const ids = productsData.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it.each(productsData.map((p) => [p.title, p] as const))(
    '%s has all required fields populated',
    (_title, product) => {
      expect(product.id).toMatch(/^[a-z0-9-]+$/)
      expect(product.title).toBeTruthy()
      expect(product.description).toBeTruthy()
      expect(product.imageSrc).toMatch(/^\/.+/)
      expect(product.imageAlt).toBeTruthy()
      expect(typeof product.depth).toBe('number')
      expect(product.usage.tips.length).toBeGreaterThan(0)
    },
  )
})
