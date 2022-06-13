import React, { useCallback, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { Alert, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import "../styles/FormStyle.css";
import { Paper } from "@material-ui/core";
import {
  clear,
  updateDetails,
  setMessage,
  setConfirm,
  passwordValidity,
} from "../Slices/updateSlice";

const Form = () => {
  const [userName, setUserName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showAlert, setShowAlert] = React.useState(false);

  const dispatch = useDispatch();
  const status = useSelector((state) => state.updater.status);
  const message = useSelector((state) => state.updater.message);
  const isConfirm = useSelector((state) => state.updater.isConfirm);
  const isValidPassword = useSelector((state) => state.updater.isValidPassword);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      if (isValidPassword && isConfirm) {
        dispatch(
          updateDetails({
            name: userName,
            phone: phoneNumber,
            status: "updated",
          })
        );
      }
    },
    [dispatch, isConfirm, isValidPassword, phoneNumber, userName]
  );

  useEffect(() => {
    dispatch(clear());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameChange = useCallback((event) => {
    const limit = 32;
    setUserName(event.target.value.slice(0, limit));
  }, []);

  const handlePhoneChange = useCallback(
    (event) => {
      var reg = /^\d+$/;
      if (reg.test(event.target.value) === false) {
        dispatch(setMessage("should be only numbers"));
        setShowAlert(true);
      } else {
        setShowAlert(false);
      }
      const limit = 10;
      setPhoneNumber(event.target.value.slice(0, limit));
    },
    [dispatch]
  );

  const handlePassword = useCallback(
    (event) => {
      var regularExpression =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,12}$/;
      setPassword(event.target.value);
      if (regularExpression.test(event.target.value) === false) {
        dispatch(setMessage("The password does not match the template"));
        setShowAlert(true);
      } else {
        setShowAlert(false);

        dispatch(passwordValidity(true));

        setPassword(event.target.value);
      }
    },
    [dispatch]
  );

  const handleConfirm = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);

      if (event.target.value !== password && password !== "") {
        dispatch(setMessage("Different passwords"));
        setShowAlert(true);
      } else {
        dispatch(setConfirm(true));
        setShowAlert(false);
      }
    },
    [dispatch, password]
  );

  return (
    <div className="form-container">
      <Paper className="form">
        <form onSubmit={handleSubmit}>
          <Grid container justifyContent="center">
            <TextField
              sx={{ margin: 1, marginInline: 5 }}
              required
              label="User name"
              value={userName}
              onChange={handleNameChange}
            />
            <TextField
              sx={{ margin: 1, marginInline: 5 }}
              required
              label="Phone number"
              value={phoneNumber}
              onChange={handlePhoneChange}
            />
            <TextField
              sx={{ margin: 1, marginInline: 5 }}
              label="Password"
              type="password"
              value={password}
              onChange={handlePassword}
            />
            <TextField
              sx={{ margin: 1, marginInline: 5 }}
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirm}
              disabled={isValidPassword ? false : true}
            />
            <Button
              color="primary"
              size="small"
              type="submit"
              variant="contained"
              disabled={isValidPassword && isConfirm ? false : true}
            >
              Submit
            </Button>
          </Grid>
        </form>
        {status === "updated" && (
          <Alert severity="success">State updated!</Alert>
        )}
        {message != "" && showAlert ? (
          <Alert severity="error">{message}</Alert>
        ) : (
          <div />
        )}
      </Paper>
    </div>
  );
};
export default Form;
