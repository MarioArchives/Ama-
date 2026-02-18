import { useEffect, useState } from 'react'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import { ProductDetail } from '../../components/ProductDetail/ProductDetail'
import productsData from '../../data/products_data.json'
import '../../styles/common.css'
import './Products.css'

export const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
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
        <p className="eyebrow">Our products</p>
      </div>
      <div className="product-grid">
        {productsData.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            description={product.description}
            imageSrc={product.imageSrc}
            imageAlt={product.imageAlt}
            depth={product.depth}
            onClick={() => setSelectedProduct(product.title)}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductDetail
          productTitle={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  )
}
