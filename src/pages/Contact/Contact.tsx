import '../../styles/common.css'
import './Contact.css'

export const Contact = () => {
  return (
    <section className="section contact">
      <div className="section-header">
        <p className="eyebrow">Contact Us</p>
        <h2>Speak with a curator.</h2>
      </div>
      <div className="contact-card">
        <div>
          <p className="contact-title">Private appointments</p>
          <p>
            We craft bespoke blends for studios, spas, and private clients. Share
            your vision and we will design the ritual.
          </p>
        </div>
        <div className="contact-actions">
          <button className="primary">Email the Atelier</button>
          <span className="contact-note">hello@slikoils.com</span>
        </div>
      </div>
    </section>
  )
}
