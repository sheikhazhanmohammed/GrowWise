import CropOutput from '../components/CropOutput';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { APIOutput } from '../jotai';

function PrimaryOutputPage() {

const [JSONData, setJSONData] = useAtom(APIOutput);
console.log("JSSON",JSONData);

return (
    
    <>
    {JSONData?.map(cropData =>(
        <>
         <Typography variant="h3"  align="center">
         {cropData.Crop} 
         </Typography>
        <CropOutput cropData={cropData} key={cropData.Crop}/>
        </>
    ))
    }
    </>
)
  
}

export default PrimaryOutputPage