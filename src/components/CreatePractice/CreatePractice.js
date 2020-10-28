import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  Select,
  Button,
  Text,
  FormControl,
  Input,
} from "@chakra-ui/core";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import mapStoreToProps from "../../redux/mapStoreToProps";
import axios from "axios";

function CreatePractice(props) {
  const [availablePoses, setAvailablePoses] = useState(props.store.poses);
  const [availableRows] = useState(5); //while slots does NOT equal zero, add a slot
  const [rowsInGrid, setRowsInGrid] = useState();
  const [availableTimes, setAvailableTimes] = useState([30, 60, 120]);
  const [practiceName, setPracticeName] = useState("");
  const [pose1, setPose1] = useState("");
  const [time1, setTime1] = useState("");
  const [pose2, setPose2] = useState("");
  const [time2, setTime2] = useState("");

  const [poses, setPoses] = useState([]);
  //poses needs to be an arrray of objects with pose_name and time
  //wrap up each pose into an object? like im doing in the POST route?

  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post("/api/practices/add", {
    //     practice_name: practiceName,
    //     poses: [
    //       {
    //         pose_name: pose1,
    //         time: time1,
    //       },
    //       { pose_name: pose2, time: time2 },
    //     ],
    //   })
    //   .then(() => {
    //     props.dispatch({ type: "FETCH_PRACTICES" });
    //     //props.history.push("/create");
    //   })
    //   .catch((err) => console.log(err));
  };

  const handleChangePoseName = (i, value) => {
    let newPoses = [...poses]; //bring in the poses [...poses]
    newPoses[i].pose_name = value; //mutate whichever object in the array
    setPoses(newPoses); //reset the state with the newly mutated array
  };

  const handleChangePoseTime = (i, value) => {
    let newPoses = [...poses]; //bring in the poses [...poses]
    newPoses[i].time = value; //mutate whichever object in the array
    console.log(newPoses);
    setPoses(newPoses); //reset the state with the newly mutated array
  };

  const addClick = () => {
    // this.setState((prevState) => ({ values: [...prevState.values, ""] }));
    setPoses([...poses, { pose_name: "", time: 0 }]);
  };

  const removeClick = (i) => {
    let values = [...poses];
    values.splice(i, 1);
    this.setState({ values });
  };

  const createUI = () => {
    // when a user clicks the add row button, check if we have reach the maximum number of ROWS (ie, Check availableRows)
    //   if (availableRows >= 1) {
    //need to add a row to the grid somehow
    //can i put the props into its own state and append items to it?? def for the edit!
    //

    //NEED TO MAP STATE AND RETURN THIS!!
    //what needs to be a part of state
    //pose1,
    return poses.map((poseObj, index) => {
      return (
        <>
          <Select
            value={poseObj.pose_name || ""}
            onChange={(e) => handleChangePoseName(index, e.target.value)}
            placeholder="Pose"
          >
            {props.store.poses.map((poseObj) => (
              <option value={poseObj.pose_name}>{poseObj.pose_name}</option>
            ))}
          </Select>
          <Select
            value={poseObj.time || ""}
            onChange={(e) => handleChangePoseTime(index, e.target.value)}
            placeholder="Time"
          >
            {availableTimes.map((time) => (
              <option value={time}>{time} seconds</option>
            ))}
          </Select>
          <Button>Delete</Button>
        </>
      );
    });
    //     availableRows--;
    //   }
  };

  //   const createUI = () => {
  //     return this.state.values.map((el, i) =>
  //         <div key={i}>
  //            <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
  //            <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/>
  //         </div>
  //     )
  //  }

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
                margin={5}
                justifyContent="center"
                alignItems="center"
                templateColumns="repeat(3, 1fr)"
                gap={4}
              >
                {/* Need to Implement dynamic adding of rows!!*/}
                {/* row 1!!*/}

                {/* <Select
                  value={pose1}
                  onChange={(e) => setPose1(e.target.value)}
                  placeholder="Pose"
                >
                  {props.store.poses.map((poseObj) => (
                    <option value={poseObj.pose_name}>
                      {poseObj.pose_name}
                    </option>
                  ))}
                </Select>
                <Select
                  value={time1}
                  onChange={(e) => setTime1(e.target.value)}
                  placeholder="Time"
                >
                  {availableTimes.map((time) => (
                    <option value={time}>{time} seconds</option>
                  ))}
                </Select>
                <Button>Delete</Button> */}
                {createUI()}

                <Button type="submit">Create</Button>
              </Grid>
            </FormControl>
          </form>
          <Button onClick={addClick}>Add a Row</Button>
        </Box>
      </Grid>
    </div>
  );
}

export default connect(mapStoreToProps)(withRouter(CreatePractice));
