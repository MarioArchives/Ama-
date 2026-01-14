import { useEffect } from 'react'
import '../../styles/common.css'
import './Products.css'

export const Products = () => {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>('.product-card'))
    if (!cards.length) {
      return
    }

    let rafId = 0
    const update = () => {
      rafId = 0
      const viewport = window.innerHeight

      cards.forEach((card) => {
        const depth = Number(card.dataset.depth ?? '0.08')
        const rect = card.getBoundingClientRect()
        const offset = (rect.top - viewport * 0.5) * -depth
        card.style.setProperty('--parallax-offset', `${offset}px`)
      })
    }

    const onScroll = () => {
      if (rafId) return
      rafId = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (rafId) window.cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section className="section products">
      <div className="section-header">
        <p className="eyebrow">Our Products</p>
        <h2>Curated oils for skin, space, and spirit.</h2>
      </div>
      <div className="product-grid">
        <article className="product-card" data-depth="0.06">
          <h3>Verdant Veil</h3>
          <p>Green fig, pine sap, and wild sage for grounding rituals.</p>
          <span>Body + pulse oil</span>
        </article>
        <article className="product-card" data-depth="0.08">
          <h3>Nocturne Bloom</h3>
          <p>Black orchid, tonka bean, and ambered moss.</p>
          <span>Evening glow blend</span>
        </article>
        <article className="product-card" data-depth="0.1">
          <h3>Obsidian Aura</h3>
          <p>Charred cedar, bergamot peel, and velvet patchouli.</p>
          <span>Room + linen mist</span>
        </article>
      </div>
    </section>
  )
}
