import {useState} from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";


import AddRelation from './AddRelation';


function RelationsCalculator({sets}){
    const {setA, setB} = sets;
    const [relation, setRelation] = useState([]);
    const updateRelation = (valueA, valueB) => {
        setRelation([[valueA, valueB], ...relation]);
    }
    const deleteRelation = ()=>{
        setRelation([]);
    }
    console.log(relation);






    return(
        <>
            <AddRelation updateRelationHandler={updateRelation} deleteRelationHandler={deleteRelation} setA={setA} setB={setB}/>
        </>
    );

}


export default RelationsCalculator;