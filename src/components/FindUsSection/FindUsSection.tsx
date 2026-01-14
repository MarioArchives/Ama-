import "./FindUsSection.css"

export const FindUsSection = () => {
    const locations: Array<[string, string]> = [
        ["La Casita", "Giovanna • La Peruana"],
    ]

    return (
        <div className="find-us-grid">
            <div className="find-us-map" aria-label="Map of Ama stockists">
                <iframe
                    title="Ama stockists map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d74965.4175038083!2d-2.883542563951749!3d54.04413453850896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b6141d2138751%3A0xbea089595c0b389!2sLancaster!5e0!3m2!1sen!2suk!4v1768403334449!5m2!1sen!2suk"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
            <div className="find-us-list">
                {locations.map(([name, meta]) => (
                    <div className="find-us-card" key={`${name}-${meta}`}>
                        <p className="find-us-name">{name}</p>
                        <p className="find-us-meta">{meta}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
