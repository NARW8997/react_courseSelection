import React, { useEffect, useState } from "react";

import CourseItem from "./CourseItem";

export default function Completed(props) {
  return (
    <div className="wrap">
      {props.data.map((it, index) => (
        <CourseItem data={it} key={index} addRecommended={props.addRecommended}></CourseItem>
      ))}
    </div>
  );
}
