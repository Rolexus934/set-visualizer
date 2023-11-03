import { useState } from 'react'
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import BasicCard from "./BasicCard"

import AddRelation from './AddRelation';

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

function RelationsCalculator({ sets }) {
    const { setA, setB } = sets;

    const [relation, setRelation] = useState(new Relation([]));
    const [processedRel, setProcessedRel] = useState(false);

    const updateRelation = (valueA, valueB) => {
        setRelation(new Relation([...relation.arr, [valueA, valueB]], setA, setB));
    }
    const deleteRelation = () => {
        setRelation(new Relation([]));
        setProcessedRel(false);
    }
    const processRelation = () => {
        
        setProcessedRel(true);
    }

    console.log(relation);






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


        </>
    );

}


export default RelationsCalculator;