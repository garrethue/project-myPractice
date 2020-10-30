import React, { useState } from "react";
import { connect } from "react-redux";
import { Grid, Box, Button, Text, Input, useColorMode } from "@chakra-ui/core";

import mapStoreToProps from "../../redux/mapStoreToProps";

//class RegisterForm extends Component {
const RegisterForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  const registerUser = (event) => {
    event.preventDefault();
    props.dispatch({
      type: "REGISTER",
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Grid justifyContent="center">
      <Box textAlign="center" rounded={3} h="100%" w="100%">
        <form className="formPanel" onSubmit={registerUser}>
          <Text
            marginTop={5}
            marginBottom={5}
            bg="black"
            paddingLeft={2}
            paddingRight={2}
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="50px"
          >
            Start Your Practice Here
          </Text>
          {props.store.errors.registrationMessage && (
            <h3 className="alert" role="alert">
              {props.store.errors.registrationMessage}
            </h3>
          )}
          <Grid marginBottom={5} justifyContent="center">
            <label htmlFor="username">
              <Input
                marginBottom={2}
                placeholder="Username"
                type="text"
                name="username"
                value={username}
                isRequired
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              <Input
                w="100%"
                placeholder="Password"
                type="password"
                name="password"
                value={password}
                isRequired
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <Button
              marginTop={5}
              bg="black"
              color={color[colorMode]}
              variantColor="teal"
              type="submit"
              name="submit"
              value="Register"
            >
              Create
            </Button>
          </Grid>
        </form>
      </Box>
    </Grid>
  );
};

export default connect(mapStoreToProps)(RegisterForm);

/* <Grid justifyContent="center">
      <Box textAlign="center" rounded={3} h="100%" w="100%">
        <form onSubmit={login}>
          <Text
            marginTop={5}
            marginBottom={5}
            bg="black"
            paddingLeft={2}
            paddingRight={2}
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="50px"
          >
            Login to Your Practice
          </Text>
          {props.store.errors.loginMessage && (
            <h3 className="alert" role="alert">
              {props.store.errors.loginMessage}
            </h3>
          )}
          <Grid marginBottom={5} justifyContent="center">
            <Box>
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
            </Box>

            
          </Grid>
          <Button
            bg="black"
            color={color[colorMode]}
            variantColor="teal"
            type="submit"
            name="submit"
            value="Log In"
          >
            Login
          </Button>
        </form>
      </Box>
    </Grid> */
