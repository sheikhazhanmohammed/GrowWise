import { Grid, Paper, Typography } from '@mui/material'

function UnssupportedCrops({UnssupportedCropsArray}) {
  return (
    UnssupportedCropsArray.map((uc)=>
    <Paper
    sx={{
      p: 2,
      margin: 3,
      borderColor: "#000",
      backgroundColor: (theme) =>
      theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    }}
    key={uc.cropName}
    >
    <Grid container spacing={2}>
        
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1" component="div" align="left">
              {uc.cropName}
            </Typography>
            <Typography variant="body1" gutterBottom align="left">
              {uc.reason}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      
    </Grid>
  </Paper>)
    
  )
}

export default UnssupportedCrops