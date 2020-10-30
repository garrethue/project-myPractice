import React, { useState, Fragment } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Grid, Button, useColorMode } from "@chakra-ui/core";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

const RegisterPage = (props) => {
  // state = {
  //   username: '',
  //   password: '',
  // };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  return (
    <Fragment>
      <RegisterForm />

      <Grid justifyContent="center">
        <Button
          type="button"
          bg="black"
          color={color[colorMode]}
          variantColor="teal"
          onClick={() => {
            props.history.push("/login");
          }}
        >
          Back to Login
        </Button>
      </Grid>
    </Fragment>
  );
};

export default connect(mapStoreToProps)(RegisterPage);
