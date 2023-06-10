import  { useEffect, useRef, useState } from 'react'
import { FeatureGroup, MapContainer } from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw';
import { AOI } from '../../jotai';
import { useAtom } from 'jotai';
import ReactLeafletGoogleLayer from "react-leaflet-google-layer";


function Map() {
    const [currentAOI,setCurrentAOI] = useAtom(AOI)
    const [doesAOIexist,setDoesAOIexist] = useState(false)
    const position = [ 30.774579801622792,74.6916079998744
     ];
    const featureGroupRef = useRef(null);
    const colorDraw= "red"; // colour of AOI shapes

    const onAOICreated = async(e) => {
      setDoesAOIexist(true);
      const AOIGeoJSON =e.layer.toGeoJSON();
      
      setCurrentAOI(AOIGeoJSON)
      console.log("Created");
    }

    const onAOIEdited = (e) => {
      
      const AOIGeoJSON =e.layers.toGeoJSON();
      //console.log(AOIGeoJSON);
      setCurrentAOI(AOIGeoJSON);
      console.log("Edited");
    }

    const onAOIDeleted = () => {
      setDoesAOIexist(false);
      setCurrentAOI(null);
      console.log("Deleted");
    }

    useEffect(()=>{
      console.log("hello")
      console.log(currentAOI)
    },[currentAOI])
  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ minHeight: "100vh" }}
    >
      <FeatureGroup
        ref={featureGroupRef}        
        >
          {(doesAOIexist==false)?(
          <EditControl 
            position='topright' 
            onCreated={onAOICreated}
            onDeleted={onAOIDeleted}
            onEdited={onAOIEdited}
            draw={{ // initialize only polygon and rectangle. 
              polygon: {
                allowIntersection: true,
                shapeOptions: { color: colorDraw },
              },
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
            edit={{ // keeps the edit colours red as well 
              selectedPathOptions: {
                color: colorDraw,
                fillColor: colorDraw,
              },
              shapeOptions: { color: colorDraw },
            }}/>  ):(
              <EditControl 
            position='topright' 
            onCreated={onAOICreated}
            onDeleted={onAOIDeleted}
            onEdited={onAOIEdited}
            draw={{ // initialize only polygon and rectangle. 
              polygon: false,
              rectangle: false,
              polyline: false,
              circle: false,
              circlemarker: false,
              marker: false,
            }}
            edit={{ // keeps the edit colours red as well 
              selectedPathOptions: {
                color: colorDraw,
                fillColor: colorDraw,
              },
              shapeOptions: { color: colorDraw },
            }}/> 
            )}
                    
        </FeatureGroup>
        <ReactLeafletGoogleLayer
              apiKey="AIzaSyADL3JLj5CruRv2TD27MGIUmqXDEBmjOVc"
              type={"hybrid"}
            />
  
    </MapContainer>
  )
}

export default Map