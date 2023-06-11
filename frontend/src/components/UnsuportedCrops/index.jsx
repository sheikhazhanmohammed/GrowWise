import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { Grid } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';





export default function UnsuportedCrops({UnsupportedCropsArray}) {
  
  return (
    <Grid container spacing={2} columns={16}>
      {UnsupportedCropsArray.map((uc)=>(
        <Grid item xs={8} key={uc.name}>
    <Card sx={{ maxWidth: "auto" }}>
      <CardHeader
        title={uc.cropName}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {uc.reason}
        </Typography>
      </CardContent>
        
      
      
    </Card>
    </Grid>

      ))}
           
    </Grid>
    
  );
}
