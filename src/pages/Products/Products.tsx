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
        <h2>Vegan, organic blends for face, lips, and body.</h2>
      </div>
      <div className="product-grid">
        <article className="product-card" data-depth="0.06">
          <h3>Rainforest Balm</h3>
          <p>Cupuaçu, maracuja, and cacao for plush, edible-grade moisture.</p>
          <span>Universal balm</span>
        </article>
        <article className="product-card" data-depth="0.08">
          <h3>Amazon Nectar</h3>
          <p>Buriti, acai, and citrus peel for bright, soft skin.</p>
          <span>Face + neck oil</span>
        </article>
        <article className="product-card" data-depth="0.1">
          <h3>Forest Lip Melt</h3>
          <p>Murumuru butter, vanilla pod, and a hint of wild lime.</p>
          <span>Lip treatment</span>
        </article>
      </div>
    </section>
  )
}
