import '../../styles/common.css'
import './Contact.css'

export const Contact = () => {
  return (
    <section className="section contact">
      <div className="section-header">
        <p className="eyebrow">Contact</p>
        <h2>Get in touch</h2>
      </div>
      <div className="contact-card">
        <div className="contact-info">
          <p className="contact-email">
            <a href="mailto:hello@amaoils.co.uk">hello@amaoils.co.uk</a>
          </p>
          <p className="contact-tagline">
            Amazonian and British skin care
          </p>
        </div>
      </div>
    </section>
  )
}
