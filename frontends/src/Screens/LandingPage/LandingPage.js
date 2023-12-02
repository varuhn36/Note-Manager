import React, { useEffect } from 'react';
import { Container, Row, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      navigate('/mynotes');
    }
  }, [navigate]);

  return (
    <div className="main">
      <Container>
        <Row>
          <div className="login-text">
            <div>
              <h1 className="title">Welcome to Notes Manager!!</h1>
              <p className="subtitle">A place to save your notes easily and securely.</p>

              <div className="button-container">
                <Link to="/login">
                  <Button size="lg" className="loginsignup-button" variant="light">
                    Login
                  </Button>
                </Link>

                <Link to="/register">
                  <Button size="lg" className="loginsignup-button" variant="light">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
