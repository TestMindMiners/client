import Button from "../button/Button";
import Form from "../form/Form";
import Input from "../input/Input";
import { Api } from "../../api/Api";
import "./NewShareForm.css";

export default function NewShareForm(props) {
  const saveShare = async (event) => {
    event.preventDefault();
    const form = event.target;
    const operationValues = {
      name: form.shareName.value,
    };
    await Api.PostRequest(Api.createShareUrl(), operationValues)
      .catch((error) => console.log(error))
      .then((result) => {
        if (result.status === 200) {
          props.action("O registro foi concluido com sucesso!");
        }
      });
  };
  return (
    <>
      <Form submit={saveShare}>
        <label className="form_title">{"Registrar Nova Ação"}</label>
        <Input type="text" inputName={"shareName"} name={"Nome da ação"} required={true} />
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
