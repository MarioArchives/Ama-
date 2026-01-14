import { useEffect } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard'
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
        <ProductCard
          title="Rainforest Balm"
          description="Cupuaçu, maracuja, and cacao for plush, edible-grade moisture."
          label="Universal balm"
          imageSrc="/product.png"
          depth={0.06}
        />
        <ProductCard
          title="Amazon Nectar"
          description="Buriti, acai, and citrus peel for bright, soft skin."
          label="Face + neck oil"
          imageSrc="/product.png"
          depth={0.08}
        />
        <ProductCard
          title="Forest Lip Melt"
          description="Murumuru butter, vanilla pod, and a hint of wild lime."
          label="Lip treatment"
          imageSrc="/product.png"
          depth={0.1}
        />
      </div>
    </section>
  )
}
