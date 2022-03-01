import Button from "../button/Button";
import Input from "../input/Input";
import Form from "../form/Form";
import Select from "../select/Select";
import "./NewOperationForm.css";

export default function NewOperationForm(props) {
  const options = ["item 1", "item 2"];
  const share = ["PTR4", "VALE5"];
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
          options={share}
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
