import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Text,
  IconButton,
  useColorMode,
  Skeleton,
  Image,
  Badge,
} from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

function AllPractices(props) {
  const [welcomePrompts, setWelcomePrompt] = useState([
    `Hiya, ${props.store.user.first_name}!`,
  ]);
  const [colorArr] = useState(["brand.900", "brand.800", "brand.500"]);
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  const goToDetailsPage = (id) => {
    props.dispatch({ type: "LOADING" });
    props.dispatch({ type: "FETCH_PRACTICE_DETAILS", payload: id });
    props.history.push("/details");
  };

  const goToCreatePage = () => {
    props.history.push("/create");
  };

  useEffect(() => {
    //useEffect makes a fetch request to a restful api every time the component is rendered
    props.dispatch({ type: "LOADING" }); //skeleton component is active here
    props.dispatch({ type: "FETCH_POSES" });
    props.dispatch({ type: "FETCH_PRACTICES" });
  }, []);

  console.log(props.store);

  return (
    <Grid justifyContent="center">
      <Skeleton isLoaded={!props.store.isLoading}>
        <Box rounded={3} alignItems="center" marginTop={5} w="100%" bg="black">
          <Text
            margin="auto"
            textAlign="center"
            color="white"
            fontSize="4.5rem"
            w="35rem"
          >
            {welcomePrompts}
          </Text>
        </Box>
      </Skeleton>
      <Box rounded={3} h="100%" w="100%" bg="yellow">
        <Grid
          bg="transparent"
          margin={5}
          justifyContent="center"
          alignItems="center"
          templateColumns="repeat(3, 1fr)"
          gap={4}
        >
          {props.store.practices.map((practiceObj) => {
            return (
              <Skeleton isLoaded={!props.store.isLoading}>
                <Box
                  as="button"
                  rounded="20px"
                  w="275px"
                  overflow="hidden"
                  boxShadow="md"
                  onClick={() => goToDetailsPage(practiceObj.practice_id)}
                >
                  <Image
                    src="./screenshots/scorpion.jpeg"
                    alt="Example Cover"
                  />
                  <Box p={5}>{practiceObj.practice_name}</Box>
                </Box>
              </Skeleton>
            );
          })}
        </Grid>
      </Box>
      <Box textAlign="center">
        <IconButton
          isDisabled={props.store.isLoading}
          isRound
          aria-label="Add a Practice"
          icon="add"
          bg="black"
          size="lg"
          color={color[colorMode]}
          _hover={{ color: "black", bg: "white" }}
          onClick={goToCreatePage}
        />
      </Box>
    </Grid>
  );
}

export default connect(mapStoreToProps)(withRouter(AllPractices));
