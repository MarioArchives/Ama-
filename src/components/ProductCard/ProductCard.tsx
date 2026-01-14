import './ProductCard.css'

type ProductCardProps = {
  title: string
  description: string
  label: string
  imageSrc: string
  imageAlt?: string
  depth?: number
}

export const ProductCard = ({
  title,
  description,
  label,
  imageSrc,
  imageAlt,
  depth = 0.08,
}: ProductCardProps) => {
  return (
    <article className="product-card" data-depth={depth}>
      <div className="product-media">
        <img src={imageSrc} alt={imageAlt ?? title} loading="lazy" />
      </div>
      <div className="product-content">
        <h3>{title}</h3>
        <p>{description}</p>
        <span>{label}</span>
      </div>
    </article>
  )
}
