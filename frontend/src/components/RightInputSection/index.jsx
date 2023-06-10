import { Box, Button, Stack, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { AOI, budget, cropsGrownLastSeason, seasonOfNewCrops, sourceOfIrrigation } from '../../jotai';

function RightInputSection() {
    const[currentCropsGrownLastSeason, setCurrentCropsGrownLastSeason] = useAtom(cropsGrownLastSeason);
    const[currentBudget, setCurrentBudget] = useAtom(budget);
    const[currentSeasonOfNewCrops, setCurrentSeasonOfNewCrops] = useAtom(seasonOfNewCrops);
    const[currentSourceOfIrrigation, setCurrentSourceOfIrrigation] = useAtom(sourceOfIrrigation);
    const[currentAOI] =useAtom(AOI)

  return (
    <>
     <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        <div style={{ padding: 5 }}> What Crop did you grow last season ?</div>
        <TextField id="filled-basic" label="Crop grown last season" variant="filled" onChange={(e)=>(setCurrentCropsGrownLastSeason(e.target.value))}/>
        <div style={{ padding: 5 }}> What is your budget ?</div>
        <TextField id="filled-basic" label="Budget" variant="filled" onChange={(e)=>(setCurrentBudget(e.target.value))}/>
        <div style={{ padding: 5 }}> What season do you want to grow crop in ?</div>
        <TextField id="filled-basic" label="Season" variant="filled" onChange={(e)=>(setCurrentSeasonOfNewCrops(e.target.value))}/>
        <div style={{ padding: 5 }}> What is your main source of irrigation?</div>
        <TextField id="filled-basic" label="Source of irrigation" variant="filled" onChange={(e)=>(setCurrentSourceOfIrrigation(e.target.value))}/>
      <Button variant="contained" onClick={()=>{
        console.log(JSON.stringify({
                "AOI":currentAOI,
                "budget":currentBudget,
                "seasonOfNewCrops":currentSeasonOfNewCrops,
                "sourceOfIrrigation":currentSourceOfIrrigation,
                "cropsGrownLastSeason":currentCropsGrownLastSeason
            }
        )
    )
}}>
    Submit</Button>      
    </Stack>
    </Box>
        
    </>
  )
}

export default RightInputSection