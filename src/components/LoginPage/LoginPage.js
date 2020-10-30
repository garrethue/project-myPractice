import React, { Component } from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import LoginForm from "../LoginForm/LoginForm";
import { Grid, Box, Button, useColorMode, Text } from "@chakra-ui/core";

const LoginPage = (props) => {
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  return (
    <div>
      <LoginForm />
      <Grid justifyContent="center">
        <Box marginTop={5}>
          <Text fontWeight="bold">Don't have any account?</Text>
        </Box>
        <Button
          marginTop={2}
          //type="button"
          bg="black"
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
