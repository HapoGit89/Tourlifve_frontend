
import { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100vh',
  height: '55vh',
};



const libraries = ["places"]

function ActivityMap({location,results}) {

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



  return isLoaded ? (
   <div>
   
       
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={location}
        zoom={12}
        onUnmount={onUnmount}
      >
     
      {location && <Marker position={location} />}
        <></>
      </GoogleMap>
      </div>
   
  ) : <></>
}



export default ActivityMap