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

  const getShare = async () => {
    const response = await Api.GetRequest(Api.selectShareUrl());
    const shareList = await response.json();
    return shareList;
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
    let share = await getShare();
    if (showMessage) {
      messageValue = showMessage;
    }
    const tempDataValues = {
      ...dataValues,
      share: share,
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
          <CreateGraphic share={dataValues.share} />

          <Table view={dataValues.view.view}/>

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
