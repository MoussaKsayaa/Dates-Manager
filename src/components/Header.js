import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [content, setContent] = useState("");
  const pathname = window.location.pathname;
  useEffect(() => {
    const pathwebname = '/dates-manager/'
    const pathwebnameReg = new RegExp(pathwebname);
    if (pathname.match(pathwebnameReg)) {
      if (pathname === pathwebname) setContent("Home");
      if (pathname.match(new RegExp(pathname + 'Dates'))) setContent("Dates");
      if (pathname.match(new RegExp(pathname + "New-Item"))) setContent("NewItem");
    } else {
      if (pathname === '/') setContent("Home");
      if (pathname.match(/Dates/)) setContent("Dates");
      if (pathname.match(/New-Item/)) setContent("NewItem");
    }
  }, [pathname])
  useEffect(() => {
    function clickListener(e) {
      if ((isMobileMenuActive && !e.target.parentElement.classList.contains('mobile-menu') && !e.target.classList.contains('mobile-menu'))) setIsMobileMenuActive(false)
    }
    document.addEventListener('click', clickListener)
    return () => document.removeEventListener('click', clickListener);
  }, [isMobileMenuActive])
  const handleNavClick = (e) => {
    const name = e.target.attributes['section-name'].value;
    setContent(name);
    setIsMobileMenuActive(false);
  }

  return (
    <div className='header'>
      <div className='container' >
        <div className='mobile-header'>
        <div className='logo'>Dates Manager</div>
        <div className={`mobile-menu ${isMobileMenuActive ? 'active' : ''}`} onClick={() => setIsMobileMenuActive(!isMobileMenuActive)}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        </div>
        <nav className={`nav ${isMobileMenuActive ? 'active' : ''}`}>
          <Link to="/" section-name="Home" className={`nav-item ${content === "Home" ? "active" : ''}`} onClick={handleNavClick}>Home</Link>
          <Link to="/Dates" section-name="Dates" className={`nav-item ${content === "Dates" ? "active" : ''}`} onClick={handleNavClick}>Dates</Link>
          <Link to="/New-Item" section-name="NewItem" className={`nav-item ${content === "NewItem" ? "active" : ''}`} onClick={handleNavClick}>New Dates</Link>
        </nav>
      </div>
    </div>
  )
}