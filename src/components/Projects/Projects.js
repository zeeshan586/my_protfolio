import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import IGNITE from "../../Assets/Projects/IGNITE.png";
import HARMONY from "../../Assets/Projects/HARMONY.png";
import tabeeby from "../../Assets/Projects/tabeeby.png";
import Dakhter from "../../Assets/Projects/Dakhter.png";

import HAYAT from "../../Assets/Projects/HAYAT.png";
import AGENCY from "../../Assets/Projects/AGENCY.png";
import AAAA from "../../Assets/Projects/AAA.png";
import Tabeeby_web from "../../Assets/Projects/Tabeeby_web.png";
import RAQAMI from "../../Assets/Projects/RAQAMI.png";
import GOLT from "../../Assets/Projects/GOLT.png";
import WINK from "../../Assets/Projects/WINK.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={tabeeby} // Replace this with the image path for Tabeeby
              isBlog={false}
              title="Tabeeby App"
              description="An online appointment system that helps users schedule and manage appointments efficiently and built with React.js, Material-UI."
              link="https://play.google.com/store/apps/details?id=com.tabeebypatient&hl=en&pli=1" // Replace with the correct GitHub link if needed
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Tabeeby_web} // Replace this with the image path for Tabeeby
              isBlog={false}
              title="Tabeeby Web"
              description="An online appointment system that helps users schedule and manage appointments efficiently and built with React.js, Material-UI."
              link="" // Replace with the correct GitHub link if needed
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={GOLT} // Replace this with the image path for Tabeeby
              isBlog={false}
              title="Golt Drive Web"
              description="Allows users to book rides through its app & web for quick and convenient transportation. Just enter your location, select a ride type, and confirm your booking .  built with React.js, Material-UI , ant Design."
              link="" // Replace with the correct GitHub link if needed
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={Dakhter} // Replace this with the image path for Tabeeby
              isBlog={false}
              title="Dakter`s App"
              description="An online appointment system that helps users schedule and manage appointments efficiently and built with React.js, Material-UI."
              link="https://dakhter.app/" // Replace with the correct GitHub link if needed
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={AAAA}
              isBlog={false}
              title="AAA InterSwitch Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={HAYAT}
              isBlog={false}
              title="HAYAT Finance  Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={HARMONY}
              isBlog={false}
              title="Harmony Finance Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={IGNITE}
              isBlog={false}
              title="IGNITE Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />
          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={AGENCY}
              isBlog={false}
              title="AGENCY Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />
          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={RAQAMI}
              isBlog={false}
              title="RAQAMI Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />


          </Col>


          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={WINK}
              isBlog={false}
              title="WINK Banking App"
              description="An online mobile banking system that provides users with secure and convenient access to banking services via their mobile devices .Developed multiple mobile applications using Flutter and Dart."

              // description="Developed multiple mobile applications using Flutter and Dart"
              link=""
            />


          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
