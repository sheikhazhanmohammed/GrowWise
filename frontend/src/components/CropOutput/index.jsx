import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Grid } from '@mui/material';
import { useAtom } from 'jotai';
import { IML } from '../../jotai';
import { Navigate, useNavigate } from 'react-router-dom';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CropOutput(cropData) {
  const [expanded, setExpanded] = React.useState(false);
  const [currIML,setcurrIML]= useAtom(IML)
  const navigate = useNavigate();

  const navigateandset=()=>{
    setcurrIML(cropData.cropData);
    navigate('/catalouge')
  }
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  console.log('cr',cropData)

  return (
    <Card sx={{ maxWidth: "auto" }}>
      <CardHeader
        
        title={cropData.cropData.Crop}
        subheader={cropData.cropData.farmingTechnique}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={()=>navigateandset()}>Generate AI Catlouge</Button>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Starting Month:{cropData.cropData.startMonth}</Typography>
          <Typography paragraph>End Month: {cropData.cropData.endMonth}</Typography>
          <Typography paragraph>Shelf Life: {cropData.cropData.shelfLife}</Typography>
          
        </CardContent>
      </Collapse>
    </Card>
    
  );
}
