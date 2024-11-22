import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "./Drawer.css";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import { type } from "@testing-library/user-event/dist/type";
function Homepage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  const ProfileDrawer = () => {
    setIsProfileOpen(!isProfileOpen);
  };
  const [journey, setJourney] = useState({
    source: "",
    destination: "",
  });
  const [fare, setFare] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Calculate fare based on the selected source and destination
    const calculatedFare = calculateFare(journey.source, journey.destination);
    setFare(calculatedFare);
  };

  let navigate = useNavigate();

  // Function to calculate fare based on source and destination
  const calculateFare = (source, destination) => {
    // Your fare calculation logic here
    // For demonstration, let's assume a basic calculation
    const basicFare = 5; // Base fare
    const sourceIndex = stationIndexMap[source];
    const destinationIndex = stationIndexMap[destination];
    const distanceFare = 5 * Math.abs(destinationIndex - sourceIndex); // Fare based on distance (Assuming each station is 5 units away)
    return basicFare + distanceFare;
  };

  // Mapping station names to index for fare calculation
  const stationIndexMap = {
    "Thaltej Gam": 0,
    Thaltej: 0,
    "Doordarshan Kendra": 0,
    "Gurukul Road": 1,
    "Gujarat University": 1,
    "Commerce Six Road": 1,
    Stadium: 1,
    "Old High Court(interchange station with north-south corridor)": 1,
    "Sabarmati River": 2,
    Shahpur: 2,
    Gheekanta: 2,
    "Kalupur Railway Station": 2,
    "Kankaria East": 3,
    "Apparel Park Depot": 3,
    "Apparel Park": 3,
    Amraiwadi: 3,
    "Rabari Colony": 3,
    Vastral: 4,
    "Nirant Cross Road": 4,
    "Vastral Gam": 4,
  };

  // Retrieve index for source and destination stations
  const sourceIndex = stationIndexMap[journey.source];
  const destinationIndex = stationIndexMap[journey.destination];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setJourney((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(true);
  };
  const handleClose = () => {
    setAdd(false);
  };
  const handleCancel = () => {
    setAdd(false);
    setIsDrawerOpen(false);
  };
  return (
    <div>
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
              <button className="buttons">Home</button>
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
      {add && (
        <Dialog open={add} onClose={handleClose}>
          <DialogTitle>Book Your Journey</DialogTitle>
          <DialogContent>
            <form>
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Source :{" "}
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="source"
                  aria-describedby="addon-wrapping"
                  id="source"
                  name="source"
                  value={journey.source}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Source</option>
                  <option value="Thaltej Gam">Thaltej Gam</option>
                  <option value="Thaltej">Thaltej</option>
                  <option value="Doordarshan Kendra">Doordarshan Kendra</option>
                  <option value="Gurukul Road">Gurukul Road</option>
                  <option value="Gujarat University">Gujarat University</option>
                  <option value="Commerce Six Road">Commerce Six Road</option>
                  <option value="Stadium">Stadium</option>
                  <option value="Old High Court interchange">Old High Court interchange </option>
                  <option value="Sabarmati River">Sabarmati River</option>
                  <option value="Shahpur">Shahpur</option>
                  <option value="Gheekanta">Gheekanta</option>
                  <option value="Kalupur Railway Station">Kalupur Railway Station</option>
                  <option value="Kankaria East">Kankaria East</option>
                  <option value="Apparel Park Depot">Apparel Park Depot</option>
                  <option value="Apparel Park">Apparel Park</option>
                  <option value="Amraiwadi">Amraiwadi</option>
                  <option value="Rabari Colony">Rabari Colony</option>
                  <option value="Vastral">Vastral</option>
                  <option value="Nirant Cross Road">Nirant Cross Road</option>
                  <option value="Vastral Gam">Vastral Gam</option>
                  <option value="Motera stadium">Motera stadium</option>
                  <option value="Sabarmati">Sabarmati</option>
                  <option value="AEC">AEC</option>
                  <option value="Sabarmati Railway Station">Sabarmati Railway Station</option>
                  <option value="Ranip">Ranip</option>
                  <option value="Vadaj">Vadaj</option>
                  <option value="Vijay Nagar">Vijay Nagar</option>
                  <option value="Usmanpura">Usmanpura</option>
                  <option value="Old High Court interchange">Old High Court interchange</option>
                  <option value="Gandhigram">Gandhigram</option>
                  <option value="Paldi">Paldi</option>
                  <option value="Shreyas">Shreyas</option>
                  <option value="Rajiv Nagar">Rajiv Nagar</option>
                  <option value="Jivraj Park">Jivraj Park</option>
                  <option value="AMPC">APMC</option>
                </select>
              </div>
              <br />
              <div class="input-group flex-nowrap">
                <span class="input-group-text" id="addon-wrapping">
                  Destination :{" "}
                </span>
                <select
                  style={{ margin: "auto" }}
                  className="form-control"
                  aria-label="destination"
                  aria-describedby="addon-wrapping"
                  id="destination"
                  name="destination"
                  value={journey.destination}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Destination</option>
                  <option value="Thaltej Gam">Thaltej Gam</option>
                  <option value="Thaltej">Thaltej</option>
                  <option value="Doordarshan Kendra">Doordarshan Kendra</option>
                  <option value="Gurukul Road">Gurukul Road</option>
                  <option value="Gujarat University">Gujarat University</option>
                  <option value="Commerce Six Road">Commerce Six Road</option>
                  <option value="Stadium">Stadium</option>
                  <option value="Old High Court interchange">Old High Court interchange</option>
                  <option value="Sabarmati River">Sabarmati River</option>
                  <option value="Shahpur">Shahpur</option>
                  <option value="Gheekanta">Gheekanta</option>
                  <option value="Kalupur Railway Station">Kalupur Railway Station</option>
                  <option value="Kankaria East">Kankaria East</option>
                  <option value="Apparel Park Depot">Apparel Park Depot</option>
                  <option value="Apparel Park">Apparel Park</option>
                  <option value="Amraiwadi">Amraiwadi</option>
                  <option value="Rabari Colony">Rabari Colony</option>
                  <option value="Vastral">Vastral</option>
                  <option value="Nirant Cross Road">Nirant Cross Road</option>
                  <option value="Vastral Gam">Vastral Gam</option>
                  <option value="Motera stadium">Motera stadium</option>
                  <option value="Sabarmati">Sabarmati</option>
                  <option value="AEC">AEC</option>
                  <option value="Sabarmati Railway Station">Sabarmati Railway Station</option>
                  <option value="Ranip">Ranip</option>
                  <option value="Vadaj">Vadaj</option>
                  <option value="Vijay Nagar">Vijay Nagar</option>
                  <option value="Usmanpura">Usmanpura</option>
                  <option value="Old High Court interchange">Old High Court interchange</option>
                  <option value="Gandhigram">Gandhigram</option>
                  <option value="Paldi">Paldi</option>
                  <option value="Shreyas">Shreyas</option>
                  <option value="Rajiv Nagar">Rajiv Nagar</option>
                  <option value="Jivraj Park">Jivraj Park</option>
                  <option value="AMPC">APMC</option>
                </select>
              </div>
              <br />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {fare !== null && (
        <Dialog open={fare !== null} onClose={() => setFare(null)}>
          <DialogTitle>Ticket Fare</DialogTitle>
          <DialogContent>
            <p>
              The fare for your journey from {journey.source} to{" "}
              {journey.destination} is <span>&#8377;</span>
              {fare}
            </p>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setFare(null)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
      <div className="home-container">
        <div className="hero-container">
          <h1>Ahmedabad Metro</h1>
          <center>
            <img
              src="https://yometro.com/images/metro/ahmedabad-metro-logo.png"
              alt="Ahmedabad Metro"
              className="photo"
            />
          </center>
        </div>
        <div className="home-details">
          <div className="home-details1">
            <div>
              <h1 style={{ color: "orange" }}>
                Ahmedabad Metro Website Services
              </h1>
              <h4>
                Our website offers a range of features including login and
                registration, information on locations to visit, online ticket
                booking, contact details, fare rates, and a tracking system for
                metro trains.
              </h4>
            </div>
          </div>
        </div>

        <div className="home-pricing">
          <div className="home-pricing1">
            <h2 style={{ color: "orange" }}>Choose the Perfect Plan for You</h2>
            <p>Select from our range of pricing plans to suit your needs</p>
            <div className="d-flex justify-content-center">
              <div className="home-pricing-card">
                <h3>Free</h3>
                <p>A short description for the free plan</p>
                <div>
                  <span>
                    <b>0</b>
                  </span>
                </div>
                <ul>
                  <li> Access to basic website creation tools</li>
                  <li> Limited customization options</li>
                  <li> No online ticket booking feature</li>
                  <li> No access to tracking a metro train</li>
                </ul>
                <button className="btn btn-outline-dark">
                  Continue with Free
                </button>
              </div>

              <div className="home-pricing-card1">
                <h3>BASIC</h3>
                <p>A short description for the basic plan</p>
                <div>
                  <span>350 / month</span>
                </div>
                <ul>
                  <li> All features of FREE plan</li>
                  <li> Access to advanced website creation tools</li>
                  <li> More customization options</li>
                  <li> Online ticket booking feature included</li>
                  <li> No access to tracking a metro train</li>
                </ul>
                <button
                  className="planbutton"
                  onMouseOver={(e) => (e.target.style.backgroundColor = "blue")}
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Try the Basic plan
                </button>
              </div>

              <div className="home-pricing-card2">
                <h3>PRO</h3>
                <p>A short description for the pro plan</p>
                <div>
                  <span>700 / month</span>
                </div>
                <ul>
                  <li> All features of BASIC plan</li>
                  <li> Access to premium website creation tools</li>
                  <li> Full customization options</li>
                  <li> Online ticket booking feature included</li>
                </ul>
                <button
                  className="planbutton"
                  onMouseOver={(e) => (e.target.style.backgroundColor = "blue")}
                  onMouseOut={(e) =>
                    (e.target.style.backgroundColor = "transparent")
                  }
                >
                  Try the PRO plan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-gallery">
          <h1 style={{ color: "orange" }}>Explore Ahmedabad Metro</h1>
          <p>Discover the beauty and convenience of Ahmedabad Metro</p>
          <img
            src="https://preview.redd.it/ql0y0wbuyyq91.jpg?width=1080&crop=smart&auto=webp&s=dff2180ed3a25a2eff0e3926bc5d1635278bf197"
            alt=""
            className="metroimage"
          />
          <div className="d-flex flex-wrap justify-content-center">
            <img
              src="https://d1c4d7gnm6as1q.cloudfront.net/Pictures/1120xAny/0/2/7/23027_tn_in-ahmedabad-opening-modi.jpg"
              alt="Gallery Image 1"
              className="col-md-3"
            />
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.liTUvlV6SmEhzvuhPv_uoAHaEp&pid=Api&P=0&h=180"
              alt="Gallery Image 2"
              className="col-md-3"
            />
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.WPiHUQ10Y91OpI4BPujCZgHaEK&pid=Api&P=0&h=180"
              alt="Gallery Image 3"
              className="col-md-3"
            />
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.e-8jPp6WIDLP4WdMYlW5oAHaE6&pid=Api&P=0&h=180"
              alt="Gallery Image 4"
              className="col-md-3"
            />
          </div>
        </div>
        <div className="home-banner">
          <div className="home-faq">
            <h2>
              <b>FAQ </b>
            </h2>
            <h3>Common Questions</h3>
            <div>
              <p>
                <strong>
                  <b> How can I create a website based on Ahmedabad Metro? </b>
                </strong>
              </p>
              <p>
                To create a website based on Ahmedabad Metro, you can use web
                development tools and technologies such as HTML, CSS,
                JavaScript, and frameworks like React or Angular.
              </p>
              <p>
                <strong>
                  <b>
                    Where can I find the login and registration page for the
                    Ahmedabad Metro website?
                  </b>
                </strong>
              </p>
              <p>
                You can find the login and registration page on the Ahmedabad
                Metro website under the "Account" section in the main menu.
              </p>
              <p>
                <strong>
                  {" "}
                  <b>How do I book tickets online for Ahmedabad Metro?</b>
                </strong>
              </p>
              <p>
                To book tickets online, visit the official Ahmedabad Metro
                website and navigate to the "Tickets" section. From there, you
                can select your journey details and proceed with the booking
                process.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
