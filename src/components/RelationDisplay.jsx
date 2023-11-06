import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InfoCard from "./InfoCard";
import { InlineMath } from "react-katex";
import Header from "./Header";

export default function RelationDisplay({ relData }) {
  const reflexive = relData.isReflexive;
  const symmetric = relData.isSymmetric;
  const asymmetric = relData.isAntiSymmetric;
  const transitive = relData.isTransitive;
  const katexAdjMatrix = relData.katexAdjMatrix;

  const reflexivaCard = (
    <InfoCard
      title="¿Es R reflexiva?"
      value={reflexive.value ? "Es reflexiva" : "No es reflexiva"}
      valuecolor={reflexive.value ? "green" : "red"}
      content={reflexive.info}
    />
  );
  const simetricaCard = (
    <InfoCard
      title="¿Es R simetrica?"
      value={symmetric.value ? "Es simetrica" : "No es simetrica"}
      valuecolor={symmetric.value ? "green" : "red"}
      content={symmetric.info}
    />
  );
  const asimetricaCard = (
    <InfoCard
      title="¿Es R asimetrica?"
      value={asymmetric.value ? "Es asimetrica" : "No es asimetrica"}
      valuecolor={asymmetric.value ? "green" : "red"}
      content={asymmetric.info}
    />
  );
  const transitivaCard = (
    <InfoCard
      title="¿Es R transitiva?"
      value={transitive.value ? "Es transitiva" : "No es transitiva"}
      valuecolor={transitive.value ? "green" : "red"}
      content={transitive.info}
    />
  );

  return (
    <>
      <Grid container justifyContent="center">
        <Header
          size="h4"
          title="Propiedades de Relacion"
          content="Analizemos las propiedades de R como Relación "
        ></Header>
        <Grid item md="11">
          <InfoCard
            title="Matriz de adyacencia para R"
            valuecolor={transitive.value ? "green" : "red"}
            content={<InlineMath math={relData.katexMatrix}/>}
          />
        </Grid>
        <Grid item md="6">
          {reflexivaCard}
        </Grid>
        <Grid item md="6">
          {simetricaCard}
        </Grid>
        <Grid item md="6">
          {asimetricaCard}
        </Grid>
        <Grid item md="6">
          {transitivaCard}
        </Grid>
      </Grid>
    </>
  );
}
