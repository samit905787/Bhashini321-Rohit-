import {
  Grid,
  Typography,
  withStyles,
  Button,
  TextField,
  Link,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  FormHelperText,
  FormControl,
  CircularProgress,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";
import LoginStyles from "../../../styles/Login";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import config from "../../../../configs/config";
import apiEndPoint from "../../../../configs/apiendpoints";
import Snackbar from "../../../components/Snackbar";
import axios from "axios";

const Login = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    checked: false,
  });

  const [logindata, setLogindata] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const [snackbar, setSnackbarInfo] = useState({
    open: false,
    message: "",
    variant: "success",
  });

  useEffect(() => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("userDetails");
  }, []);

  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const handleChange = (prop) => (event) => {
    setError({ ...error, password: false, email: false });
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    const apiendpoint = `http://localhost:4500/login`;
    const { email, password } = values;
    const body = { username: email, password };
    axios.post(apiendpoint, { email: email, password:password })
      .then(async (res) => {
        console.log("test res",res);
        // const rsp_data = await res.json();
        console.log("test res",res);
        console.log("test res",res.data);
        if (res.statusText==="OK") {
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          localStorage.removeItem("acceptedTnC");
          history.push(`/datadaan/my-contribution/`);
        } else {
          return Promise.reject(res.data);
        }
      })
      .catch((err) => {
        setLoading(false);
        setSnackbarInfo({
          ...snackbar,
          open: true,
          message: err.message,
          variant: "error",
        });
      });
    };
    const handleSnackbarClose = () => {
      setSnackbarInfo({ ...snackbar, open: false });
    };

    const HandleSubmitCheck = () => {
      handleSubmit();
    };

    const { classes } = props;

    return (
      <>
        <Grid container className={classes.loginGrid}>
          <Typography variant="h4">Sign in</Typography>
          <form className={classes.root} autoComplete="off">
            <TextField
              className={classes.textField}
              required
              onChange={handleChange("email")}
              onKeyPress={(e) => e.key === "Enter" && HandleSubmitCheck()}
              id="outlined-required"
              value={values.email}
              error={error.email}
              label="Email address"
              helperText={error.email ? "Enter an email" : " "}
              variant="outlined"
            />
            <FormControl className={classes.fullWidth} variant="outlined">
              <InputLabel
                error={error.password}
                htmlFor="outlined-adornment-password"
              >
                Password *
              </InputLabel>

              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={values.password}
                required
                error={error.password}
                helperText={error.password ? "Enter a password" : ""}
                onChange={handleChange("password")}
                onKeyPress={(e) => e.key === "Enter" && HandleSubmitCheck()}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={100}
              />
              {error.password && (
                <FormHelperText error={true}>Incorrect password</FormHelperText>
              )}
            </FormControl>

            <Button
              color="primary"
              size="large"
              variant="contained"
              aria-label="edit"
              className={classes.fullWidth}
              onClick={() => {
                HandleSubmitCheck();
              }}
              disabled={loading}
            >
              {loading && (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              )}
              Sign In
            </Button>
          </form>
        </Grid>
        {snackbar.open && (
          <Snackbar
            open={snackbar.open}
            handleClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            message={snackbar.message}
            variant={snackbar.variant}
          />
        )}
      </>
    );
  
};

export default withStyles(LoginStyles)(Login);
