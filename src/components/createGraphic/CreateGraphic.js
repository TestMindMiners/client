import { useState, useEffect } from "react";
import { Api } from "../../api/Api";
import Graphic from "../graphic/Graphic";
import "./CreateGraphic.css";

export default function CreateGraphic(props) {
  const [graphicData, setGraphicData] = useState();

  const getOperationByShare = () => {
    const graphicDataTemp = [];
    if (props.share) {
      props.share.forEach(async (item) => {
        await Api.GetRequest(
          Api.selectOperationByShareUrl(item.id, props.year)
        ).then(async (response) => {
          const operationShareResponse = await response.json();

          if (operationShareResponse.lenght !== 0) {
            const dateValues = [];
            const irValues = [];

            operationShareResponse.forEach((operation) => {
              dateValues.push(new Date(operation.operationDate).getMonth() + 1);
              irValues.push(operation.irValue);
            });

            graphicDataTemp.push({
              name: item.name,
              operationsValues: {
                irValues: irValues,
                dateValues: dateValues,
              },
            });

            setGraphicData({
              ...graphicData,
              data: graphicDataTemp,
            });
          }
        });
      });
    }
  };

  useEffect(() => {
    getOperationByShare();
  }, [props.year, props.view]);

  return (
    <>
      <div className="graphic_box">
        <Graphic graphicData={graphicData} year={props.year}></Graphic>
      </div>
    </>
  );
}
