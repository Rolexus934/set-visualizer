import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import BasicCard from "./BasicCard"
import { useState } from "react";


function AddRelation({ inputStatus, updateRelationHandler, deleteRelationHandler, processRelationHandler, setA, setB, relation }) {
  const [value, setValue] = useState("");

  const handleUpdate = (e) => {
    setValue(e.target.value);
  };
  const handleProcess = (e) => {
    processRelationHandler();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let [valueA, valueB] = value.split(",");
    //formating
    valueA = valueA.slice(1);
    valueB = valueB.slice(0, valueB.length - 1);

    //validacion
    const validation = relationValidator(valueA, valueB);
    if (validation.state) {
      updateRelationHandler(valueA, valueB);
    }
    else {
      alert(validation.details);
    }
  };

  const handleDelete = (e) => {
    e.preventDefault();
    deleteRelationHandler();
  }

  const relationValidator = (valueA, valueB) => {

    const validation = { state: true, details: "lol" };


    if (setA.set.has(valueA) && setB.set.has(valueB)) {
      validation.details = "Succesfull";
    } else {
      validation.state = false;

      !setA.set.has(valueA)
        ? (validation.details = `El elemento ${valueA} no se encuentra contenido en A`)
        : (validation.details = `El elemento ${valueB} no se encuentra contenido en B`);
    }
    if (relation.set.has([valueA, valueB].toString())) {
      validation.state = false;
      validation.details = `La relacion ya contiene al par ordenado (${valueA}, ${valueB})`;

    }
    return validation;
  };
  return (
    <>
      <Box sx={{ textAlign: "center" }}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12} sx={{ alignItems: "center", m: 2 }}>
            <TextField
              label="(a, b)"
              variant="outlined"
              onChange={handleUpdate}
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleSubmit} disabled={inputStatus}>
              Añadir
            </Button>
          </Grid>

          <Grid item xs={11} sx={{ margin: '2%' }}>
            <BasicCard title="Relacion" subtitle={String.raw`a \mathrel{\mathcal{R}} b`} content={String.raw`\mathrel{\mathcal{R}} = ${relation.katexString}`}></BasicCard>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleProcess} disabled={inputStatus}>
              Procesar
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Eliminar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
export default AddRelation;
