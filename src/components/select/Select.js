import "./Select.css";

export default function Select(props) {
  return (
    <>
      <label className="element_title" htmlFor={props.selectName}>
        {props.name}
      </label>
      <select
        className="input select"
        id={props.selectName}
        name={props.selectName}
      >
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
