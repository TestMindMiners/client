import { useEffect } from "react";
import "./Graphic.css";

export default function Graphic(props) {
  const [minTop, minLeft, maxTop, maxLeft] = [300, 40, 0, 1500];

  const verifyRange = (operationsByShare) => {
    let operationsMaxTime = 0;
    let operationsMaxIr = 0;

    operationsByShare.forEach((shareData) => {
      if (shareData.operationsValues !== undefined) {
        let max = Math.max.apply(null, shareData.operationsValues.dateValues);
        if (max > operationsMaxTime) {
          operationsMaxTime = max;
        }

        max = Math.max.apply(null, shareData.operationsValues.irValues);
        if (max > operationsMaxIr) {
          operationsMaxIr = max;
        }
      }
    });
    return [operationsMaxTime, operationsMaxIr];
  };

  const calculatePositions = () => {
    const shares = props.graphicData.data;
    const range = verifyRange(shares);
    const resultPositions = [];
    shares.forEach((share, index) => {
      const positionsTemp = {
        name: share.name,
        positions: [],
        values: [],
      };
      let percentage = 0;
      if (share.operationsValues !== undefined) {
        share.operationsValues.dateValues.forEach((date) => {
          percentage =
            (((100 * date) / 12) * (maxLeft - minLeft)) / 100 - minLeft;
          positionsTemp.positions.push([percentage]);
          positionsTemp.values.push([date]);
        });
        share.operationsValues.irValues.forEach((irValue, index) => {
          percentage =
            minTop -
            ((((100 * irValue) / range[1]) * (minTop - maxTop)) / 100 + maxTop);

          positionsTemp.positions[index].push(percentage);
          positionsTemp.values[index].push(irValue);
        });
        resultPositions.push(positionsTemp);
      }
    });
    return resultPositions;
  };

  const drawnArrows = (drawnArea) => {
    const arrowValues = [
      [minLeft, minTop, maxLeft, minTop, "Month", maxLeft - 60, 295],
      [minLeft, maxTop, minLeft, minTop, "IR", 0, 20],
    ];
    arrowValues.forEach((arrowValue) => {
      drawnArea.strokeStyle = "#ffffff";
      drawnArea.moveTo(arrowValue[0], arrowValue[1]);
      drawnArea.lineTo(arrowValue[2], arrowValue[3]);
      drawnArea.font = " 20px Arial";
      drawnArea.stroke();
      drawnArea.fillText(arrowValue[4], arrowValue[5], arrowValue[6]);
      drawnArea.fillStyle = "#ffffff";
    });
  };

  const drawnLines = (drawnArea, shares) => {
    shares.forEach((item) => {
      let lineColor = "#"+Math.floor(Math.random()*16777215).toString(16);
      const haf = [];
      const text = [];
      drawnArea.beginPath();
      drawnArea.strokeStyle = lineColor;
      if (item.positions.length !== 0) {
        drawnArea.moveTo(item.positions[0][0], item.positions[0][1]);
        text.push({
          value: item.values[0][0],
          time: item.values[0][1],
          x: item.positions[0][0],
          y: item.positions[0][1] + 25,
        });
        item.positions.forEach((position, index) => {
          drawnArea.lineTo(position[0], position[1]);
          text.push({
            value: item.values[index][0],
            time: item.values[index][1],
            x: position[0],
            y: position[1] + 25,
          });
          if (index === item.positions.length / 2) {
            haf.push(position[0]);
            haf.push(position[1]);
          }
        });
        drawnArea.stroke();
        text.forEach((text) => {
          drawnArea.fillText(text.value, text.x, 320);
          drawnArea.fillText(text.time, text.x, text.y - 30);
          drawnArea.fillStyle = lineColor; 
        });
      }
    });
    drawnArea.beginPath();
  };

  useEffect(() => {
    const canvas = document.getElementById("graphic");
    const drawnArea = canvas.getContext("2d");
    canvas.width =canvas.width;
    drawnArea.translate(0, 20);
    drawnArrows(drawnArea);
    drawnLines(drawnArea, calculatePositions());
  });
  return (
    <div className="graphic_area">
      
      <canvas
        id="graphic"
        className="graphic"
        width={1500}
        height={350}
      ></canvas>
      <div className="container_controller">
        <fieldset className="legend">
          <legend>legenda</legend>
          {props.graphicData.data.map((item, index) => (
            <label key={index}>
              {item.name}
              <div
                className="color_box"
                style={{ background: item.color }}
              ></div>
            </label>
          ))}
        </fieldset>
      </div>
    </div>
  );
}
