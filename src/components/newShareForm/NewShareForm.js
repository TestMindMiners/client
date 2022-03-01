import Button from "../button/Button";
import Form from "../form/Form";
import Input from "../input/Input";
import "./NewShareForm.css";

export default function NewShareForm(props) {
  return (
    <>
      <Form>
        <label className="form_title">{"Registrar Nova Ação"}</label>
        <Input type="text" inputName={"shareName"} name={"Nome da ação"} />
        <Button buttonText={"Salvar Registro"} buttonName={"normal_button"} />
        <Button
          buttonText={"Cancelar Registro"}
          buttonName={"danger_button"}
          click={props.cancel}
        />
      </Form>
    </>
  );
}
