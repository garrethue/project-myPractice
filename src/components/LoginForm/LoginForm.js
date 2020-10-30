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
    </Grid>
  );
};

export default connect(mapStoreToProps)(LoginForm);

/* <div>
<BackButton />
<Grid justifyContent="center">
  <Box
    marginLeft={10}
    marginRight={10}
    textAlign="center"
    rounded={3}
    h="100%"
    w="100%"
  >
    <Text
      marginBottom={5}
      bg="black"
      paddingLeft={2}
      paddingRight={2}
      textAlign="center"
      color="white"
      fontWeight="bold"
      fontSize="50px"
    >
      Create a Practice
    </Text>
    <Text
      paddingRight={1}
      marginBottom={5}
      bg="black"
      textAlign="right"
      color="white"
      fontWeight="bold"
      fontSize="30px"
    >
      {availableRows < 10 &&
        `Total Time: ${TimeFormatter(GetTotalTime(poses, true))}`}
    </Text>
    {availableRows < 10 && (
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Input
            value={practiceName}
            onChange={(e) => setPracticeName(e.target.value)}
            type="text"
            placeholder="Your practice name here."
          />
          <Grid
            bg="transparent"
            marginTop={3}
            marginBottom={3}
            justifyContent="center"
            alignItems="center"
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            {createUI()}
            <Button type="submit">Create</Button>
          </Grid>
        </FormControl>
      </form>
    )}

    <Button bg="black" color="white" onClick={addItem}>
      Add a Row
    </Button>
  </Box>
</Grid>
</div> */
