import "./Input.css";

export default function Input(props) {
  return (
    <>
      <input
        id={props.inputName}
        type={props.type}
        className="input"
        placeholder={props.name}
      ></input>
    </>
  );
}
