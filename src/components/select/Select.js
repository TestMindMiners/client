import "./Select.css";

export default function Select(props) {
  return (
    <>
      <label
        className={"element_title " + (props.className ? props.className : "")}
        htmlFor={props.selectName}
      >
        {props.name}
      </label>

      <select
        className={"input select " + (props.className ? props.className : "")}
        id={props.selectName}
        name={props.selectName}
        onChange={props.action ? props.action : null}
      >
        :
        {props.options
          ? props.options.map((item, index) => (
              <option value={item.value} key={index}>
                {item.name}
              </option>
            ))
          : ""}
      </select>
    </>
  );
}
