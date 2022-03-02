import { useState, useEffect } from "react";
import { Api } from "../../api/Api";
import CreateGraphic from "../../components/createGraphic/CreateGraphic";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import "./Home.css";
import MessageBox from "../../components/messageBox/MessageBox";

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

  const verifyRange = (operations) => {
    let leftValues = [];
    let topValues = [];

    operations.forEach((element) => {
      leftValues.push(element[0]);
      topValues.push(element[1]);
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
  const calculatePositions = (operations) => {
    const diferenceHighLow = verifyRange(operations);
    const resultPositions = [];
    operations.forEach((element) => {
      resultPositions.push([
        parseInt(
          (((element[0] * 100) / diferenceHighLow[0] / 2) * maxLeft) / 100 +
            minLeft / 2
        ),
        parseInt(
          ((100 - (element[1] * 100) / diferenceHighLow[1]) * minTop) / 100
        ),
      ]);
    });
    return resultPositions;
  };

  const getOperationsForGraphic = (share) => {
    const graphicData = [];
    share.forEach(async (item) => {
      const operationBySharePositions = await getOperationByShare(item);
      let tempPositions = calculatePositions(operationBySharePositions);
      graphicData.push({
        name: item.name,
        color: "#ffffff",
        values: operationBySharePositions,
        positions: tempPositions,
      });
    });
    return graphicData;
  };

  const cancelRegister = (event) => {
    event.preventDefault();
    getAll();
  };
  const openRegisterShare = (event) => {
    event.preventDefault();
    setDataValues({
      ...dataValues,
      view: {
        view: true,
        operation: false,
      },
    });
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
      },
    });
  };

  const closeMessage = (event) => {
    event.preventDefault();
    setDataValues({
      ...dataValues,
      message: null,
    });
  };

  const getAll = async (showMessage) => {
    let messageValue = null;
    let operations = await getOperations();
    let share = await getShare();
    let positions = await getOperationsForGraphic(share);
    if (showMessage) {
      messageValue = showMessage;
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
      message: messageValue,
    };
    setDataValues(tempDataValues);
  };
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      {dataValues ? (
        <section className="page">
          <CreateGraphic
            dataValues={dataValues.positions}
            minTop={minTop}
            maxTop={maxTop}
            minLeft={minLeft}
            maxLeft={maxLeft}
          />

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
          {dataValues.message !== null ? (
            <MessageBox action={closeMessage} message={dataValues.message} />
          ) : (
            ""
          )}
        </section>
      ) : (
        ""
      )}
    </>
  );
}
