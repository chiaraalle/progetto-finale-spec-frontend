import { FaFacebook, FaInstagram, FaTiktok} from 'react-icons/fa';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          <p>&copy; {new Date().getFullYear()} Aquarell. Tutti i diritti riservati.</p>
          <p>
            <a href="/chi-siamo">Chi siamo</a> | <a href="/contatti">Contatti</a> | <a href="/privacy">Privacy</a>
          </p>
        </div>
        <div className="footer-social">
          <span>Seguici su: </span>
          <a href="https://facebook.com"><FaFacebook /></a>
          <a href="https://instagram.com"><FaInstagram /></a>
          <a href="https://tiktok.com"><FaTiktok /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;