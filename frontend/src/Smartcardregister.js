import React, { useState } from "react";
import "./SmartCardRegisterForm.css"; // Import CSS file for styling
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import "./Drawer.css"
import { useNavigate } from 'react-router-dom';
const SmartCardRegisterForm = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ProfileDrawer = () => {
    setIsProfileOpen(!isProfileOpen)
  } 
  const [add, setAdd] = useState(false)
  const handleAdd = () => {
    setAdd(true)
  }
  let navigate=useNavigate()
  const [data, setData] = useState({
    fullname: "",
    email: "",
    contact: "",
    address: "",
  });
  const handleSubmit = () => {
    console.log("Data Submitted", data);
    // if(data === ''){
    //   alert("Data Saved Successfully")
    // }
    // else{
    //   alert("Please Enter Details")
    // }
    // You can add further logic here to submit the form data to the backend
    axios
      .post("http://127.0.0.1:8000/api/v1/smartcard/newsmartcard", data)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error?.response);
      });
    // and handle the response accordingly
    setData({
      fullname: "",
      email: "",
      contact: "",
      address: "",
    });
  };
  const handleCancel = () => {
    setData({
      fullname: "",
      email: "",
      contact: "",
      address: "",
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div className="drawer-menu-container">
        <button className="drawer-toggle-btn" onClick={toggleDrawer}>
          <FontAwesomeIcon icon={faBars} />
        </button>
        <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
          <button className="drawer-toggle-btn" onClick={toggleDrawer}>
            <FontAwesomeIcon icon={faBars} style={{ color: "white" }} />
          </button>
          <ul className="drawer-menu">
            <li>
              <button className="buttons" onClick={()=>navigate("/homepage")}>Home</button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => navigate("/onlineticket")}
              >
                Online Booking
              </button>
            </li>
            <li>
              <button className="buttons" onClick={() => handleAdd()}>
                Plan Your Journey
              </button>
            </li>
            <li>
              <button
                className="buttons"
                onClick={() => navigate("/Smartcardregister")}
              >
                Smart Card Register
              </button>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <img
            src="https://ahmedabadmetro.app/wp-content/uploads/2019/03/cropped-logo_new.001.png"
            className="image"
          />
        </div>
        <div className="drawer-menu-container">
          <button className="profile-btn-container" onClick={ProfileDrawer}>
            <FontAwesomeIcon icon={faUserCircle} />
          </button>
          <div className={`drawers ${isProfileOpen ? "open" : ""}`}>
            <button className="profile-btn-container" onClick={ProfileDrawer}>
              <FontAwesomeIcon
                icon={faUserCircle}
                style={{ color: "white", paddingLeft: "200px" }}
              />
            </button>
            <ul className="drawers-menu">
              <li>
                <button
                  className="profile-button"
                  onClick={() => navigate("/login")}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="smart-card-register-form" style={{ marginTop: "3%" }}>
        <center>
          <h2>Smart Card Registration</h2>
        </center>
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            Name
          </span>
          <input
            type="text"
            onChange={handleChange}
            name="fullname"
            value={data.fullname}
            class="form-control"
            placeholder="Name"
            aria-label="Name"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            Email
          </span>
          <input
            type="text"
            onChange={handleChange}
            name="email"
            value={data.email}
            class="form-control"
            placeholder="Email"
            aria-label="Email"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            Contact
          </span>
          <input
            type="number"
            onChange={handleChange}
            name="contact"
            value={data.contact}
            class="form-control"
            placeholder="contact"
            aria-label="contact"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            Address
          </span>
          <input
            type="text"
            onChange={handleChange}
            name="address"
            value={data.address}
            class="form-control"
            placeholder="Address"
            aria-label="Address"
            aria-describedby="addon-wrapping"
          />
        </div>
         <center>
         <button type="submit" className="button" onClick={() => handleSubmit()}>Submit</button><button type="cancel" className="button" onClick={() => handleCancel()}>Cancel</button>
         </center>
      </div>
    </>
  );
};

export default SmartCardRegisterForm;
