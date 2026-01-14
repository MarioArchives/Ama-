import '../../styles/common.css'
import './About.css'

export const About = () => {
  return (
    <section className="section about">
      <div className="section-header">
        <p className="eyebrow">About</p>
        <h2>Amazon-grown. British-made. Truly edible.</h2>
      </div>
      <div className="about-grid">
        <p>
          Ama is a small artisanal cosmetics shop working with Amazon-grown
          botanicals and cold-pressed oils. We blend, rest, and bottle in Britain
          in batches that stay honest to the plant.
        </p>
        <p>
          Every product is vegan and organic, made with culinary-grade extracts
          so natural they can be eaten. The result is clean, nourishing care for
          skin and lips, with a scent that feels like fresh rainforest air.
        </p>
      </div>
    </section>
  )
}
