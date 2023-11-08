import React, { useEffect, useState } from "react";
import "./../Dashboard/Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import RightContent from "../RightContent/RightContent";
import { addSkills } from "../../Actions/dashboardActions";
import { getUserDetails } from "../../Actions/userActions";
const AddSkills = () => {
  const { loading, error, message } = useSelector((state) => state.addSkills);
  const dispatch = useDispatch();
  const alert = useAlert();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.success(message);
      dispatch({ type: "clearMessages" });
      setName("");
      setImage("");
      dispatch(getUserDetails());
    }
  }, [alert, error, message, dispatch]);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState(0);
  const [image, setImage] = useState("");

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const submitSkill = (e) => {
    e.preventDefault();
    dispatch(addSkills({ name, image, experience }));
  };
  return (
    <div className="Dashboard">
      <div className="dashboard-content add-projects">
        <h1>Add Skills</h1>
        <form action="" onSubmit={submitSkill}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Skill Name"
            name=""
            required
            id=""
          />
          <input
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Experience - 0 to 100"
            name=""
            required
            id=""
          />

          <label id="thumb" htmlFor="thumbnail">
            Choose Thumbnail
          </label>
          {image && <img src={image} alt="" />}
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
            value="Submit Skill"
          />
        </form>
      </div>

      <RightContent />
    </div>
  );
};

export default AddSkills;
