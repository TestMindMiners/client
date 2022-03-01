import "./Button.css";

export default function Button(props) {
  return (
    <>
      {props.click ? (
        <button className={props.buttonName} onClick={props.click}>
          {props.buttonText}
        </button>
      ) : (
        <button className={props.buttonName}>{props.buttonText}</button>
      )}
    </>
  );
}
