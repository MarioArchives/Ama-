import './KeyFeatures.css'

export const KeyFeatures = () => {
  const features = [
    'Vegan',
    'Cruelty-free',
    'Unrefined',
    '100% traceable',
    'No additives',
    'Cold pressed',
    'Ethically sourced',
    'Free from synthetic ingredients',
    'Community-based',
  ]

  return (
    <section className="section key-features margined-content">
      <div className="section-header">
        <p className="eyebrow">Key Features</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div key={index} className="feature-tile">
            {feature}
          </div>
        ))}
      </div>
    </section>
  )
}
