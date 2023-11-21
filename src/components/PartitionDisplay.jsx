import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import BasicCard from "./BasicCard";
import InfoCard from "./InfoCard";
import Header from "./Header";

import Cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";

function PartitionDisplay({ equivalenceData }) {
  try {
    const equivalanceClass = hasseData.maximals.join();
    const maxStr = hasseData.minimals.join();
    const topStr = hasseData.topologicalSort.join();
    Cytoscape.use(dagre);



    //parsing to cytoscapejs
    const adyl = hasseData.hasseAdyl;

    //cytoscape nodeP
    const elements = [];
    for(const [node, edges] of Object.entries(adyl)){
      const nodeObj = {};
      nodeObj['id'] = node;
      nodeObj['label'] = node;
      elements.push({data: nodeObj});
      for(const element of edges){
        const edgeObj = {};
        edgeObj['id'] = `${node}${element}`;
        edgeObj['source'] = node;
        edgeObj['target'] = element;

        elements.push({data: edgeObj});
      }
    }

    console.log(elements);
    const maximalData = (
      <p>
        <InlineMath>{String.raw`\{${maxStr}\}`}</InlineMath>
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
            <InfoCard title="Orden Topolologico" content={topoData}></InfoCard>
          </Grid>
          <Grid item md="7">
            <CytoscapeComponent
              elements={elements}
              style={{ width: "500px", height: "500px", background: "grey" }}
              layout={{
                name: "dagre",
              }}
            />
          </Grid>
        </Grid>
      </>
    );
  } catch (e) {
    console.log(e);
  }
}

export default PartitionDisplay;
