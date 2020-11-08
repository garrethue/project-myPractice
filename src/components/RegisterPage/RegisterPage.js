import React, { Fragment } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Grid, Button, useColorMode } from "@chakra-ui/core";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

const RegisterPage = (props) => {
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const bgColor = { light: "header", dark: "black" };

  return (
    <Fragment>
      <RegisterForm />
      <Grid justifyContent="center">
        <Button
          type="button"
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          variantColor="red"
          onClick={() => {
            props.history.push("/login");
          }}
        >
          Cancel
        </Button>
      </Grid>
    </Fragment>
  );
};

export default connect(mapStoreToProps)(RegisterPage);
