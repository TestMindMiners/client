import { useState, useEffect } from "react";
import { Api } from "../../api/Api";
import Button from "../button/Button";
import Input from "../input/Input";
import Form from "../form/Form";
import Select from "../select/Select";
import "./NewOperationForm.css";

export default function NewOperationForm(props) {
  const [shares, setShares] = useState([
    {
      id: 0,
      name: "",
      value: "",
    },
  ]);
  const options = [
    {
      name: "compra",
      value: "purchase",
    },
    {
      name: "venda",
      value: "sale",
    },
  ];
  const getShares = async () => {
    let result = [];
    props.share.forEach((item) => {
      result.push({
        id: item.id,
        name: item.name,
        value: item.id,
      });
    });
    if (result.name === "") {
      props.cancel();
    }
    setShares(result);
  };
  const saveOperation = async (event) => {
    event.preventDefault();
    const form = event.target;
    const operationValues = {
      operationDate: new Date(form.dateOperation.value),
      operationType: form.operationType.value,
      SHAREId: parseInt(form.shareOperation.value),
      operationPrice: parseFloat(form.sharePrice.value),
      operationQuantity: parseFloat(form.shareQuantity.value),
      brockerageFee: parseFloat(form.brokerageFee.value),
    };
    await Api.PostRequest(Api.createOperationUrl(), operationValues)
      .catch((error) => console.log(error))
      .then((result) => {
        if (result.status === 200) {
          props.action("O registro foi concluido com sucesso!");
        }
      });
  };
  useEffect(() => {
    getShares();
  }, []);
  return (
    <>
      {shares ? (
        <Form submit={saveOperation}>
          <label className="form_title">{"Nova Operação"}</label>
          <Input
            type="date"
            inputName={"dateOperation"}
            name={"Data da Operação"}
          />
          <Select
            options={shares}
            name={"Ação a Fazer Nova Operação"}
            selectName="shareOperation"
          />
          <Select
            options={options}
            name={"Tipo de Operação"}
            selectName="operationType"
          />
          <Input type="text" inputName={"sharePrice"} name={"Preço da Ação"} />
          <Input
            type="text"
            inputName={"shareQuantity"}
            name={"Quantidade de Ações"}
          />
          <Input
            type="text"
            inputName={"brokerageFee"}
            name={"Taxa de Corretagem"}
          />

          <Button buttonText={"Salvar Operação"} buttonName={"normal_button"} />
          <Button
            buttonText={"Cancelar Operação"}
            buttonName={"danger_button"}
            click={props.cancel}
          />
        </Form>
      ) : (
        ""
      )}
    </>
  );
}
