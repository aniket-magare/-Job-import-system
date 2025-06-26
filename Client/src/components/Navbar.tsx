'use client';

import Link from 'next/link';
import { Navbar, Container, Nav } from 'react-bootstrap';


export default function AppNavbar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">Job Importer</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto">
            <Link className="nav-link" href="/jobs">Jobs</Link>
            <Link className="nav-link" href="/logs">Import Logs</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
