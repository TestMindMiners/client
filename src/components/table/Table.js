import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Api } from "../../api/Api";
import "./Table.css";

export default function Table() {
  const [operationList, setOperationList] = useState([]);
  const getOperations = async () => {
    let result = [];
    const response = await Api.GetRequest(Api.selectOperationUrl());
    const operations = await response.json();
    operations.forEach((item) => {
      const dateOperation = new Date(item.operationDate).toLocaleDateString();
      result.push({
        id: item.id,
        operationDate: dateOperation,
        operationType: item.operationType,
        price: item.operationPrice,
        quantity: item.operationQuantity,
        brockerageFee: item.brockerageFee,
      });
    });
    setOperationList(result);
  };
  useEffect(() => {
    getOperations();
  }, []);
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
        <tbody className="table_data">
          {operationList.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.operationDate}</td>
              <td>{item.operationType}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.brockerageFee}</td>
              <td>
                <Link to={`/view/${item.id}`}>view</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </article>
  );
}
