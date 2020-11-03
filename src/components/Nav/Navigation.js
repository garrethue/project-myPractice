import React, { useState } from "react";
import { Box, Flex, Button, useColorMode } from "@chakra-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import mapStoreToProps from "../../redux/mapStoreToProps";
import AppTitle from "../AppTitle/AppTitle";
import ColorModeButton from "../Helpers/Buttons/ColorModeButton";
import LogOutButton from "../Helpers/Buttons/LogOutButton";

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
    loginLinkData.path = "/all-practices";
    loginLinkData.text = "Practices";
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
          opacity={0.9}
          border="1px"
          variantColor="yellow"
          color="yellow"
          borderColor={borderColor[colorMode]}
          borderTop="transparent"
          borderBottom="transparent"
          bg="transparent"
        >
          <Link to={loginLinkData.path}>{loginLinkData.text}</Link>
        </Button>
        {props.store.user.id && (
          <>
            <LogOutButton />
          </>
        )}
        <ColorModeButton />
      </Box>
    </Flex>
  );
};

export default connect(mapStoreToProps)(Navigation);
