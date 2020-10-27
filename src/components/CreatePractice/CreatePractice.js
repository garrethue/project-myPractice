import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Select,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import { Formik } from "formik";

function CreatePractice(props) {
  const [availableSlots] = useState(10); //while slots does NOT equal zero, add a slot
  const [availableTimes, setAvailableTimes] = useState([30, 60, 120]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

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
          <br />
          <Text
            marginRight={5}
            marginLeft={5}
            paddingRight={3}
            bg="black"
            textAlign="right"
            color="white"
            fontWeight="bold"
            fontSize="30px"
          >
            Total Time: x
          </Text>
          <FormControl>
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
              <Button type="submit">Create</Button>
            </Grid>
          </FormControl>
        </Box>
      </Grid>

      {/* Formik testing...*/}
      <Formik></Formik>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(CreatePractice));
