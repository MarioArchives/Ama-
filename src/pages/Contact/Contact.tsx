import '../../styles/common.css'
import './Contact.css'

export const Contact = () => {
    return (
        <section className="section contact">
            <div className="section-header">
                <p className="eyebrow">Contact</p>
                <h2>If you have any enquiries, please don't hesitate to contact us.</h2>
            </div>
            <div className="contact-card">
                <div className="contact-info">
                    <p className="contact-email">
                        <a href="mailto:ama.skincare@gmail.com">ama.skincare@gmail.com</a>
                    </p>
                    <p className="contact-tagline">
                        Amazonian and British skin care
                    </p>
                </div>
            </div>
        </section>
    )
}
