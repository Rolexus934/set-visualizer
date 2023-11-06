import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useState} from 'react'



function AddSets({updateSetsHandler}) {

   const [valueA,setValueA] = useState('');
   const [valueB,setValueB] = useState('');

   const handleUpdateA = (e) =>{
        setValueA(e.target.value);
   }
   const handleUpdateB = (e) =>{
        setValueB(e.target.value);
   }
   const handleSubmit = (e) =>{ 
    let arrValueA = valueA.split(',');
    let arrValueB = valueB.split(',');

    if(arrValueA[0] === '') arrValueA = [];
    if(arrValueB[0] === '') arrValueB = [];
    e.preventDefault();
    if(setValidator(arrValueA) && setValidator(arrValueB)){
        updateSetsHandler(arrValueA,arrValueB);
    }
    else{

    }
   }

   const setValidator = (arrSet) =>{
    return true;
   }
  return <>
    <Box sx={{textAlign: 'center'}}>
    <Grid container  justifyContent="center">
        
        <Grid item xs={12} sm={5} sx={{alignItems : 'center', m:2} }>
                <TextField label='Conjunto A' variant='outlined' onChange={handleUpdateA}></TextField>
        </Grid>
        <Grid item xs={12} sm={5} sx={{alignItems : 'center', m:2}} >
             <TextField label='Conjunto B' variant='outlined' onChange={handleUpdateB} ></TextField>
        </Grid>
        <Grid item xs = {3} >
            <Button variant="contained" onClick={handleSubmit}>Calcular</Button>
        </Grid>
    </Grid>
    </Box>
    <Box>
    <Grid container justifyContent="center">
        
    </Grid>
    </Box>
  
  </>;
}
export default AddSets;
