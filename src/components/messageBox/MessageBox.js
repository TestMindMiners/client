import "./MessageBox.css";

export default function MessageBox(props) {
  return (
    <div className="message_box">
      <p>{props.message}</p>
      <p onClick={props.action} className="close_btn">
        X
      </p>
    </div>
  );
}
