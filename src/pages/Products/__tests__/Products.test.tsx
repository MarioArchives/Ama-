import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { Products } from '../Products'
import productsData from '../../../data/products_data.json'

const renderProducts = () =>
  render(
    <MemoryRouter>
      <Products />
    </MemoryRouter>,
  )

describe('Products page', () => {
  it('renders one card for every product in the data set', () => {
    renderProducts()
    const cards = screen.getAllByRole('button')
    expect(cards).toHaveLength(productsData.length)
    for (const product of productsData) {
      expect(screen.getByRole('heading', { name: product.title })).toBeInTheDocument()
    }
  })

  it('opens the product detail modal when a card is clicked and closes it via the close button', async () => {
    renderProducts()
    const user = userEvent.setup()

    const firstProduct = productsData[0]
    const card = screen.getByRole('heading', { name: firstProduct.title }).closest('article')
    expect(card).not.toBeNull()
    await user.click(card!)

    expect(screen.getByRole('heading', { level: 2, name: firstProduct.title })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /close/i }))
    expect(screen.queryByRole('heading', { level: 2, name: firstProduct.title })).not.toBeInTheDocument()
  })
})
