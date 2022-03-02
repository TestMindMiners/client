import { useState,useEffect } from "react";
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
            value: ""
          }
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
  const getShares = async()=>{
    let result = [];
    const response = await Api.GetRequest(Api.selectShareUrl());
    const res = await response.json();
    res.forEach((item)=>{
        result.push({
            id:item.id,
            name:item.name,
            value:item.id
        })
    });
    if(result.name===""){

        props.cancel();
    }
    setShares(result);
  }
  useEffect(()=>{
    getShares();
  },[]);
  return (
    <>
      <Form>
        <label className="form_title">{"Nova Operação"}</label>
        <Input
          type="date"
          inputName={"dateOperation"}
          name={"Data da Operação"}
        />
        <Select
          options={shares}
          name={"Ação a Fazer Nova Operação"}
          selectName="OperationType"
        />
        <Select
          options={options}
          name={"Tipo de Operação"}
          selectName="OperationType"
        />
        <Input type="number" inputName={"sharePrice"} name={"Preço da Ação"} />
        <Input
          type="number"
          inputName={"shareQuantity"}
          name={"Quantidade de Ações"}
        />
        <Input
          type="number"
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
    </>
  );
}
