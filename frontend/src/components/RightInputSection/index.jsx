import { Box, Button, Stack, TextField } from '@mui/material'
import { useAtom } from 'jotai'
import { AOI, APIOutput, budget, cropsGrownLastSeason, seasonOfNewCrops, sourceOfIrrigation } from '../../jotai';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function RightInputSection() {
    const[currentCropsGrownLastSeason, setCurrentCropsGrownLastSeason] = useAtom(cropsGrownLastSeason);
    const[currentBudget, setCurrentBudget] = useAtom(budget);
    const[currentSeasonOfNewCrops, setCurrentSeasonOfNewCrops] = useAtom(seasonOfNewCrops);
    const[currentSourceOfIrrigation, setCurrentSourceOfIrrigation] = useAtom(sourceOfIrrigation);
    const[currentAOI] =useAtom(AOI)
    const [currentAPIOutput,setAPIOutput] =useAtom(APIOutput)
    const navigate = useNavigate();

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
        if((currentAOI)&&(currentBudget)&&(currentSeasonOfNewCrops)&&(currentSourceOfIrrigation)&&(currentCropsGrownLastSeason))
        {
          const DataBeingSent= JSON.parse(JSON.stringify({
            "AOI":currentAOI,
            "budget":currentBudget,
            "seasonOfNewCrops":currentSeasonOfNewCrops,
            "sourceOfIrrigation":currentSourceOfIrrigation,
            "cropsGrownLastSeason":currentCropsGrownLastSeason
        }
    ))
          console.log(DataBeingSent)
          toast.loading("The ML gnomes are hard at work",{id:"load"});
          axios.post("http://127.0.0.1:5000/call",DataBeingSent).then((response) => {
            
            console.log(response.data);
            setAPIOutput(response.data);
            toast.success("The ML gnomes hahve finished",{id:"load"});

            navigate('/output');
          }).catch(error => {
            toast.error(error);
        });
        console.log("pop eorks!")}
    else{
      console.log("error");
      toast.error("Please select farm area and enter all data");
     }
}}>
    Submit</Button>      
    </Stack>
    </Box>
        
    </>
  )
}

export default RightInputSection