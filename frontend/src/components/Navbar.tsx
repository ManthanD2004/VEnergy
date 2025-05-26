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
            <Nav.Link href="#faq-section" active={activeLink === '#faq-section'} onClick={() => handleLinkClick('#faq-section')}>FAQs</Nav.Link>
            <Nav.Link as={Link} to="/about" active={activeLink === '/about'} onClick={() => handleLinkClick('/about')}>About Us</Nav.Link>
            <Nav.Link href="tel:9000828333" className="navbar-phone-link">9000828333</Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
});

Navbar.displayName = 'Navbar';

export default Navbar; 