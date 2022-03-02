import './OperationViewer.css';

export default function OperationViewer(props){
    const operationDate =  new Date(props.operationData.operationDate).toLocaleDateString();
    const createAt = new Date(props.operationData.createdAt).toLocaleDateString();
    return (
        <div className='operation_viewer'>

            <fieldset className='view_status'>
                <legend>Visão da Operação</legend>
                <label className='value_title'>Numero de Registro</label>
                <label className='value_result'>
                    {props.operationData.id}
                </label>
                <label className='value_title'>Data da Operação</label>
                <label className='value_result'>
                {operationDate}
                </label>
                <label className='value_title'>Tipo da Operação</label>
                <label className='value_result'>
                {props.operationData.operationType}
                </label>
                <label className='value_title'>Valor da Operação</label>
                <label className='value_result'>
                {props.operationData.operationPrice}
                </label>
                <label className='value_title'>Quantidade Referente a Operação</label>
                <label className='value_result'>
                {props.operationData.operationQuantity}
                </label>
                <label className='value_title'>Preço médio Atingido</label>
                <label className='value_result'>
                {props.operationData.middlePrice}
                </label>
                <label className='value_title'>Quantidade média Atingida</label>
                <label className='value_result'>
                {props.operationData.middleQuantity}
                </label>
                <label className='value_title'>Valor de Resultado Auferido</label>
                <label className='value_result'>
                {props.operationData.resultEarned}
                </label>
                <label className='value_title'>Valor Acumulado de Prejuízo</label>
                <label className='value_result'>
                {props.operationData.accumulatedLoss}
                </label>
                <label className='value_title'>Valor de Taxa de Corretagem</label>
                <label className='value_result'>
                {props.operationData.brockerageFee}
                </label>
                <label className='value_title'>Valor de Imposto de Renda Calculado</label>
                <label className='value_result'>
                {props.operationData.irValue}
                </label>
                <label className='value_title'>Operação pertencente a que Ação:</label>
                <label className='value_result'>
                {props.operationData["SHARE.name"]}
                </label>
                <label className='value_title'>Dados Registrados Em:</label>
                <label className='value_result'>
                {createAt}
                </label>
            </fieldset>
        </div>
    );
}