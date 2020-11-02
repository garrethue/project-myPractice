import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Text,
  IconButton,
  useColorMode,
} from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

function AllPractices(props) {
  const [colorArr] = useState(["green", "yellow", "red"]);
  const { colorMode } = useColorMode();
  const color = { light: "white", dark: "white" };

  const goToDetailsPage = (id) => {
    props.dispatch({ type: "FETCH_PRACTICE_DETAILS", payload: id });
    props.history.push("/details");
  };

  const goToCreatePage = () => {
    props.history.push("/create");
  };

  useEffect(() => {
    //useEffect makes a fetch request to a restful api every time the component is rendered
    props.dispatch({ type: "FETCH_PRACTICES" });
    props.dispatch({ type: "FETCH_POSES" });
  }, []);

  //justifyContent is what makes the outer Grid in the center of the page
  return (
    <Grid justifyContent="center">
      <Box alignItems="center" marginTop={5} w="100%" bg="black">
        <Text
          margin="auto"
          textAlign="center"
          color="white"
          fontWeight="bold"
          fontSize="50px"
          w="35rem"
        >
          Your Practices
        </Text>
      </Box>
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
              <Button
                as="button"
                rounded="md"
                textAlign="center"
                bg="black"
                padding={5}
                w="13rem"
                h="13rem"
                variantColor={colorArr[practiceObj.practice_id % 3]}
                fontSize="1.5em"
                onClick={() => goToDetailsPage(practiceObj.practice_id)}
              >
                <Text as="u" isTruncated fontWeight="bold" color="white">
                  {practiceObj.practice_name}
                </Text>
              </Button>
            );
          })}
        </Grid>
      </Box>
      <Box textAlign="center">
        <IconButton
          isRound
          aria-label="Search database"
          icon="add"
          bg="black"
          size="lg"
          color={color[colorMode]}
          variantColor="teal"
          onClick={goToCreatePage}
        >
          Add a Practice
        </IconButton>
      </Box>
    </Grid>
  );
}

export default connect(mapStoreToProps)(withRouter(AllPractices));
