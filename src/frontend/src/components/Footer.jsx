import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section mt-5 pt-5 pb-4 position-relative z-1">
      <div className="container">
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <h4 className="footer-title mb-3">Harmony Studio</h4>
            <p className="small mb-4">
              Tu espacio de bienestar donde el movimiento consciente se encuentra con la serenidad.
            </p>
            <div className="footer-social d-flex gap-2">
              <a href="https://www.facebook.com/EscuelaDavinci" target="_blank" rel="noreferrer" className="text-decoration-none" title="Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/escueladavinci" target="_blank" rel="noreferrer" className="text-decoration-none" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/Escuela_DaVinci" target="_blank" rel="noreferrer" className="text-decoration-none" title="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div className="col-md-3">
            <h4 className="footer-title mb-3">Enlaces Rápidos</h4>
            <ul className="list-unstyled footer-links">
              <li className="mb-2">
                <Link to="/" className="footer-link">
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/classes" className="footer-link">
                  Nuestras Clases
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/my-reservations" className="footer-link">
                  Mis reservas
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-3">
            <h4 className="footer-title mb-3">Contacto</h4>
            <div className="d-flex gap-2 align-items-start mb-2">
              <Phone size={16} className="text-light flex-shrink-0 mt-1" />
              <div>
                <a href="tel:+541112345678" className="small footer-copy mb-0 text-decoration-none text-light">+54 11 1234 5678</a>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-start mb-2">
              <Mail size={16} className="text-light flex-shrink-0 mt-1 " />
              <div>
                <a href="mailto:info@harmonystudio.com" className="small footer-copy mb-0 text-decoration-none text-light">info@harmonystudio.com</a>
              </div>
            </div>
            <div className="d-flex gap-2 align-items-start">
              <MapPin size={16} className="text-light flex-shrink-0 mt-1" />
              <div>
                <p className="small footer-copy mb-0">Buenos Aires, Argentina</p>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <h4 className="footer-title mb-3">Horarios</h4>
            <ul className="list-unstyled small footer-copy">
              <li className="mb-2">
                <span className="fw-semibold text-light">Lunes - Viernes:</span><br /> 8:00 - 20:00
              </li>
              <li className="mb-2">
                <span className="fw-semibold text-light">Sábado:</span><br /> 9:00 - 15:00
              </li>
              <li>
                <span className="fw-semibold text-light">Domingo:</span><br /> Cerrado
              </li>
            </ul>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="row align-items-center py-3">
          <div className="col-md-6 text-center text-md-start">
            <p className="footer-copy mb-0">
              &copy; {currentYear} Harmony Studio. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
