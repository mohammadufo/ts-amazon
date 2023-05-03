import { Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Store } from "./Store";

function App() {
  const {
    state: { mode },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  return (
    <div className="d-flex flex-column main">
      <header>
        <Navbar
          expand="lg"
          className="d-flex align-items-center justify-content-around"
        >
          <div>
            <Navbar.Brand>Amazon</Navbar.Brand>
          </div>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <a href="/cart" className="nav-link">
              Cart
            </a>
            <a href="/signin" className="nav-link">
              Sign In
            </a>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer className="footer">
        <div className="text-center ">All rights reserved by Muhammad UFO</div>
      </footer>
    </div>
  );
}

export default App;
