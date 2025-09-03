import React, {useState} from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Particle from "../Particle";
import Type from "./Type";
import myImg from "../../Assets/avatar.svg";
import Techstack from "../About/Techstack";
import ProjectCard from "../Projects/ProjectCards";
import flickVerse from "../../Assets/Projects/flickVerse.png"
import fitTrack from "../../Assets/Projects/fit_track.png";

function Home() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }
  const navigate = useNavigate();
  window.addEventListener("scroll", scrollHandler);

  const handleNavigation = (sectionId) => {
      navigate(`#${sectionId}`);
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
      updateExpanded(false);
  };
  return (
    <section>
      <Navbar
        expanded={expand}
        fixed="top"
        expand="md"
        className={navColour ? "sticky" : "navbar"} 
      >
        <Container>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            onClick={() => {
              updateExpanded(expand ? false : "expanded");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="#home"
                  onClick={(e) => handleNavigation(e, 'home')}>
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="#about"
                  onClick={(e) => handleNavigation(e, 'about')}>
                  About
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="#projects"
                  onClick={() => handleNavigation('projects')}>
                  Projects
                </Nav.Link>
              </Nav.Item>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  👋🏻
                </span>
              </h1>
              <h1 className="heading-name">
                I'm
                <strong className="main-name"> Abel </strong>
              </h1>
              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>
            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row>
            <Col md={8} className="home-about-description">
              <h1 style={{ fontSize: "2.6em" }}>
               About <span className="purple"> Me </span> 
              </h1>
              <p className="home-about-body lh-lg">
                  I am a passionate full-stack developer with expertise in <b className="purple"> MERN Stack and Laravel </b>
                 focused on creating high-quality, user-friendly web applications. With a strong grasp of both <b className="purple"> front-end </b> and <b className="purple"> back-end </b> development, I aim to deliver seamless, interactive experiences that align with user needs and business goals. I am deeply interested in developing new web technologies and products, always seeking to solve complex challenges and deliver innovative solutions.              
                  <br />
                <br />
              </p>
            </Col>
            <Col md={4} className="myAvtar">
              <div>
                <img src={myImg} className="img-fluid" alt="avatar" />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid className="about-section">
        <Particle />
        <Container>
          <h1 className="project-heading">
            Professional <strong className="purple">Skillset </strong>
          </h1>
          <Techstack />
        </Container>
      </Container>
      <Container fluid className="project-section" id="projects">
        <Particle />
        <Container>
          <h1 className="project-heading">
            My Recent <strong className="purple">Works </strong>
          </h1>
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={flickVerse}
                title="Flick Verse"
                description="A movie streaming site built with React.js and Tailwind CSS, featuring the latest movies and TV shows, along with a search function to help you find content quickly and easily."
                ghLink="https://github.com/abelwebdev/flick-verse"
                demoLink="https://flick-verse.netlify.app/"
              />
            </Col>

            <Col md={4} className="project-card">
              <ProjectCard
                imgPath={fitTrack}
                title="Fit Track"
                description="A MERN Stack website with a 1300+ exercise library for tracking workouts, creating personalized routines, and monitoring progress."
                ghLink="https://github.com/abelwebdev/fit-track-fe"
                demoLink="https://fit-track-fe.onrender.com"
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;