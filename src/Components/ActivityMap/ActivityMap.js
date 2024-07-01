
import { useState, useCallback , useLayoutEffect, useRef} from 'react';
import { GoogleMap, Marker ,useJsApiLoader } from '@react-google-maps/api';
import "./ActivityMap.css"

// define container for GoogleMap
const containerStyle = {
  width: '80vh',
  height: '80vh',
};
// Array for google library imports
const libraries = ["places"]


// Google Map Component rendering the location from props
function ActivityMap(props) {
  const [size, setSize] = useState({   
    width: '40vw',
    height: '90vh',
    });

    useLayoutEffect(() => {
      function updateSize() {
        if(window.innerWidth<1000){
        setSize({   
          width: '80vw',
          height: '30vh',
          });}
      else {
        setSize({   
          width: '40vw',
          height: '70vh',
          })
      }}
    
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
 

// this code is taken from the Google Map Docs
  
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
  /////////////


  return isLoaded ? (
   <div>
   
      <GoogleMap
        mapContainerStyle={size}
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