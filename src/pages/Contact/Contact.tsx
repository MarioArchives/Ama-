import '../../styles/common.css'
import './Contact.css'

export const Contact = () => {
  return (
    <section className="section contact">
      <div className="section-header">
        <p className="eyebrow">Contact Us</p>
        <h2>Speak with the makers.</h2>
      </div>
      <div className="contact-card">
        <div>
          <p className="contact-title">Private appointments</p>
          <p>
            We craft bespoke, edible-grade blends for studios, spas, and private
            clients. Share your ritual and we will design the formula.
          </p>
        </div>
        <div className="contact-actions">
          <button className="primary">Email Ama</button>
          <span className="contact-note">hello@amaoils.co.uk</span>
        </div>
      </div>
    </section>
  )
}
