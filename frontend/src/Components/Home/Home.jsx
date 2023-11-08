import React, { useEffect, useState } from "react";
import "./Home.css";
import { Typewriter } from "react-simple-typewriter";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  getUserDetails,
  sendContact,
} from "../../Actions/userActions";
import { useAlert } from "react-alert";
import { IconButton, LinearProgress } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { deleteSkill } from "../../Actions/userActions";
import LoadingGif from "../../assets/images/yy3.gif";
const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading: loadUserLoading } = useSelector(
    (state) => state.loadUser
  );
  const alert = useAlert();
  const {
    message: skillDeleteMessage,
    error: skillDeleteError,
    loading: skillDeleteLoading,
  } = useSelector((state) => state.deleteSkill);
  const [contactDetails, setContactDetails] = useState({
    userName: "",
    userEmail: "",
    userMessage: "",
  });
  const { loading, message, error } = useSelector((state) => state.sendContact);
  const { data, loading: getUserDataLoading } = useSelector(
    (state) => state.getUserData
  );
  const {
    loading: deleteProjectLoading,
    message: deleteProjectMessage,
    error: deleteProjectError,
  } = useSelector((state) => state.deleteProject);

  useEffect(() => {
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });

      setContactDetails({
        userName: "",
        userEmail: "",
        userMessage: "",
      });
    }

    if (skillDeleteMessage) {
      alert.success(skillDeleteMessage);
      dispatch({ type: "clearMessages" });
      dispatch(getUserDetails());
    }
    if (skillDeleteError) {
      alert.error(skillDeleteError);
      dispatch({ type: "clearErrors" });
    }
    if (deleteProjectMessage) {
      alert.success(deleteProjectMessage);
      dispatch({ type: "clearMessages" });
      dispatch(getUserDetails());
    }
    if (deleteProjectError) {
      alert.error(deleteProjectError);
      dispatch({ type: "clearErrors" });
    }
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [
    message,
    error,
    alert,
    dispatch,
    skillDeleteMessage,
    skillDeleteError,
    deleteProjectError,
    deleteProjectMessage,
  ]);

  const handleContactDetails = (e) => {
    setContactDetails((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const { userName, userEmail, userMessage } = contactDetails;
  const handleContact = (e) => {
    e.preventDefault();
    dispatch(sendContact({ userName, userEmail, userMessage }));
  };

  const deleteSkills = (id) => {
    dispatch(deleteSkill(id));
  };
  const deleteProjects = (id) => {
    dispatch(deleteProject(id));
  };
  data && data.skills && console.log(data.skills);
  const showProject = (url) => {
    const anchor = document.createElement("a");
    anchor.target = "_blank";
    anchor.href = url;
    anchor.rel = "noopener noreferrer";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };
  return loadUserLoading || getUserDataLoading ? (
    <div className="Loader">
      <img src={LoadingGif} alt="Loading..." />
    </div>
  ) : (
    <>
      {" "}
      <div className="Homes">
        <div className="about">
          <h3>
            {data?.about && (
              <Typewriter words={[`Hey, I am ${data.about.name}`]} />
            )}
          </h3>
          <h1 className="title">
            I Am A Self Taught <br /> {data?.about && data.about.title}
          </h1>
          <a href="#contact">Contact Me</a>
        </div>
        <div className="image">
          {data?.about && (
            <img
              className="avatar-image"
              src={data.about.avatar.url}
              alt="My Image"
            />
          )}
        </div>
      </div>
      <div className="projects" id="projects">
        <h1 style={{ color: "white" }}>Projects</h1>
        <div className="projects-set">
          {data && data?.projects && data.projects.length > 0
            ? data.projects.map((project) => {
                return (
                  <div
                    key={project._id}
                    onClick={() => showProject(project.demoUrl)}
                    style={{ position: "relative" }}
                    className="project-card"
                  >
                    <figure>
                      <img src={project.thumbnail.url} alt="Project Img" />
                    </figure>
                    <div className="project-details">
                      <h2 className="project-title d-margin">
                        {project.title}
                      </h2>
                      <p className="project-description d-margin">
                        {project.description}
                      </p>
                      <p className="project-description d-margin">
                        <strong>Key Features:</strong> {project.keyFeatures}
                      </p>
                      <div className="project-technologies d-margin">
                        <ul>
                          <li
                            style={{
                              listStyle: "none",
                              margin: "0rem 1rem 0rem 0rem",
                            }}
                          >
                            <strong>Technologies:</strong>
                          </li>
                          {project.techStack.split(" ").map((stack) => {
                            return <li key={stack}>{stack}</li>;
                          })}
                        </ul>
                      </div>
                      {project?.adminEmail && project?.adminPassword && (
                        <p className="project-description d-margin">
                          <strong style={{ marginRight: "5px" }}>
                            <i>Admin Account: </i>
                          </strong>{" "}
                          {"  "} <strong>Email:</strong> {project.adminEmail}{" "}
                          <strong style={{ marginLeft: "5px" }}>
                            Password:
                          </strong>{" "}
                          {project.adminPassword}
                        </p>
                      )}

                      <div className="project-links">
                        {project.github && project.github.length > 0 ? (
                          <a
                            style={{
                              textDecoration: "none",
                              backgroundColor: "grey",
                            }}
                            target="_blank"
                            href={project.github}
                          >
                            Github Link
                          </a>
                        ) : null}
                      </div>
                      {isAuthenticated && (
                        <IconButton
                          disabled={deleteProjectLoading ? true : false}
                          className="delete-project-button"
                          onClick={(e) => {
                            deleteProjects(project._id);
                            e.stopPropagation();
                          }}
                        >
                          <DeleteForever />
                        </IconButton>
                      )}
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div id="skills" className="skills">
        <h1 className="skills-title">Skills</h1>
        <div className="skills-set">
          {data && data?.skills && data.skills.length
            ? data.skills.map((skill) => {
                return (
                  <div
                    key={skill._id}
                    style={{ position: "relative" }}
                    className="skills-card"
                  >
                    <figure>
                      <img src={skill.image.url} alt="Skill" />
                    </figure>
                    <div className="skill-progressbar">
                      <h3>{skill.name}</h3>
                      <div className="progressbar-parent">
                        <p style={{ fontWeight: "bold" }}>0%</p>
                        <LinearProgress
                          className="progressbar"
                          variant="determinate"
                          value={skill.experience}
                        />
                        <p style={{ fontWeight: "bold" }}>
                          {skill.experience}%
                        </p>
                      </div>
                    </div>
                    {isAuthenticated && (
                      <IconButton
                        disabled={skillDeleteLoading ? true : false}
                        onDoubleClick={() => deleteSkills(`${skill._id}`)}
                        style={{ position: "absolute", top: "0", left: "0" }}
                      >
                        <DeleteForever />
                      </IconButton>
                    )}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div id="contact" className="contact">
        <div className="contact-content">
          <form action="" onSubmit={handleContact}>
            <h1>Contact Me</h1>
            <div className="email-name">
              <input
                name="userName"
                value={contactDetails.userName}
                type="text"
                onChange={handleContactDetails}
                autoComplete="off"
                required
                placeholder="Enter Your Name"
              />
              <input
                value={contactDetails.userEmail}
                autoComplete="off"
                name="userEmail"
                type="email"
                onChange={handleContactDetails}
                required
                placeholder="Enter Your Email"
              />
            </div>

            <textarea
              value={contactDetails.userMessage}
              name="userMessage"
              rows={7}
              onChange={handleContactDetails}
              autoComplete="off"
              placeholder="Message..."
            ></textarea>
            <input
              disabled={loading ? true : false}
              style={{
                backgroundColor: loading && "gray",
                cursor: loading && "default",
              }}
              type="submit"
              value="Send Mail"
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default Home;
