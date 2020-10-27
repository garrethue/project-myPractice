import React, { useEffect } from "react";
import { Box, Grid, Text, Image, Button } from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

function AllPractices(props) {
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

  console.log(props.store.practices);

  //justifyContent is what makes the outer Grid in the center of the page
  return (
    <Grid justifyContent="center">
      <Box w="100%" bg="blue.500">
        <Text bg="red" textAlign="center" fontWeight="bold" fontSize="50px">
          All Practices:
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
              <Box
                textAlign="center"
                bg="green"
                padding={1}
                w="100%"
                h="100%"
                fontSize="1.5em"
                onClick={() => goToDetailsPage(practiceObj.practice_id)}
              >
                <Image
                  rounded="full"
                  size="150px"
                  src="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                />
                <br />
                {practiceObj.practice_name}
              </Box>
            );
          })}
        </Grid>
      </Box>
      <Box textAlign="right">
        <Button onClick={goToCreatePage}>Add Practice</Button>
      </Box>
    </Grid>
  );
}

export default connect(mapStoreToProps)(withRouter(AllPractices));
