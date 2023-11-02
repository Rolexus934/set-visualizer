import { useState } from "react";


import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";


import Nav from "./Nav";
import AddSets from "./AddSets"
import CardHolder from "./CardHolder"
import Header from "./Header"


import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";




  function SetCalculator({updateSets, sets}) {
    
    const {setA, setB} = sets;
    const parseKatexString= (arrSet) => {
  
      return (arrSet.length)?String.raw`\{ ${arrSet.join()} \}`: String.raw`\varnothing`;
    }
    
  
  
  
    const katexSetA = parseKatexString(setA.arrSet);
    const katexSetB = parseKatexString(setB.arrSet);
  
    const katexUnion = parseKatexString(setA.getUnion(setB.arrSet));
    const katexIntersection = parseKatexString(setA.getIntersection(setB.arrSet));
    const katexDifference = parseKatexString(setA.getDifference(setB.arrSet));
    const katexCross = parseKatexString(setA.getCross(setB.arrSet))
  
  
  
    const katexProps = {setA: katexSetA, setB: katexSetB, union: katexUnion, intersection:katexIntersection, difference: katexDifference, cross: katexCross}
    return (
      <>
        
        
        <AddSets updateSetsHandler ={updateSets}></AddSets>
        <CardHolder props ={katexProps}/>
      </>
    )
  }
  
  export default SetCalculator;
  