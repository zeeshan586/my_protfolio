import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import Chatbot from "../Chatbot/Chatbot";

function Home() {
  return (
    <section>
      <div>
        {/* ...footer if any */}
      </div>

      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            {/* Left Side: Profile Pic + Greeting */}
            <Col md={7} className="home-header">
              {/* Profile Picture on top */}
              <div style={{ textAlign: "left", marginBottom: "20px" }}>
                <img
                  src={require("../../Assets/zeeshan.jpg")} // Your profile pic
                  alt="Zeeshan Farooq"
                  style={{
                    width: "250px", // Adjust width as needed
                    height: "auto",
                    borderRadius: "10px", // Slightly rounded corners
                    objectFit: "cover",
                    // border: "2px solid #4F46E5" // Optional border
                  }}
                />
              </div>

              {/* Greeting and Name */}
              {/* <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There! <span className="wave" role="img" aria-label="wave">👋🏻</span>
              </h1> */}

              <h1 className="heading-name">
                <strong className="main-name">Senior Software Engineer • 5+ Years Experience</strong>
              </h1>

              {/* Type Animation */}
              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            {/* Right Side: Optional Hero Image */}
            <Col md={5} style={{ paddingBottom: 20, display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </Col>

            {/* Chatbot / Other sections */}
            <Col md={12} className="home-pic">
              <section id="career-ai-chatbot">
                {/* <Chatbot /> */}
              </section>
            </Col>
          </Row>
        </Container>
      </Container>

      <Home2 />
    </section>
  );
}

export default Home;