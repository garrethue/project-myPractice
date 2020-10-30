import React, { useState } from "react";
import { Box, Flex, Text, Button, useColorMode } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import AppTitle from "../AppTitle/AppTitle";
import ColorModeButton from "../Helpers/Buttons/ColorModeButton";
import LogOutButton from "../Helpers/Buttons/LogOutButton";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

const Navigation = (props) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = { light: "yellow.600", dark: "brand.900" };

  //from nav
  let loginLinkData = {
    path: "/login",
    text: "Login | Register",
  };

  if (props.store.user.id != null) {
    loginLinkData.path = "/all-practices"; ///user";
    loginLinkData.text = "My Practices";
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="black"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link to="/all-practices">
          <AppTitle />
        </Link>
      </Flex>

      <Box display={{ sm: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        <Button
          marginLeft={2}
          border="2px"
          variantColor="yellow"
          color="yellow"
          borderColor={borderColor[colorMode]}
          borderTop="transparent"
          borderBottom="transparent"
          bg="transparent"
        >
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          <Link to={loginLinkData.path}>{loginLinkData.text}</Link>
        </Button>
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {/* <Button bg="transparent" border="1px">
               <Link to="/all-practices">Your Practices</Link>
            </Button> */}
            <LogOutButton />
          </>
        )}
        <ColorModeButton />
      </Box>
    </Flex>
  );
};

export default connect(mapStoreToProps)(Navigation);
