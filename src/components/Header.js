import React, { useState } from "react";
import "./Header.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useAuth } from "../context/AuthContext";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "fit-content",
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
    marginLeft: "80px",
    marginRight: "80px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    borderRadius: "15px",
    boxShadow: theme.shadows[15],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Header() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [openSignin, setOpenSignin] = useState(false);
  const [openForgotPassword, setOpenForgotPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup, currentUser, logout, login, resetPassword } = useAuth();

  const [message, setMessage] = useState("");

  async function signUp(event) {
    event.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(email, password, username);
    } catch {
      setError("Failed to create an account");
    }

    setEmail("");
    setUsername("");
    setPassword("");
    setOpen(false);
    setLoading(false);
  }

  async function signIn(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch {
      setError("Failed to sign in");
    }
    setEmail("");
    setPassword("");
    setOpenSignin(false);
    setLoading(false);
  }

  async function forgotPassword(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }
    setEmail("");
    setOpenSignin(false);
    setOpenForgotPassword(false);
    setLoading(false);
  }

  async function signOut() {
    setError("");
    try {
      await logout();
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <div className="header">
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="header__form">
            <center>
              <img
                style={{ marginBottom: "20px" }}
                className="header__image"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              disabled={loading}
              style={{ marginTop: "30px" }}
              type="submit"
              color="primary"
              variant="contained"
              onClick={signUp}
            >
              {loading ? "Loading..." : "Sign Up"}
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignin} onClose={() => setOpenSignin(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="header__form">
            <center>
              <img
                style={{ marginBottom: "20px" }}
                className="header__image"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              disabled={loading}
              style={{ marginTop: "30px" }}
              type="submit"
              color="primary"
              variant="contained"
              onClick={signIn}
            >
              {loading ? "Loading..." : "Sign In"}
            </Button>
          </form>
          <center>
            <Button onClick={() => setOpenForgotPassword(true)}>
              Forgot Password
            </Button>
          </center>
        </div>
      </Modal>

      <Modal
        open={openForgotPassword}
        onClose={() => setOpenForgotPassword(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="header__form">
            <center>
              <img
                style={{ marginBottom: "20px" }}
                className="header__image"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Button
              disabled={loading}
              style={{ marginTop: "30px" }}
              type="submit"
              color="primary"
              variant="contained"
              onClick={forgotPassword}
            >
              {loading ? "Loading..." : "Forgot Password"}
            </Button>
          </form>
        </div>
      </Modal>

      <img
        className="header__image"
        src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />

      {error ? (
        <div className={classes.root}>
          <Alert severity="error">{error}</Alert>
        </div>
      ) : (
        currentUser && (
          <div className={classes.root}>
            <Alert severity="success">Welcome {currentUser.displayName}</Alert>
          </div>
        )
      )}
      {message && <Alert severity="success">{message}</Alert>}
      <div>
        <Button
          color="primary"
          size="small"
          variant="contained"
          onClick={currentUser ? signOut : () => setOpenSignin(true)}
        >
          {currentUser ? "Sign Out" : "Sign In"}
        </Button>

        {!currentUser && (
          <Button
            color="primary"
            size="small"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            Sign Up
          </Button>
        )}
      </div>
    </div>
  );
}

export default Header;
