import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Box, Button, Text, Input, useColorMode } from "@chakra-ui/core";
import mapStoreToProps from "../../redux/mapStoreToProps";

const LoginForm = (props) => {
  // state = {
  //   username: "",
  //   password: "",
  // };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      props.dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      props.dispatch({ type: "LOGIN_INPUT_ERROR" });
    }
  }; // end login

  // const handleInputChangeFor = (propertyName) => (event) => {
  //   setState({
  //     [propertyName]: event.target.value,
  //   });
  // };

  return (
    <Grid justifyContent="center">
      <Box textAlign="center" rounded={5} h="100%" w="100%">
        <form onSubmit={login}>
          <Text
            shadow="lg"
            boxShadow="lg"
            textShadow="lg"
            marginTop={5}
            marginBottom={5}
            rounded={3}
            bg="header"
            pl={4}
            pr={4}
            pt={1}
            pb={1}
            textAlign="center"
            color="white"
            fontSize="4rem"
          >
            Welcome to Your Practice.
          </Text>
          {props.store.errors.loginMessage && (
            <h3 className="alert" role="alert">
              {props.store.errors.loginMessage}
            </h3>
          )}
          <Grid justifyContent="center">
            <label htmlFor="username">
              <Input
                marginBottom={2}
                placeholder="Username"
                type="text"
                name="username"
                isRequired
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>

            <label htmlFor="password">
              <Input
                w="100%"
                placeholder="Password"
                type="password"
                name="password"
                isRequired
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Button
              marginTop={5}
              bg="black"
              color={color[colorMode]}
              variantColor="green"
              type="submit"
              name="submit"
              value="Log In"
            >
              Let Me In
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default connect(mapStoreToProps)(LoginForm);
