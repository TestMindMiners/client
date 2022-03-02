import { Link } from "react-router-dom";
import "./Table.css";

export default function Table(props) {
  return (
    
    <article className="table_background">

      <table className="table">
        <thead className="table_title">
          <tr>
            <th>id</th>
            <th>{"Data da Operação"}</th>
            <th>{"Tipo (Compra/Venda)"}</th>
            <th>{"Preço"}</th>
            <th>{"Quantidade"}</th>
            <th>{"Taxa de Corretagem"}</th>
            <th>opções</th>
          </tr>
        </thead>
        {props.operations?
        <tbody className="table_data">
          
          {props.operations.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{new Date(item.operationDate).toLocaleDateString()}</td>
              <td>{item.operationType}</td>
              <td>{item.operationPrice}</td>
              <td>{item.operationQuantity}</td>
              <td>{item.brockerageFee}</td>
              <td>
                <Link to={`/view/${item.id}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
        :""}
      </table>
    </article>
  );
}
