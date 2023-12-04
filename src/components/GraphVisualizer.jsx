import { Grid } from "@mui/material";
import { Button } from "@mui/material";
import { Box } from "@mui/material";

import Header from "./Header";

import Cytoscape from "cytoscape";
import CytoscapeComponent from "react-cytoscapejs";
import dagre from "cytoscape-dagre";
import edgehandles from "cytoscape-edgehandles";
import cxtmenu from "cytoscape-cxtmenu";

import { useState } from "react";

function GraphVisualizer() {
  const [mode, setMode] = useState("Añadir Nodos");

  Cytoscape.use(edgehandles);
  Cytoscape.use(cxtmenu);

  const handleOption = (e) => {
    const state = e.target.textContent;
    console.log(e);
    console.log("c", state);
    setMode(state);
  };
  let charVar = 0;
  const options = [
    "Añadir Nodos",
    "Añadir Aristas",
    "Caminos minimos",
    "Grados",
  ];

  const adyl = {};
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Grid container justifyContent="center">
          {options.map((opt) => (
            <Grid item xs={3}>
              <Button variant="contained" onClick={handleOption}>
                {opt}
              </Button>
            </Grid>
          ))}

          <Grid item xs={10}>
            <Header title={`Modo: ${mode}`} size="h5" />
          </Grid>
          <Grid item md="7"></Grid>
        </Grid>
      </Box>
      <Box margin={5}>
        <Grid container justifyContent="space-between">
          <Grid item xs={7}>
            <CytoscapeComponent
            elements={[]}
              style={{ width: "1500px", height: "700px", background: "grey" }}
              cy={(cy) => {
                let defaults = {
                  canConnect: function (sourceNode, targetNode) {
                    console.log(sourceNode);
                    console.log(targetNode)
                    console.log("asdasdasfipksdgsdg",cy.elements(`edge[source = "${sourceNode.data.id}"][target = "${targetNode.data.id}"]`));
                    console.log(`edge[source = "${sourceNode.data}"][target = "${targetNode.data}"]`)
                    // whether an edge can be created between source and target
                    return !sourceNode.same(targetNode); // e.g. disallow loops
                  },
                  edgeParams: function (sourceNode, targetNode) {
                    // for edges between the specified source and target
                    // return element object to be passed to cy.add() for edge
                    return {};
                  },
                  hoverDelay: 150, // time spent hovering over a target node before it is considered selected
                  snap: true, // when enabled, the edge can be drawn by just moving close to a target node (can be confusing on compound graphs)
                  snapThreshold: 50, // the target node must be less than or equal to this many pixels away from the cursor/finger
                  snapFrequency: 15, // the number of times per second (Hz) that snap checks done (lower is less expensive)
                  noEdgeEventsInDraw: true, // set events:no to edges during draws, prevents mouseouts on compounds
                  disableBrowserGestures: true, // during an edge drawing gesture, disable browser gestures such as two-finger trackpad swipe and pinch-to-zoom
                };
              
                    let eh = cy.edgehandles(defaults);
                    console.log(mode);
                
                
                if(mode === 'Añadir Aristas'){
                    console.log('enable');
                    eh.enableDrawMode();
                }
                else if (mode === 'Añadir Nodos'){
                    console.log('disable');
                    eh.disableDrawMode();
                    eh.disable();
                    eh.destroy();
                    cy.autolock(false);
                    cy.autoungrabify(false);
                

                }

                
                cy.on("tap", (e) => {
                    
                    console.log(cy.edges())
                  let evtTarget = e.target;
                  let posX = e.position.x;
                  let posY = e.position.y;
                  console.log(e);
                  if (e.target === cy) {
                    console.log(eh);
                    console.log("adding the thing");
                    
                    cy.add({
                      data: {
                        id: charVar,
                        label: String.fromCharCode(97 + charVar),
                      },
                      position: { x: posX, y: posY },
                    });
                  } else {
                    console.log("element");
                  }
                  charVar++;
                });
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default GraphVisualizer;
