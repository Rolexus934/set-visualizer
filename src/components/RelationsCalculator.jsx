import { useState } from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import BasicCard from "./BasicCard";
import AddRelation from './AddRelation';
import FunctionDisplay from './FunctionDisplay'

import { InlineMath } from 'react-katex';

class Relation {
    constructor(arr, setA, setB) {
        this.arr = arr;
        this.set = this.parseSet();
        this.string = this.parseString();
        this.katexString = this.parseKatexString();
        this.setA = setA;
        this.setB = setB;

    }


    parseSet() {
        const set = new Set;
        this.arr.forEach((e) => { set.add(e.toString()) });
        return set;
    }
    parseString() {
        let strArr = [];
        this.arr.forEach((pair) => {
            strArr.push(`(${pair[0]}, ${pair[1]})`);
        })
        return strArr.join();
    }
    parseKatexString() {
        return (this.arr.length) ? String.raw`\{ ${this.string} \}` : String.raw`\varnothing`;
    }
}

class RelationUtil {
    constructor(relation) {
        this.relation = relation;
        this.adyList = this.createAdylist();
        this.isFunction = this.isFunction();
        this.isInjective = this.isInjective();
        this.isSurjective = this.isSurjective();
    }
    createAdylist() {
        //domain -> {image}
        const rel = this.relation.arr;
        const domain = this.relation.setA.arrSet;
        const adyList = {};
        domain.forEach((element) => {
            adyList[element] = [];
        });

        rel.forEach((pair) => {
            adyList[pair[0]].push(pair[1]);
        });

        return adyList;

    }
    createInvAdyList(){
        //image -> {domain}
        const rel = this.relation.arr;
        const img = this.relation.setB.arrSet;
        const invAdyList = {};
        img.forEach((element) =>{
            invAdyList[element] = [];
        });
        rel.forEach((pair)=>{
            invAdyList[pair[1]].push(pair[0]);
        })

        return invAdyList;
    }
    isFunction() {
        const adyl = this.adyList;
        const inputLabel = this.relation.setA.label;
        const outputLabel = this.relation.setB.label;
        let infoBlock = (<p>
            Se cumple que para cada a, el f(a) producido en {outputLabel} es único. <br></br> Dicho de otra forma <InlineMath>{String.raw`\forall a \in ${inputLabel}, \exists ! b \in ${outputLabel} : f(a) = b`}</InlineMath>
        </p>);

        const response = { value: true, info: null }


        console.log(adyl);
        for (const [key, value] of Object.entries(adyl)) {
            if (value.length > 1) {
                response.value = false;
                const arrStr = value.toString();
                infoBlock = (<p>
                    Existe un <InlineMath>{String.raw`a\in A`}</InlineMath> tal que <InlineMath>f(a)</InlineMath> no es unico. Si <InlineMath math={String.raw`a = ${key}, f(${key}) = \{ ${arrStr} \}`}> </InlineMath>. Como existen multiples valores para {`f(${key})`}, f(a) no es una funcion.
                </p>);
                break;
            }
        }
        console.log('here');

        response.info = infoBlock;
        console.log(infoBlock);


        return response;
    }

    isInjective(){
        const invAdyl = this.createInvAdyList();
        const inputLabel = this.relation.setA.label;
        let infoBlock = (<p>
            Se cumple la relacion uno a uno en todos los elementos de A para f(a). <br/> Dicho de otra forma  <InlineMath>{String.raw`\forall a, b \in ${inputLabel}, f(a) = f(b) \Longrightarrow a = b`}</InlineMath>
        </p>);

        const response = { value: true, info: null }


        for (const [key, value] of Object.entries(invAdyl)) {
            if (value.length > 1) {
                response.value = false;
                const arrStr = value.toString();
                infoBlock = (<p>
                    Existe un par distinto de <InlineMath>{String.raw`a,b\in A`}</InlineMath> tal que cuando <InlineMath math={String.raw`a \neq b \Longrightarrow f(a) = f(b)`}>  </InlineMath> <br></br> 
                    Si <InlineMath math={String.raw`a = ${value[0]}, b =${value[1]} \Longrightarrow f(${value[0]}) = f(${value[1]})`}> </InlineMath>, aun cuando <InlineMath math={String.raw` a \neq b`}/>. Por lo tanto, no es una funcion inyectiva.
                </p>);
                break;
            }
        }
        console.log('here');

        response.info = infoBlock;
        console.log(infoBlock);


        return response;

    }

    isSurjective(){
        const invAdyl = this.createInvAdyList();
        const inputLabel = this.relation.setA.label;
        const outputLabel = this.relation.setB.label;
        let infoBlock = (<p>
            Todo elemento de B está asociado a un elemento de A <br/> Dicho de otra forma  <InlineMath>{String.raw`\forall b \in ${outputLabel}, \exists a \in A : f(a) = b`}</InlineMath>
        </p>);

        const response = { value: true, info: null }


        for (const [key, value] of Object.entries(invAdyl)) {
            if (value.length == 0) {
                response.value = false;
                const arrStr = value.toString();
                infoBlock = (<p> Existe un elemento b en {outputLabel} que no está asociado a ningun elemento de {inputLabel} <br/>
                    Dicho de otra forma, <InlineMath math={String.raw`\exists b \in ${outputLabel}, \forall a \in ${inputLabel} : f(a) \neq b `}/> <br/>
                    La defincion no se satiface para <InlineMath math={`b = ${key}`}></InlineMath>
                    </p>);
                break;
            }
        }
        console.log('here');

        response.info = infoBlock;
        console.log(infoBlock);


        return response;
    }



}

function RelationsCalculator({ sets }) {
    const { setA, setB } = sets;


    const [relation, setRelation] = useState(new Relation([], setA, setB));
    const [processedRel, setProcessedRel] = useState(false);
    console.log(relation);
    const updateRelation = (valueA, valueB) => {
        setRelation(new Relation([...relation.arr, [valueA, valueB]], setA, setB));
    }
    const deleteRelation = () => {
        setRelation(new Relation([], setA, setB));
        setProcessedRel(false);
    }
    const processRelation = () => {
        setProcessedRel(true);
    }

    let relUtil = null;
    if (processedRel) relUtil = new RelationUtil(relation);


    console.log(relation);
    console.log(relUtil);



    const displayFunction = (<FunctionDisplay relData={relUtil} />)


    return (
        <>
            <AddRelation
                inputStatus={processedRel}
                processRelationHandler={processRelation}
                updateRelationHandler={updateRelation}
                deleteRelationHandler={deleteRelation}
                setA={setA}
                setB={setB}
                relation={relation}
            />
            {processedRel && displayFunction}


        </>
    );

}


export default RelationsCalculator;