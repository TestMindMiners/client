import { useEffect } from "react";
import Select from "../select/Select";
import "./Graphic.css";

export default function Graphic(props) {
  const selectOptions = [
    {
      name: "Por Ano",
      value: "year",
    },
    {
      name: "Por Mês",
      value: "month",
    },
  ];
  const drawnArrows = (drawnArea) => {
    const arrowValues = [
      [
        props.minLeft,
        props.minTop,
        props.maxLeft,
        props.minTop,
        "year",
        props.maxLeft - 60,
        295,
      ],
      [props.minLeft, props.maxTop, props.minLeft, props.minTop, "IR", 0, 20],
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
  const drawnLines = (drawnArea) => {
    props.positions.forEach((item) => {
      const haf = [];
      const text = [];
      drawnArea.beginPath();
      drawnArea.strokeStyle = item.color;
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
        drawnArea.fillStyle = "#ffffff";
      });
    });
  };
  useEffect(() => {
    console.log(props.positions)
    const drawnArea = document.getElementById("graphic").getContext("2d");
    drawnArea.translate(0, 20);
    drawnArea.fillStyle = "#ffffff";
    drawnArrows(drawnArea);
    drawnLines(drawnArea);
  }, []);
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
          {props.positions.map((item,index) => (
            <label key={index}>
              {" "}
              {item.name}
              <div
                className="color_box"
                style={{ "background": item.color }}
              ></div>
            </label>
          ))}
        </fieldset>
        <Select options={selectOptions} name={"Selecione o tipo de dado"}></Select>
      </div>
    </div>
  );
}
