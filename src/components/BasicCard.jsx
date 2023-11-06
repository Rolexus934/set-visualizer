import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { InlineMath, BlockMath } from "react-katex";

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    
  </Box>
);

export default function BasicCard({title,subtitle, content}) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent >
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <InlineMath>{subtitle}</InlineMath>
        </Typography>
        <Typography variant="h6" component="div" sx={{whiteSpace:"normal"}}>
        <Box component="div" sx={{overflow: 'auto'}} >
          <p><InlineMath>{content}</InlineMath></p>
          </Box>
          
        </Typography>
        
        
      </CardContent>
      <CardActions>
        
      </CardActions>
    </Card>
  );
}
