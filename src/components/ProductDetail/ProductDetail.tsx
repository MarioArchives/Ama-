import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import productsData from '../../data/products_data.json'
import './ProductDetail.css'

type ProductDetailProps = {
  productTitle: string
  onClose: () => void
}

export const ProductDetail = ({ productTitle, onClose }: ProductDetailProps) => {
  const product = productsData.find((p) => p.title === productTitle)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  if (!product) {
    return null
  }

  return createPortal(
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="product-detail-content">
          <div className="product-detail-image">
            <img src={product.detailImageSrc ?? product.imageSrc} alt={product.imageAlt} />
          </div>

          <div className="product-detail-info">
            <h2>{product.title}</h2>
            {product.scientificName && (
              <p className="scientific-name">{product.scientificName}</p>
            )}

            <p className="description">{product.description}</p>

            {product.sizes && <p className="sizes"><strong>Sizes:</strong> {product.sizes}</p>}
            {product.validity && (
              <p className="validity"><strong>Validity:</strong> {product.validity}</p>
            )}

            {product.detailedDescription && (
              <div className="detailed-section">
                <h3>Details</h3>
                <p>{product.detailedDescription}</p>
              </div>
            )}

            <Link to="/contact" className="inquire-button" onClick={onClose}>
              Enquire
            </Link>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
