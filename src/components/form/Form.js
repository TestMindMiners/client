import "./Form.css";

export default function Form(props) {
  return (
    <form className="form" onSubmit={props.submit}>
      {props.children}
    </form>
  );
}
