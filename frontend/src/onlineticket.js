import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import Dialog from "@mui/material/Dialog";
// import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "./onlineticket.css";
import { orange } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
const TIcketBookingForm = () => {
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
  const [ticket, setTicket] = useState({
    source: "",
    destination: "",
    date: "",
    number: "",
  });
  const [bookingStatus, setBookingStatus] = useState(false);
  const [fare, setFare] = useState(null);
  const [dialog, setDialog] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicket((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setDialog(false);
  };
  const [totalAmount, setTotalAmount] = useState(null);
  const handleTicket = () => {
    // Calculate fare based on the selected source and destination
    const calculatedFare = calculateFare(ticket.source, ticket.destination);
    const totalAmount = calculatedFare * ticket.number;
    setFare(calculatedFare);
    setTotalAmount(totalAmount);
    setDialog(true);
    setBookingStatus(true)
    setTimeout(() => {
      setBookingStatus(false)
    }, 3000);
    axios
      .post("http://127.0.0.1:8000/api/v1/ticket/bookticket", ticket)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error?.response);
      });
  };

  // Function to calculate fare based on source and destination
  const calculateFare = (source, destination) => {
    // Your fare calculation logic here
    // For demonstration, let's assume a basic calculation
    const basicFare = 5; // Base fare
    const sourceIndex = stationIndexMap[source];
    const destinationIndex = stationIndexMap[destination];
    const distanceFare = 5 * Math.abs(destinationIndex - sourceIndex); // Fare based on distance (Assuming each station is 5 units away)
    return basicFare + distanceFare;
    // const totalAmount = calculatedFare * parseInt(ticket.number);
  };

  // Mapping station names to index for fare calculation
  const stationIndexMap = {
    "Thaltej Gam": 0,
    "Thaltej": 0,
    "Doordarshan Kendra": 0,
    "Gurukul Road": 1,
    "Gujarat University": 1,
    "Commerce Six Road": 1,
    "Stadium": 1,
    "Old High Court(interchange station with north-south corridor)": 1,
    "Sabarmati River": 2,
    "Shahpur": 2,
    "Gheekanta": 2,
    "Kalupur Railway Station": 2,
    "Kankaria East": 3,
    "Apparel Park Depot": 3,
    "Apparel Park": 3,
    "Amraiwadi": 3,
    "Rabari Colony": 3,
    "Vastral": 4,
    "Nirant Cross Road": 4,
    "Vastral Gam": 4,
  };
  let navigate=useNavigate()
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
              <button className="buttons" onClick={() => navigate("/homepage")}>
                Home
              </button>
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
      <div
        className="smart-card-register-form"
        style={{ marginTop: "4%", background: orange }}
      >
        <center>
          <h2>Online Ticket Booking</h2>
        </center>
        {bookingStatus && (
          <Alert variant="success">Booking successful!</Alert>
        )}
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
            value={ticket.source}
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
            <option value="Old High Court(interchange station with north-south corridor)">
              Old High Court(interchange station with north-south corridor)
            </option>
            <option value="Sabarmati River">Sabarmati River</option>
            <option value="Shahpur">Shahpur</option>
            <option value="Gheekanta">Gheekanta</option>
            <option value="Kalupur Railway Station">
              Kalupur Railway Station
            </option>
            <option value="Kankaria East">Kankaria East</option>
            <option value="Apparel Park Depot">Apparel Park Depot</option>
            <option value="Apparel Park">Apparel Park</option>
            <option value="Amraiwadi">Amraiwadi</option>
            <option value="Rabari Colony">Rabari Colony</option>
            <option value="Vastral">Vastral</option>
            <option value="Nirant Cross Road">Nirant Cross Road</option>
            <option value="Vastral Gam">Vastral Gam</option>
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
            value={ticket.destination}
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
            <option value="Old High Court(interchange station with north-south corridor)">
              Old High Court(interchange station with north-south corridor)
            </option>
            <option value="Sabarmati River">Sabarmati River</option>
            <option value="Shahpur">Shahpur</option>
            <option value="Gheekanta">Gheekanta</option>
            <option value="Kalupur Railway Station">
              Kalupur Railway Station
            </option>
            <option value="Kankaria East">Kankaria East</option>
            <option value="Apparel Park Depot">Apparel Park Depot</option>
            <option value="Apparel Park">Apparel Park</option>
            <option value="Amraiwadi">Amraiwadi</option>
            <option value="Rabari Colony">Rabari Colony</option>
            <option value="Vastral">Vastral</option>
            <option value="Nirant Cross Road">Nirant Cross Road</option>
            <option value="Vastral Gam">Vastral Gam</option>
          </select>
        </div>
        <br />{" "}
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            Date
          </span>
          <input
            type="date"
            onChange={handleChange}
            name="date"
            value={ticket.date}
            class="form-control"
            placeholder="Date"
            aria-label="date"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />
        <div class="input-group flex-nowrap">
          <span class="input-group-text" id="addon-wrapping">
            Number of tickets
          </span>
          <input
            type="number"
            onChange={handleChange}
            name="number"
            value={ticket.number}
            class="form-control"
            placeholder="Number Of Tickets"
            aria-label="Number Of Tickets"
            aria-describedby="addon-wrapping"
          />
        </div>
        <br />
        <div>
          <button type="submit" onClick={() => handleTicket()}>
            Generate Ticket
          </button>
        </div>
        {fare !== null && (
          <Dialog open={fare !== null} onClose={() => setFare(null)}>
            <DialogTitle>Ticket Fare</DialogTitle>
            <DialogContent>
              <p>
                The fare for your journey from {ticket.source} to{" "}
                {ticket.destination} is <span>&#8377;</span>
                {fare}
              </p>
            </DialogContent>
          </Dialog>
        )}
        {dialog && (
          <Dialog open={dialog} onClose={handleClose}>
            <DialogTitle>Ticket</DialogTitle>
            <DialogContent>
              <p>Source:{ticket.source}</p>
              <p>Destination:{ticket.destination}</p>
              <p>
                Total Amount:<span>&#8377;</span>
                {totalAmount}
              </p>
              <p>Date:{ticket.date}</p>
              <p>Total Ticket(s):{ticket.number}</p>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </>
  );
};
export default TIcketBookingForm;
