import "./MessageBox.css";

export default function MessageBox(props) {
  return (
    <div className="message_box">
      {props.message}
      <p onClick={props.action} className="close_btn">
        X
      </p>
    </div>
  );
}
