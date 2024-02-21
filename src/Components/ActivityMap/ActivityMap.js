
import { useState, useCallback , useEffect, useRef} from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import "./ActivityMap.css"



const containerStyle = {
  width: '100vh',
  height: '55vh',
};



const libraries = ["places"]

function ActivityMap(props) {
const myRef = useRef()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries
  })
  const [selected, setSelected] = useState(null)
  const [map, setMap] = useState(null)

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleClick = (data)=>{
     props.handleMarkerClick(data)
  }






  return isLoaded ? (
   <div>
   
       
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.location.location}
        zoom={12}
        onUnmount={onUnmount}
      >
     
      {props.location && <Marker position={props.location.location} label={props.location.name}   />}
      {props.results && props.results.length >0 && props.results.map((el)=><Marker onClick={()=>handleClick(el.place_id)}className="Marker" icon={"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"} clickable={true}  opacity={0.9} key={el.place_id} position={el.position}></Marker>)}
   
     
    
     
  
        <></>
      </GoogleMap>
      </div>
   
  ) : <></>
}



export default ActivityMap