import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import RightContent from "../RightContent/RightContent";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { addProject } from "../../Actions/dashboardActions";
import { getUserDetails } from "../../Actions/userActions";
const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { message, error, loading } = useSelector(
    (state) => state.createProject
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
      setAddProjects({
        title: "",
        techStack: "",
        description: "",
        demoUrl: "",
        github: "",
        keyFeatures: "",
      });
      setThumbnail("");
      dispatch(getUserDetails());
    }
  }, [alert, error, message, dispatch]);
  const [addProjects, setAddProjects] = useState({
    title: "",
    techStack: "",
    description: "",
    demoUrl: "",
    keyFeatures: "",
    github: "",
    adminEmail: "",
    adminPassword: "",
  });
  const [thumbnail, setThumbnail] = useState("");

  const handleAddProjects = (e) => {
    setAddProjects((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setThumbnail(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };
  const {
    title,
    description,
    techStack,
    demoUrl,
    github,
    keyFeatures,
    adminEmail,
    adminPassword,
  } = addProjects;

  const submitProject = (e) => {
    e.preventDefault();
    dispatch(
      addProject({
        title,
        description,
        techStack,
        demoUrl,
        github,
        thumbnail,
        keyFeatures,
        adminEmail,
        adminPassword,
      })
    );
  };
  return (
    <div className="Dashboard">
      <div className="dashboard-content add-projects">
        <h1>Add Projects</h1>
        <form action="" onSubmit={submitProject}>
          <input
            type="text"
            value={title}
            onChange={handleAddProjects}
            placeholder="Project Title"
            name="title"
            required
            id=""
          />
          <input
            type="text"
            value={techStack}
            onChange={handleAddProjects}
            placeholder="Project TechStack"
            name="techStack"
            required
            id=""
          />
          <input
            type="text"
            value={keyFeatures}
            onChange={handleAddProjects}
            placeholder="Key Features"
            name="keyFeatures"
            required
            id=""
          />
          <input
            type="text"
            value={description}
            onChange={handleAddProjects}
            placeholder="Project Description"
            name="description"
            required
            id=""
          />
          <input
            type="text"
            value={demoUrl}
            onChange={handleAddProjects}
            placeholder="Project Url"
            name="demoUrl"
            required
            id=""
          />
          <input
            type="text"
            value={github}
            onChange={handleAddProjects}
            placeholder="Github Link"
            name="github"
            id=""
          />
          <input
            type="email"
            value={adminEmail}
            onChange={handleAddProjects}
            placeholder="Admin Account Email"
            name="adminEmail"
            id=""
          />
          <input
            type="text"
            value={adminPassword}
            onChange={handleAddProjects}
            placeholder="Admin Account Password"
            name="adminPassword"
            id=""
          />
          <label id="thumb" htmlFor="thumbnail">
            Choose Thumbnail
          </label>
          {thumbnail && <img src={thumbnail} alt="" />}
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            name=""
            id="thumbnail"
          />
          <input
            disabled={loading ? true : false}
            style={{ backgroundColor: loading && "gray" }}
            type="submit"
            value="Submit Project"
          />
        </form>
      </div>

      <RightContent />
    </div>
  );
};

export default Dashboard;
