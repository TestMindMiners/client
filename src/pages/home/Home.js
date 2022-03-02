import { useState, useEffect } from "react";
import { Api } from "../../api/Api";
import CreateGraphic from "../../components/createGraphic/CreateGraphic";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import "./Home.css";

export default function Home() {
  const [dataValues, setDataValues] = useState();

  const [minTop, minLeft, maxTop, maxLeft] = [300, 40, 0, 1500];

  const getOperations = async () => {
    const response = await Api.GetRequest(Api.selectOperationUrl());
    const operationsList = await response.json();
    return operationsList;
  };
  const getShare = async () => {
    const response = await Api.GetRequest(Api.selectShareUrl());
    const shareList = await response.json();
    return shareList;
  };
  const getOperationByShare = async (share) => {
    const graphicValues = [];
    const operationsResponse = await Api.GetRequest(
      Api.selectOperationByShareUrl(share.id)
    );
    const operationsResult = await operationsResponse.json();
    operationsResult.forEach((operation) => {
      let positionTemp = [
        operation.irValue,
        new Date(operation.operationDate).getMonth() + 1,
      ];
      graphicValues.push(positionTemp);
    });
    return graphicValues;
  };
  const getOperationsForGraphic = (share) => {
    const graphicData = [];
    share.forEach(async (item) => {
      const operationBySharePositions = await getOperationByShare(item);
      graphicData.push({
        name: item.name,
        color: "#ffffff",
        values: operationBySharePositions,
        positions: operationBySharePositions
      });
    });
    return graphicData;
  };

  const cancelRegister = (event)=>{
    event.preventDefault();
    getAll();
  }
  const openRegisterShare = (event) => {
    event.preventDefault();
    setDataValues({
      ...dataValues,
      view: {
        view: true,
        operation: false,
      }
    })
  };
  const finishRegister = (showMessage) => {
    getAll(showMessage);
  };
  const openRegisterOperation = (event) => {
    event.preventDefault();
    setDataValues({
      ...dataValues,
      view: {
        view: true,
        operation: true,
      }
    })
  };

  const getAll = async (showMessage) => {
    let message = null;
    let operations = await getOperations();
    let share = await getShare();
    let positions = await getOperationsForGraphic(share);
    if(message){
      message = showMessage;
    }
    const tempDataValues = {
      ...dataValues,
      operations: operations,
      share: share,
      positions: positions,
      view: {
        view: false,
        operation: false,
      },
      message:message
    };
    console.log(tempDataValues.positions)
    setDataValues(tempDataValues);
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      {dataValues ? (
        <section className="page">
          <CreateGraphic dataValues={dataValues.positions} minTop={minTop} maxTop={maxTop} minLeft={minLeft} maxLeft={maxLeft} />

          <Table operations={dataValues.operations} />

          <Modal
            view={dataValues.view.view}
            operation={dataValues.view.operation}
            cancel={cancelRegister}
            action={finishRegister}
            share={dataValues.share}
          />
          <div className="button_group">
            <Button
              buttonText={"Nova Ação"}
              buttonName={"normal_button"}
              click={openRegisterShare}
            />
            <Button
              buttonText={"Nova Operação"}
              buttonName={"normal_button"}
              click={openRegisterOperation}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
}
