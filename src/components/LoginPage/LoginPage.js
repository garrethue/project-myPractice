import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import LoginForm from "../LoginForm/LoginForm";
import { Grid, Box, Button, useColorMode, Text } from "@chakra-ui/core";

const LoginPage = (props) => {
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const bgColor = { light: "header", dark: "black" };

  return (
    <div>
      <LoginForm />
      <Grid justifyContent="center">
        <Text fontWeight="bold" marginTop={5}>
          Don't have an account?
        </Text>
        <Button
          marginTop={2}
          bg={bgColor[colorMode]}
          color={color[colorMode]}
          variantColor="teal"
          onClick={() => {
            props.history.push("/registration");
          }}
        >
          Register
        </Button>
      </Grid>
    </div>
  );
};

export default connect(mapStoreToProps)(LoginPage);
