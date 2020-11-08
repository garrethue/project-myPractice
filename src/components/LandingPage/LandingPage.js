import React from "react";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Grid, Box, Button, useColorMode, Text } from "@chakra-ui/core";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterForm/RegisterForm";

const LandingPage = (props) => {
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };
  const onLogin = (event) => {
    props.history.push("/login");
  };

  return (
    <Grid
      bg="transparent"
      justifyContent="center"
      templateColumns="1fr 1fr"
      gap={1}
      bg="transparent"
    >
      <Box
        marginTop={5}
        alignContent="center"
        alignItems="center"
        textAlign="center"
        bg="transparent"
      >
        <Text
          marginLeft={5}
          marginBottom={5}
          bg="black"
          textAlign="center"
          color="white"
          fontSize="50px"
        >
          Welcome to your practice.
        </Text>
        <Box margin="auto" maxW="50%" bg="black">
          <Text fontSize="40px" color="white">
            Future you says thanks.
          </Text>
        </Box>
      </Box>
      <Box textAlign="center">
        <RegisterForm />
        <Text marginBottom={2} fontWeight="bold">
          Already a Member?
        </Text>
        <Button
          bg="black"
          color={color[colorMode]}
          variantColor="teal"
          className="btn btn_sizeSm"
          onClick={onLogin}
        >
          Login
        </Button>
      </Box>
    </Grid>
  );
};

export default connect(mapStoreToProps)(LandingPage);
