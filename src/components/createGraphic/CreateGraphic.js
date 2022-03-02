import { useState, useEffect } from "react";
import Graphic from "../graphic/Graphic";
import './CreateGraphic.css';

export default function CreateGraphic(props) {
  const [positions, setPositions] = useState();

  const [minTop, minLeft, maxTop, maxLeft] = [300, 40, 0, 1500];

  const verifyRange = () => {
    let leftValues = [];
    let topValues = [];
    
    props.dataValues.forEach((element) => {
      element.values.forEach((item) => {
        leftValues.push(item[0]);
        topValues.push(item[1]);
      });
    });
    const highValues = [
      Math.max.apply(null, leftValues),
      Math.max.apply(null, topValues),
    ];
    const lowValues = [
      Math.min.apply(null, leftValues),
      Math.min.apply(null, topValues),
    ];
    const diferenceHighLow = [
      highValues[0] - lowValues[0],
      highValues[1] - lowValues[1],
    ];
    return diferenceHighLow;
  };
  const calculatePositions = () => {
    const diferenceHighLow = verifyRange();
    const finalPositions = [];
    props.dataValues.forEach((element) => {
        const resultPositions = [];
        element.values.map((item) => {
            resultPositions.push([
                parseInt(((item[0]*100/diferenceHighLow[0]/2)*maxLeft/100)+minLeft/2),
                parseInt(((100-(item[1]*100/diferenceHighLow[1]))*minTop)/100)
            ]
            );
            
        });
        finalPositions.push(
            {
                name:element.name,
                color:element.color,
                positions:resultPositions,
                values:element.values
            }
        )
        
      });
     
    return finalPositions;
  };
  useEffect(() => {
    
    console.log(props.dataValues);
    setPositions(calculatePositions());
  }, []);
  return (
    <div className="graphic_box">
      {positions ? (
        <Graphic
          positions={positions}
          minTop={minTop}
          maxTop={maxTop}
          minLeft={minLeft}
          maxLeft={maxLeft}
        ></Graphic>
      ) : (
        ""
      )}
    </div>
  );
}
