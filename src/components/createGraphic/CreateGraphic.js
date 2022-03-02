import { useState, useEffect } from "react";
import Graphic from "../graphic/Graphic";
import './CreateGraphic.css';

export default function CreateGraphic(props) {
  return (
    <div className="graphic_box">
      {props.dataValues?
        <Graphic
          positions={props.dataValues}
          minTop={props.minTop}
          maxTop={props.maxTop}
          minLeft={props.minLeft}
          maxLeft={props.maxLeft}
        ></Graphic>
        :""}
    </div>
  );
}
