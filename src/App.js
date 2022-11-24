import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import BookReview from "./Pages/BookReview";
// import "./Stylesheets/App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./Stylesheets/Login.css";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const handleSignOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/";
    });
  };
  return (
    <>
      <Router>
        <Navbar
          expand="md"
          variant="dark"
          // style={{ backgroundColor: "#393e467d" }}
          style={{ backgroundColor: "#435564" }}
          sticky="top"
        >
          <Container>
            <Navbar.Brand>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                Bookagraphy
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                {!isAuth ? (
                  <>
                  <Nav.Link>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Home
                    </Link>
                  </Nav.Link>
                  <Nav.Link>
                    <Link
                      to="/login"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Login
                    </Link>
                  </Nav.Link>
                  </>
                ) : (
                  <>
                  <Nav.Link>
                    <Link
                      to="/"
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      Home
                    </Link>
                  </Nav.Link>
                    <Nav.Link>
                      <Link
                        to="/bookreview"
                        style={{ textDecoration: "none", color: "white" }}
                      >
                        Write a Review
                      </Link>
                    </Nav.Link>
                    <button
                      style={{
                        border: 0,
                        outline: 0,
                        backgroundColor: "transparent",
                        color: "red",
                      }}
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
          <Route path="/bookreview" element={<BookReview isAuth={isAuth} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
