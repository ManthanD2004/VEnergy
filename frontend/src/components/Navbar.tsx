import React, { forwardRef } from 'react';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = forwardRef<HTMLElement>((props, ref) => {
  const location = useLocation();
  const [activeLink, setActiveLink] = React.useState(location.pathname);

  const handleLinkClick = (href: string) => {
    setActiveLink(href);
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <BootstrapNavbar ref={ref} expand="lg" className="py-3 mb-4" fixed="top">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/" className="d-flex align-items-center" onClick={() => handleLinkClick('/')}>
          <span className="fs-4">Minsun Solar</span>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" active={activeLink === '/'} onClick={() => handleLinkClick('/')}>Home</Nav.Link>
            <Nav.Link as={Link} to="/residential" active={activeLink === '/residential'} onClick={() => handleLinkClick('/residential')}>Residential</Nav.Link>
            <Nav.Link as={Link} to="/commercial" active={activeLink === '/commercial'} onClick={() => handleLinkClick('/commercial')}>Commercial</Nav.Link>
            <Nav.Link as={Link} to="/about" active={activeLink === '/about'} onClick={() => handleLinkClick('/about')}>About Us</Nav.Link>
            <Nav.Link as={Link} to="/calculator" active={activeLink === '/calculator'} onClick={() => handleLinkClick('/calculator')}>Calculator</Nav.Link>
            <Nav.Link
              href="tel:7441100802"
              className="navbar-phone-link"
              onClick={(e) => {
                // Check if on a touch-enabled device (likely mobile)
                const isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

                if (isMobile) {
                  // On mobile, allow the default tel: link behavior
                  return true; // Let the default action proceed
                } else {
                  // On non-mobile (desktop), copy the number to clipboard
                  e.preventDefault(); // Prevent default tel: link behavior
                  navigator.clipboard.writeText('7441100802').then(() => {
                    alert('Phone number copied: 7441100802');
                  }).catch(err => {
                    console.error('Failed to copy phone number: ', err);
                  });
                }
              }}
            >7441100802</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 