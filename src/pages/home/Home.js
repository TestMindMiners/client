import { useState, useEffect } from "react";
import Graphic from "../../components/graphic/Graphic";
import Modal from "../../components/modal/Modal";
import Table from "../../components/table/Table";
import Button from "../../components/button/Button";
import "./Home.css";

export default function Home() {
  const [view, setView] = useState({
    view: false,
    operation: false,
  });
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
  useEffect(() => {}, []);
  return (
    <section className="page">
      <Graphic />
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
