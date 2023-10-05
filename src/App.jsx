import { useState } from "react";
import "./global.css"
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";


import Nav from "./components/Nav";
import AddSets from "./components/AddSets"
import BasicCard from "./components/BasicCard"
class Conjunto{
  constructor(set){
    this.arrSet = set;
    this.set = new Set;
    set.forEach((element) =>{this.set.add(element)});

  }
  getUnion(arrB){
    const temp = arrB.filter((element)=>{
        return !this.set.has(element);
    });
    const union = temp.concat(this.arrSet);
    return union.sort();
  }
  getIntersection(arrB){
    const intersection = arrB.filter((element)=>{
      return this.set.has(element);
    })
    return intersection.sort();
  }
  getDifference(arrB){
    const tempSetB = new Set;
    arrB.forEach((element) => {tempSetB.add(element)});

    const difference = this.arrSet.filter((element)=>{
      return !tempSetB.has(element);
    })

    return difference.sort();
  }

}

function App() {
  const [rawSets, setRawSets] = useState({setA: [], setB:[]});

  const updateSets = (a,b) => {
      setRawSets({setA: a, setB: b});
  }

  const parseKatexString= (arrSet) => {

    return (arrSet.length)?String.raw`\{ ${arrSet.join(',')} \}`: String.raw`\varnothing`;
  }
  const setA = new Conjunto(rawSets.setA);
  const setB = new Conjunto(rawSets.setB); 

  console.log(setA);
  console.log(setB);

  const katexSetA = parseKatexString(setA.arrSet);
  const katexSetB = parseKatexString(setB.arrSet);

  const katexUnion = parseKatexString(setA.getUnion(setB.arrSet));
  const katexIntersection = parseKatexString(setA.getIntersection(setB.arrSet));
  const katexDifference = parseKatexString(setA.getDifference(setB.arrSet));


  console.log(katexUnion);
  const setUnion = String.raw`\{ 2,3,4,5,7\}`;
  const setDiff = String.raw`\{ 2,3,4,5,7\}`;
  const setInt =  String.raw`\{ 2,3,4,5,7\}`;
  return (
    <>
    
      <Nav />
      <AddSets updateSetsHandler ={updateSets}></AddSets>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={6}>
              <BlockMath>{`A =`+katexSetA}</BlockMath>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BlockMath>{`B =`+katexSetB}</BlockMath>
            </Grid>
            <Grid item xs={12} md={3}>
              <BasicCard title="Union" subtitle={String.raw`A\cup B`} content={katexUnion}></BasicCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <BasicCard title="Interseccion" subtitle ={String.raw`A\cap B`}content={katexIntersection}></BasicCard>
            </Grid>
            <Grid item xs={12} md={3}>
              <BasicCard title= "Diferencia" subtitle ={String.raw`A - B`} content={katexDifference}></BasicCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default App;
