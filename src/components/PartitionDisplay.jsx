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
import avsdf from "cytoscape-avsdf";

function PartitionDisplay({ partitionData }) {
  try {
    Cytoscape.use(avsdf);

    //parsing to cytoscapejs
    const adyl = partitionData.equivalenceAdyl;
    const classes = partitionData.classListStr;
    const eqList = partitionData.equivalenceList;
    //cytoscape nodeP
    const elements = [];
    for (const [node, edges] of Object.entries(adyl)) {
      const nodeObj = {};
      nodeObj["id"] = node;
      nodeObj["label"] = node;
      elements.push({ data: nodeObj });
      for (const element of edges) {
        const edgeObj = {};
        edgeObj["id"] = `${node}${element}`;
        edgeObj["source"] = node;
        edgeObj["target"] = element;

        elements.push({ data: edgeObj });
      }
    }

    const eqClassData = (
      <p>
        <InlineMath
          math={String.raw` P / Q =\{${classes.join()}\}`}
        ></InlineMath>
      </p>
    );

    const eqClassArray = [];

    for (const [key, elements] of Object.entries(eqList)) {
      const content = (
        <p>
          <InlineMath
            math={String.raw`[${key}] = \{${elements.join()}\}`}
          ></InlineMath>
        </p>
      );

      const infocard = (
        <Grid item md="5">
          <InfoCard title={`Clase [${key}]`} content={content} />
        </Grid>
      );

      eqClassArray.push(infocard);
    }

    return (
      <>
        <Header
          size="h3"
          title="Propiedades de Relación de Equivalencia"
          content="Analizemos las clases de equivalencia así como su diagrama de particiones"
        ></Header>
        <Grid container justifyContent="center">
          <Grid item md="10">
            <InfoCard title="Clases de equivalencia" content={eqClassData} />
          </Grid>
          {eqClassArray}
          <Grid item md="10">
            <CytoscapeComponent
              elements={elements}
              style={{ width: "900px", height: "900px", background: "grey" }}
              layout={{
                name: "avsdf",
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
