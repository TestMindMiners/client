import { useNavigate } from 'react-router-dom';
import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../api/Api";
import OperationViewer from '../../components/operationViewer/OperationViewer';
import Button from '../../components/button/Button';
import './View.css';


export default function View(){
    const params = useParams();
    const navigate = useNavigate();
    const [operationData,setOperationData] = useState();
    const getOperationDataValues = async()=>{
        const response = await Api.GetRequest(Api.selectOperationByIdUrl(params.id));
        const operation = await response.json();
        setOperationData(operation);
    }
    const goBack = (event)=>{
        event.preventDefault();
        navigate(-1);
    }
    useEffect(()=>{
        getOperationDataValues();
    },[])
    return (
        <section className='page view'>
        {operationData?
            <OperationViewer operationData={operationData}></OperationViewer>
            :
            ""
        }
        <Button buttonText={"Voltar"} buttonName={"normal_button"} click={goBack} />
        </section>
    );
}