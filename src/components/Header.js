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
          <Link to="/" className={`nav-item ${content === "Home" ? "active" : ''}`} onClick={() => setContent("Home")}>Home</Link>
          <Link to="/Dates" className={`nav-item ${content === "Dates" ? "active" : ''}`} onClick={() => setContent("Dates")}>Dates</Link>
          <Link to="/New-Item" className={`nav-item ${content === "NewItem" ? "active" : ''}`} onClick={() => setContent("NewItem")}>New Dates</Link>
        </nav>
      </div>
    </div>
  )
}