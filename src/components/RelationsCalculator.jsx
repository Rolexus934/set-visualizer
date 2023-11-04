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
        this.setA = {...setA};
        this.setB = {...setB};
        this.set = this.parseSet();
        this.string = this.parseString();
        this.katexString = this.parseKatexString();
        

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
            Se cumple que para cada x, el f(x) producido en {outputLabel} es único. <br></br> Dicho de otra forma <InlineMath>{String.raw`\forall x \in ${inputLabel}, \exists ! y \in ${outputLabel} : f(x) = y`}</InlineMath>
        </p>);

        const response = { value: true, info: null }


        for (const [key, value] of Object.entries(adyl)) {
            if (value.length > 1) {
                response.value = false;
                const arrStr = value.toString();
                infoBlock = (<p>
                    Existe un <InlineMath>{String.raw`x\in A`}</InlineMath> tal que <InlineMath>f(x)</InlineMath> no es unico. Si <InlineMath math={String.raw`x = ${key}, f(${key}) = \{ ${arrStr} \}`}> </InlineMath>. Como existen multiples valores para {`f(${key})`}, R no es una funcion.
                </p>);
                break;
            }
        }

        response.info = infoBlock;


        return response;
    }

    isInjective(){
        const invAdyl = this.createInvAdyList();
        const inputLabel = this.relation.setA.label;
        let infoBlock = (<p>
            Se cumple la relacion uno a uno en <InlineMath math={String.raw`\forall x \in ${inputLabel}`}/> para f(x). <br/> Dicho de otra forma  <InlineMath>{String.raw`\forall x, y \in ${inputLabel}, f(a) = f(b) \Longrightarrow a = b`}</InlineMath>
        </p>);

        const response = { value: true, info: null }


        for (const [key, value] of Object.entries(invAdyl)) {
            if (value.length > 1) {
                response.value = false;
                const arrStr = value.toString();
                infoBlock = (<p>
                    Existe un par distinto de <InlineMath>{String.raw`x,y\in ${inputLabel}`}</InlineMath> tal que cuando <InlineMath math={String.raw`x \neq y \Longrightarrow f(x) = f(y)`}>  </InlineMath> <br></br> 
                    Si <InlineMath math={String.raw`x = ${value[0]}, y =${value[1]} \Longrightarrow f(${value[0]}) = f(${value[1]})`}> </InlineMath>, aun cuando <InlineMath math={String.raw` x \neq y`}/>. Por lo tanto, R no es una funcion inyectiva.
                </p>);
                break;
            }
        }

        response.info = infoBlock;


        return response;

    }

    isSurjective(){
        const invAdyl = this.createInvAdyList();
        const inputLabel = this.relation.setA.label;
        const outputLabel = this.relation.setB.label;
        let infoBlock = (<p>
            Todo elemento de B está asociado a un elemento de A <br/> Dicho de otra forma  <InlineMath>{String.raw`\forall y \in ${outputLabel}, \exists x \in A : f(x) = y`}</InlineMath>
        </p>);

        const response = { value: true, info: null }


        for (const [key, value] of Object.entries(invAdyl)) {
            if (value.length == 0) {
                response.value = false;
                const arrStr = value.toString();
                infoBlock = (<p> Existe un elemento b en {outputLabel} que no está asociado a ningun elemento de {inputLabel} <br/>
                    Dicho de otra forma, <InlineMath math={String.raw`\exists x \in ${outputLabel}, \forall y \in ${inputLabel} : f(x) \neq y `}/> <br/>
                    La defincion no se satiface para <InlineMath math={`y = ${key}`}></InlineMath>
                    </p>);
                break;
            }
        }

        response.info = infoBlock;


        return response;
    }



}

function RelationsCalculator({ sets }) {
    const { setA, setB } = sets;


    const [relation, setRelation] = useState(new Relation([], {...setA}, {...setB}));
    const [processedRel, setProcessedRel] = useState(false);
    console.log(setA);
    console.log(setB);
    console.log(relation);

    const updateRelation = (valueA, valueB) => {
        setRelation(new Relation([...relation.arr, [valueA, valueB]], setA, setB));
    }
    const deleteRelation = () => {
        setRelation(new Relation([], setA, setB));
        setProcessedRel(false);
    }
    const processRelation = (relType) => {
        if(relType === 'aa'){
            relation.setB = {...setA};
          }
          else if(relType === 'bb'){
            relation.setA = {...setB};
          }
          
        setProcessedRel(true);
    }

    let relUtil = null;
    if (processedRel) relUtil = new RelationUtil(relation);





    const displayFunction = (<FunctionDisplay relData={relUtil} />)


    return (
        <>
            <AddRelation
                processedStatus={processedRel}
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