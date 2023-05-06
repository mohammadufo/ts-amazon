import { useContext, useEffect } from "react";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { Store } from "./Store";
import { LinkContainer } from "react-router-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const {
    state: { mode, cart },
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
            <LinkContainer to="/">
              <Navbar.Brand>Amazon</Navbar.Brand>
            </LinkContainer>
          </div>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}></i>
            </Button>
            <Link to="/cart" className="nav-link">
              Cart
              {cart.cartItems.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
            </Link>
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
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
      <ToastContainer position="top-right" limit={3} />
    </div>
  );
}

export default App;
