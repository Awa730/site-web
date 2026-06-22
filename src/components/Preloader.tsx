import logo from "../assets/photos/logo.jpeg";
import '../styles/Preloader.css'

export default function Preloader() {
  return (
    <div id="preloader">
      <img src={logo} alt="Logo" className="pre-logo" />
      <div className="pre-bar"><div className="pre-fill" /></div>
      <div className="pre-text">Maimouna Company</div>
    </div>
  )
}
