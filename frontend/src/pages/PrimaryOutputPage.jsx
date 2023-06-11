import CropOutput from '../components/CropOutput';
import { Typography } from '@mui/material';
import { useAtom } from 'jotai';
import { APIOutput, bsi, ci, ndmi, ndsi } from '../jotai';
import UnssupportedCrops from '../components/UnsuportedCrops';
import { unsuitableCrops } from '../jotai';

function PrimaryOutputPage() {

const [JSONData] = useAtom(APIOutput);
const [currentNDSI] = useAtom(ndsi)
const [currentNDMI] = useAtom(ndmi)
const [currentBSI] = useAtom(bsi)
const [currentCI] = useAtom(ci)
const [uc] = useAtom(unsuitableCrops)
console.log("JSSON",JSONData);

return (
    
    <>
    <Typography variant="h5"  align="left">
        NDSI: {currentNDSI} 
    </Typography>
    <Typography variant="h5"  align="left">
        NDMI: {currentNDMI} 
    </Typography>
    <Typography variant="h5"  align="left">
        BSI: {currentBSI} 
    </Typography>
    <Typography variant="h5"  align="left">
        CI: {currentCI} 
    </Typography>
    <br/><br/>
    <Typography variant="h5"  align="left"  display="block">
        Unsuitable Crops:  
    </Typography>
    <UnssupportedCrops UnssupportedCropsArray={uc}/>
    <br/><br/>
    <Typography variant="h5"  align="left" >
        Suitable Crops with related products:  
    </Typography>
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