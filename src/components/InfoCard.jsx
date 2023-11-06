import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function InfoCard({title, value, content, valuecolor}) {
  return (
    <div style={{margin: '5%'}}>
    <Card>
      <CardContent>
        <Typography variant='h4'  gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5" component="div" sx={{color: valuecolor}}>
         {value}
        </Typography>
        <Typography variant="body1">
          {content}
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
