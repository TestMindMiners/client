import { useEffect } from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import "./Graphic.css";

export default function Graphic() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 400, pv: 2400, amt: 2400 },
  ];
  useEffect(() => {
    const elements = [
      document.getElementById("graphicElement"),
      document.querySelector(".recharts-cartesian-grid-horizontal"),
      document.getElementById("graphicElement-clip"),
      document.getElementById("graphicElement-clip").parentElement,
    ];
    elements.forEach((element) => {
      element.setAttribute("width", "100%");
      element.setAttribute("height", "100%");
    });
    const computedStyle = window.getComputedStyle(
      document.getElementById("graphicElement")
    );
    elements[0].setAttribute(
      "viewBox",
      `0 0 ${computedStyle.width.replace(
        "px",
        ""
      )} ${computedStyle.height.replace("px", "")}`
    );
    for (let count = 0; elements[1].children.length > count; count++) {
      elements[1].children[count].setAttribute("width", "100%");
      elements[1].children[count].setAttribute("height", "100%");
    }
    document
      .getElementById("graphicElement-clip")
      .children[0].setAttribute("width", "90%");
    document
      .getElementById("graphicElement-clip")
      .children[0].setAttribute("height", "100%");
  }, []);
  return (
    <div className="graphic">
      <LineChart
        width={1150}
        height={250}
        data={data}
        style={{ width: "100%", height: "100%" }}
        id="graphicElement"
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
}
