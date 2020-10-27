import React, { useEffect } from "react";
import { Box, Grid, Text, Image } from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

function AllPractices(props) {
  //ALL PRACTICES FOR A USER COMPONENT

  const handleViewChange = (id) => {
    props.dispatch({ type: "SET_CURRENT_MOVIE_ID", payload: id });
    props.history.push("/details");
  };

  useEffect(() => {
    //useEffect makes a fetch request to a restful api every time the component is rendered
    props.dispatch({ type: "FETCH_PRACTICES" });
  }, []);

  return (
    <div>
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
          <Box
            textAlign="center"
            bg="green"
            padding={1}
            w="100%"
            h="100%"
            fontSize="1.5em"
          >
            <Image
              rounded="full"
              size="150px"
              src="https://bit.ly/sage-adebayo"
              alt="Segun Adebayo"
            />
          </Box>
          <Box
            textAlign="center"
            bg="green"
            padding={1}
            w="100%"
            h="100%"
            fontSize="1.5em"
          >
            Practice2
          </Box>
          <Box
            textAlign="center"
            bg="green"
            padding={1}
            w="100%"
            h="100%"
            fontSize="1.5em"
          >
            Box3
          </Box>
          <Box
            textAlign="center"
            bg="green"
            padding={1}
            w="100%"
            h="100%"
            fontSize="1.5em"
          >
            Box4
          </Box>
        </Grid>
      </Box>
    </div>
  );
}

export default connect()(withRouter(AllPractices));
