import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Header } from '../Header'

const renderHeader = (initialEntries: string[] = ['/']) =>
  render(
    <MemoryRouter initialEntries={initialEntries}>
      <Header />
    </MemoryRouter>,
  )

describe('Header', () => {
  it('renders the brand mark', () => {
    renderHeader()
    expect(screen.getByText('Ama')).toBeInTheDocument()
    expect(screen.getByText('zonas')).toBeInTheDocument()
    expect(screen.getByText('Amazonian cosmetics')).toBeInTheDocument()
  })

  it('renders all primary nav links pointing to the right routes', () => {
    renderHeader()
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: 'Our Products' })).toHaveAttribute('href', '/products')
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact')
  })

  it('marks the link for the current route as active', () => {
    renderHeader(['/products'])
    expect(screen.getByRole('link', { name: 'Our Products' })).toHaveClass('active')
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveClass('active')
  })
})
