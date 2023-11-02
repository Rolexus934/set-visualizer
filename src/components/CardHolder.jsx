import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BasicCard from "./BasicCard";




function CardHolder({props}){


    return(
        <>
            <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} sm={12}>
              <BlockMath>{`A =`+props.setA}</BlockMath>    
            </Grid>
            <Grid item xs={11} sm={12}>
              <BlockMath>{`B =`+props.setB}</BlockMath>
            </Grid>
            <Grid item xs={11} md={3}>
              <BasicCard title="Union" subtitle={String.raw`A\cup B`} content={props.union}></BasicCard>
            </Grid>
            <Grid item xs={11} md={3}>
              <BasicCard title="Interseccion" subtitle ={String.raw`A\cap B`}content={props.intersection}></BasicCard>
            </Grid>
            <Grid item xs={11} md={3}>
              <BasicCard title= "Diferencia" subtitle ={String.raw`A - B`} content={props.difference}></BasicCard>
            </Grid>
            <Grid item xs={11} md={11}>
              <BasicCard title= "Producto Cruz" subtitle ={String.raw`A  x  B`} content={props.cross}></BasicCard>
            </Grid>
          </Grid>
        </Box>
      </Box>
        </>
    );
}

export default CardHolder;