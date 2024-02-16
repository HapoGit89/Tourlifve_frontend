
import { useState, useCallback } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100vh',
  height: '55vh',
};

let center = {
  lat: 53.745,
  lng: 10.523
};

const libraries = ["places"]

function ActivityMap() {

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
        center={center}
        zoom={6}
        onUnmount={onUnmount}
      >
     
      {selected && <Marker position={selected} />}
        <></>
      </GoogleMap>
      </div>
   
  ) : <></>
}



export default ActivityMap