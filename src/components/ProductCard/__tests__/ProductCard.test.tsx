import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProductCard } from '../ProductCard'

describe('ProductCard', () => {
  const baseProps = {
    title: 'Cacay oil',
    description: 'Lightweight and fast-absorbing.',
    imageSrc: '/cacay.png',
  }

  it('renders title and description', () => {
    render(<ProductCard {...baseProps} />)
    expect(screen.getByRole('heading', { name: 'Cacay oil' })).toBeInTheDocument()
    expect(screen.getByText('Lightweight and fast-absorbing.')).toBeInTheDocument()
  })

  it('uses imageAlt when provided, otherwise falls back to title', () => {
    const { rerender } = render(<ProductCard {...baseProps} imageAlt="A bottle of cacay oil" />)
    expect(screen.getByAltText('A bottle of cacay oil')).toBeInTheDocument()

    rerender(<ProductCard {...baseProps} />)
    expect(screen.getByAltText('Cacay oil')).toBeInTheDocument()
  })

  it('applies the depth dataset attribute', () => {
    render(<ProductCard {...baseProps} depth={0.12} />)
    const card = screen.getByRole('button')
    expect(card).toHaveAttribute('data-depth', '0.12')
  })

  it('defaults depth to 0.08 when omitted', () => {
    render(<ProductCard {...baseProps} />)
    expect(screen.getByRole('button')).toHaveAttribute('data-depth', '0.08')
  })

  it('invokes onClick when the card is clicked', async () => {
    const onClick = vi.fn()
    render(<ProductCard {...baseProps} onClick={onClick} />)
    await userEvent.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
