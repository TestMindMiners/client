import { useState, useEffect } from "react";
import { Api } from "../../api/Api";
import CreateGraphic from "../../components/createGraphic/CreateGraphic";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import "./Home.css";

export default function Home() {
  const [view, setView] = useState({
    view: false,
    operation: false,
  });
  const [dataValues,setDataValues] = useState();
  const values = [
    {
      name: "value1",
      color: "#ff0000",
      values: [
        [20, 1000],
        [200, 0],
        [280, 2000],
        [300, 25],
        [500, 100],
        [700, 350],
      ],
    }
  ];
  const registerShare = (event) => {
    event.preventDefault();
    setView({
      ...view,
      view: true,
      operation: false,
    });
  };
  const registerOperation = (event) => {
    event.preventDefault();
    setView({
      ...view,
      view: true,
      operation: true,
    });
  };
  const cancelAction = (event) => {
    event.preventDefault();
    setView({
      ...view,
      view: false,
      operation: false,
    });
  };
  const getOperationsForGraphic = async ()=>{
    const graphicData = [];
    const sharesResponse = await Api.GetRequest(Api.selectShareUrl());
    const sharesResult = await sharesResponse.json();
    sharesResult.forEach(async(share,index)=>{
      graphicData.push(
        {
          name:share.name,
          color:"#ffffff",
          values:[]
        }
      );
      const operationsResponse = await Api.GetRequest(Api.selectOperationByShareUrl(share.id));
      const operationsResult = await operationsResponse.json();
        operationsResult.forEach((operation)=>{
          graphicData[index].values.push([
            parseInt(operation.irValue),parseInt((new Date(operation.operationDate)).getMonth()+1)
          ]);
        })
    });
    console.log(graphicData);
    console.log(values)
    setDataValues(graphicData);
  };
  useEffect(() => {
    getOperationsForGraphic();
  }, []);
  return (
    <section className="page">
      {dataValues?
      <CreateGraphic dataValues={values} />
      :""}
      <Table />
      <Modal
        view={view.view}
        operation={view.operation}
        cancel={cancelAction}
      />
      <div className="button_group">
        <Button
          buttonText={"Nova Ação"}
          buttonName={"normal_button"}
          click={registerShare}
        />
        <Button
          buttonText={"Nova Operação"}
          buttonName={"normal_button"}
          click={registerOperation}
        />
      </div>
    </section>
  );
}
