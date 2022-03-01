import NewOperationForm from "../newOperationForm/NewOperationForm";
import NewShareForm from "../newShareForm/NewShareForm";
import "./Modal.css";

export default function Modal(props) {
  return (
    <>
      {props.view ? (
        <article className="modal">
          {props.operation ? (
            <NewOperationForm cancel={props.cancel} />
          ) : (
            <NewShareForm cancel={props.cancel} />
          )}
        </article>
      ) : (
        ""
      )}
    </>
  );
}
