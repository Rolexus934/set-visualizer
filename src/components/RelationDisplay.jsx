import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import InfoCard from "./InfoCard";
import { InlineMath } from "react-katex";
import Header from "./Header";
import { Info } from "@mui/icons-material";
import Button from "@mui/material/Button";
import HasseDisplay from "./HasseDisplay";

import {useState} from 'react'
import { useEffect } from "react";

import axios from "axios";

export default function RelationDisplay({ relData }) {
  const reflexive = relData.isReflexive;
  const symmetric = relData.isSymmetric;
  const asymmetric = relData.isAntiSymmetric;
  const transitive = relData.isTransitive;
  const katexAdjMatrix = relData.katexAdjMatrix;
  
  const [renderHasse,setRenderHasse ] = useState(false);
  
  const onGenerateHasse = async () => {
    const response = await fetch("https://cors-anywhere.herokuapp.com/http://api.wolframalpha.com/v2/query?" + new URLSearchParams({
      appid: "A6X44T-TATQJWX3E2",
      input: relData.hasseDiagramUtil.wolframQuery,
      output: "json"
    }));
    const data = await response.json();
    console.log(data);
    setRenderHasse(true);
  };
  const onGenerateEquivalence = () => {
    console.log("rendering equivalence");
  };
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
  let value;
  let color;
  let content;
  const partialOrder = relData.isPartialOrder,
    equivalence = relData.isEquivalence;
  if (partialOrder && equivalence) {
    value = "Es una relacion de orden parcial y de equivalencia";
    color = "Blue";
    content =
      "R es transitiva, reflexiva, simétrica y antisimetrica. Por lo tanto es al mismo tiempo una relacion de orden parcial y una de equivalencia";
  } else if (partialOrder) {
    value = "Es una relacion de orden parcial";
    color = "orange";
    content =
      "R es transitiva, reflexiva y antisimetrica, por lo tanto es una relacion de orden parcial";
  } else if (equivalence) {
    value = "Es una relacion de equivalencia";
    color = "purple";
    content =
      "R es transitiva, reflexiva y simetrica, por lo tanto es una relacion de equivalencia";
  } else {
    value = "No es ni de equivalencia ni de orden parcial";
    color = "red";
    content =
      "R no cumple con los requisitos para ser una relacion de equivalencia o de orden parcial";
  }

  const typeOfRelationCard = (
    <>
      <InfoCard
        title="¿Que tipo de relación es R?"
        value={value}
        valuecolor={color}
        content={content}
      />

      <Grid container justifyContent="center">
        {partialOrder ? (
          <Button variant="contained" onClick={onGenerateHasse}>
            Generar diagrama de Hasse
          </Button>
        ) : null}
        {equivalence ? (
          <Button variant="contained" onClick={onGenerateEquivalence}>
            Mostrar clases de equivalencia
          </Button>
        ) : null}
      </Grid>
    </>
  );
  const hasseDisplay = (
    <>

    </>
  );
  return (
    <>
      <Grid container justifyContent="center" sx={{ margin: "1%" }}>
        <Header
          size="h4"
          title="Propiedades de Relacion"
          content="Analizemos las propiedades de R como Relación "
        ></Header>
        <Grid item md="11">
          <InfoCard
            title="Matriz de adyacencia para R"
            valuecolor={transitive.value ? "green" : "red"}
            content={<InlineMath math={relData.katexMatrix} />}
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
        <Grid item md="8">
          {typeOfRelationCard}
        </Grid>
      </Grid>
      {renderHasse && <HasseDisplay hasseData ={relData.hasseDiagramUtil}/>}
    </>
  );
}
