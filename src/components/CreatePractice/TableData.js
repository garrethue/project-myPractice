import React from "react";

export default function TableData() {
  return (
    <div>
      <Select
        value={pose1}
        onChange={(e) => setPose1(e.target.value)}
        placeholder="Pose"
      >
        {props.store.poses.map((poseObj) => (
          <option value={poseObj.pose_name}>{poseObj.pose_name}</option>
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
      <Button>Delete</Button>
    </div>
  );
}
