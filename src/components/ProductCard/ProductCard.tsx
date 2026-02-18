import './ProductCard.css'

type ProductCardProps = {
  title: string
  description: string
  imageSrc: string
  imageAlt?: string
  depth?: number
  onClick?: () => void
}

export const ProductCard = ({
  title,
  description,
  imageSrc,
  imageAlt,
  depth = 0.08,
  onClick,
}: ProductCardProps) => {
  return (
    <article className="product-card" data-depth={depth} onClick={onClick} role="button" tabIndex={0}>
      <div className="product-media">
        <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" />
      </div>
      <div className="product-content">
        <h3>{title}</h3>
        <p className="key-words">{description}</p>
      </div>
    </article>
  )
}
