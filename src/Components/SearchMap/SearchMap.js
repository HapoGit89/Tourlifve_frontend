
import { useState, useCallback } from 'react';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, {getLatLng, getGeocode} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
const containerStyle = {
  width: '600px',
  height: '600px'
};

let center = {
  lat: 53.745,
  lng: 10.523
};

const libraries = ["places"]

function SearchMap() {

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
    <div>
        <PlacesAutoComplete setSelected={setSelected} ></PlacesAutoComplete>
    </div>
       
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

const PlacesAutoComplete = ({setSelected})=>{
  const {ready, value, setValue, suggestions: {status, data}, clearSuggestions, } = usePlacesAutocomplete()  
 
  
  const handleSelect = async(address)=>{
   setValue(address, false)
   clearSuggestions()
   const results = await getGeocode({address})
   const latlng = await getLatLng(results[0])
   center = latlng
    setSelected(latlng)

   
 }

   return (
       <Combobox onSelect={handleSelect}>
           <ComboboxInput value={value} disabled={!ready} className="comboIn" onChange={e=> setValue(e.target.value)}/>
           <ComboboxPopover>
             <ComboboxList className='comboList'>{status === "OK" && data.map(({place_id, description})=> <ComboboxOption className='comboOpt' key={place_id} value={description}/>)}</ComboboxList>
           </ComboboxPopover>
       </Combobox>
   )  
}

export default SearchMap