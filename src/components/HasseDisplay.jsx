import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BasicCard from "./BasicCard";
import InfoCard from "./InfoCard";
import Header from "./Header";


function HasseDisplay({ hasseData, queryImage }) {
  try {
    const minStr = hasseData.maximals.join();
    const maxStr = hasseData.minimals.join();
    const topStr = hasseData.topologicalSort.join();
    const maximalData = (<p>
      <InlineMath >{String.raw`\{${maxStr}\}`}</InlineMath>
      </p>
    );
    const minimalData = (
      <InlineMath math={String.raw`\{${minStr}\}`}></InlineMath>
    );
    const topoData = <InlineMath math={String.raw`\{${topStr}\}`}></InlineMath>;
    return (
      <>
        <Header
          title="Propiedades de Relación de Orden parcial"
          content="Analizemos el diagrama de Hasse, así como el orden topologico, los maximales y minimales de nuestra relación"
        ></Header>
        <Grid container justifyContent="center">
          <Grid item md="5">
            <InfoCard
              title="Elementos Maximales"
              content={maximalData}
            ></InfoCard>
          </Grid>
          <Grid item md="5">
            <InfoCard
              title="Elementos Minimales"
              content={minimalData}
            ></InfoCard>
          </Grid>
          <Grid item md="10">
            <InfoCard title="Orden Topologico" content={topoData}></InfoCard>
          </Grid>
          <Grid item xs="5">
            <InfoCard title="Diagrama de Hasse" content="null"></InfoCard>
          </Grid>
        </Grid>
      </>
    );
  } catch (e) {
    console.log(e);
  }
}

export default HasseDisplay;
