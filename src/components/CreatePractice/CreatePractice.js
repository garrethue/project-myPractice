import React, { useState } from "react";
import { Grid, Box, Select, Button, Text } from "@chakra-ui/core";

export default function CreatePractice() {
  const [availableTimes, setAvailableTimes] = useState([30, 60, 120]);
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
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            <Select placeholder="Pose">
              <option value="option1">Pose 1</option>
              <option value="option2">Pose 2</option>
              <option value="option3">Pose 3</option>
            </Select>

            <Select placeholder="Time">
              <option value="option1">Time 1</option>
              <option value="option2">Time 2</option>
              <option value="option3">Time 3</option>
            </Select>

            <Button>Delete</Button>

            <Button>Create</Button>
            <Button>Add Row</Button>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}
