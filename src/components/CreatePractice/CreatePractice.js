import React, { useState, useEffect } from "react";
import { Grid, Box, Select, Button, Text } from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";

function CreatePractice(props) {
  const [availableSlots] = useState(10); //while slots does NOT equal zero, add a slot
  const [availableTimes, setAvailableTimes] = useState([30, 60, 120]);

  useEffect(() => {
    //useEffect makes a fetch request to a restful api every time the component is rendered
    props.dispatch({ type: "FETCH_POSES" });
  }, []);

  return (
    <div>
      <Grid justifyContent="center">
        <Box textAlign="center" rounded={3} h="100%" w="100%" bg="yellow.500">
          <Text
            bg="black"
            textAlign="center"
            color="white"
            fontWeight="bold"
            fontSize="50px"
          >
            Create a Practice
          </Text>
          <Grid
            bg="transparent"
            margin={5}
            justifyContent="center"
            alignItems="center"
            templateColumns="repeat(2, 1fr)"
            gap={4}
          >
            <Button>Create</Button>
            <Button>Add Row</Button>
          </Grid>
          <Grid
            bg="transparent"
            margin={5}
            justifyContent="center"
            alignItems="center"
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            {/* Need to Implement dynamic adding of rows!!*/}
            {/* row 1!!*/}

            <Select placeholder="Pose">
              {props.store.poses.map((poseObj) => (
                <option value={poseObj.pose_name}>{poseObj.pose_name}</option>
              ))}
            </Select>

            <Select placeholder="Time">
              {availableTimes.map((time) => (
                <option value={time}>{time} seconds</option>
              ))}
            </Select>
            <Button>Delete</Button>
            {/* row 2!!*/}
            <Select placeholder="Pose">
              {props.store.poses.map((poseObj) => (
                <option value={poseObj.pose_name}>{poseObj.pose_name}</option>
              ))}
            </Select>

            <Select placeholder="Time">
              {availableTimes.map((time) => (
                <option value={time}>{time} seconds</option>
              ))}
            </Select>
            <Button>Delete</Button>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(CreatePractice));
