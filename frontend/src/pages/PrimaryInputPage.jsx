import Map from '../components/Map'
import { Box, Button, Grid } from '@mui/material'
import RightInputSection from '../components/RightInputSection';


function PrimaryInputPage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} >
        <Map/>
        </Grid>
        <Grid item xs={12} sm={4} >
        <RightInputSection/>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PrimaryInputPage