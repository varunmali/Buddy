import React, { useCallback, useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import "./style.css";
import { useNavigate } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { Menu, MenuItem, IconButton, Typography } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = () => {
  const navigate = useNavigate();
  // const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const storeData = localStorage.getItem("user");
  const users = JSON.parse(storeData);
  const firstName = users?.firstName;
  console.log("first name is", firstName);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "#000" } },
            fpsLimit: 60,
            particles: {
              number: {
                value: 200,
                density: { enable: true, value_area: 800 },
              },
              color: { value: "#ffcc00" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: { enable: true, minimumValue: 1 } },
              move: { enable: true, speed: 2 },
            },
            detectRetina: true,
          }}
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Navbar
          className="navbarCSS"
          expand="lg"
          style={{ position: "relative", zIndex: 2 }}
        >
          <Navbar.Brand href="/" className="text-white navTitle">
            Budget Buddy
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            {/* {user ? (
              <Dropdown
                align="end"
                show={showDropdown}
                onToggle={(isOpen) => setShowDropdown(isOpen)}
              >
                <Dropdown.Toggle
                  variant="link"
                  id="dropdown-basic"
                  className="p-0 border-0"
                >
                  <img
                    src={user.avatarImage || "/default-avatar.png"}
                    alt="User Avatar"
                    width="40"
                    height="40"
                    className="rounded-circle"
                    onClick={() => setShowDropdown(!showDropdown)} // Manually toggle
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.ItemText className="text-center">
                    <strong>{user.name}</strong>
                  </Dropdown.ItemText>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : ( */}{" "}
            {user ? (
              <div style={{ textAlign: "center" }}>
                <IconButton onClick={handleClick} color="primary">
                  {/* <AccountCircleIcon fontSize="large" /> */}
                  <img
                    src={user.avatarImage || "/default-avatar.png"}
                    alt="User Avatar"
                    width="40"
                    height="40"
                    className="rounded-circle"
                    border="2px solid #fff"
                  />
                </IconButton>
                <Typography variant="body1" style={{ color: "white" }}>
                  <strong>{user.name}</strong>
                </Typography>
                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: { minWidth: "150px" },
                  }}
                >
                  <IconButton onClick={handleClick} color="primary">
                    {/* <AccountCircleIcon fontSize="large" /> */}
                    <img
                      src={user.avatarImage || "/default-avatar.png"}
                      alt="User Avatar"
                      width="40"
                      height="40"
                      className="rounded-circle"
                      border="2px solid #fff"
                    />
                    <Typography
                    // variant="body1"
                    // style={{ marginleft: "4px", color: "black" }}
                    >
                      <strong className="ml">{user.name}</strong>
                    </Typography>
                  </IconButton>

                  <MenuItem onClick={() => handleLogout()}>
                    <ExitToAppIcon sx={{ cursor: "pointer" }} />
                    <strong className="ml">Logout</strong>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Nav>
                <Button variant="primary" onClick={() => navigate("/login")}>
                  Login
                </Button>
              </Nav>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
