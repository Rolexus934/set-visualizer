import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import BasicCard from "./BasicCard"
import { useState } from "react";
import { InlineMath } from 'react-katex';



function AddRelation({ processedStatus, updateRelationHandler,  deleteRelationHandler, processRelationHandler, setA, setB, relation }) {
  const [value, setValue] = useState("");
  const [inputStatus, setInputStatus] = useState(false);
  const [radioValue, setRadioValue] = useState('ab');



  const fancyR = `\mathrel{\mathcal{R}}`;
  const handleUpdate = (e) => {
    setValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if(e.keyCode == 13 && e.shiftKey == false){
      handleSubmit(e);
    }
  }

  const handleRadioUpdate = (e) => {
    setRadioValue(e.target.value);
  }
  const handleProcess = (e) => {
    
    processRelationHandler(radioValue);
  };

  const handleSubmit = (e) => {
    setInputStatus(true);
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
    setInputStatus(false);
    deleteRelationHandler();
  }

  const relationValidator = (valueA, valueB) => {
    let tempSetA = {...setA};
    let tempSetB = {...setB};
    if(radioValue === 'aa'){
      tempSetB = {...setA};
    }
    else if(radioValue === 'bb'){
      tempSetA = {...setB};
    }
    
    const validation = { state: true, details: "lol" };


    if (tempSetA.set.has(valueA) && tempSetB.set.has(valueB)) {
      validation.details = "Succesfull";
    } else {
      validation.state = false;

      !tempSetA.set.has(valueA)
        ? (validation.details = `El elemento ${valueA} no se encuentra contenido en ${tempSetA.label}`)
        : (validation.details = `El elemento ${valueB} no se encuentra contenido en ${tempSetB.label}`);
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
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Escoge el tipo de relacion</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"

                onChange={handleRadioUpdate}
              >
                <FormControlLabel value="ab" control={<Radio />} disabled ={inputStatus} label={<InlineMath math={String.raw`\mathrel{\mathcal{R}} : A \rightarrow B`}/>} />
                <FormControlLabel value="aa" control={<Radio />} disabled ={inputStatus} label={<InlineMath math={String.raw`\mathrel{\mathcal{R}} : A \rightarrow A`}/>} />
                <FormControlLabel value="bb" control={<Radio />} disabled ={inputStatus} label={<InlineMath math={String.raw`\mathrel{\mathcal{R}} : B \rightarrow B`}/>} />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ alignItems: "center", m: 2 }}>
            <TextField
              label="(a, b)"
              variant="outlined"
              onChange={handleUpdate}
              onKeyDown={handleKeyDown}
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" onClick={handleSubmit} disabled={processedStatus}>
              Añadir
            </Button>
          </Grid>

          <Grid item xs={11} sx={{ margin: '2%' }}>
            <BasicCard title="Relacion" subtitle={String.raw`a\mathrel{\mathcal{R}} b`} content={String.raw`\mathrel{\mathcal{R}} = ${relation.katexString}`}></BasicCard>
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleProcess} disabled={processedStatus}>
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
