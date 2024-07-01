import { useState, useCallback, useLayoutEffect} from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import usePlacesAutocomplete, { getLatLng, getGeocode } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import "./SearchMap.css"

// container  and center for GoogleMap 



// media query with conditional container Style

let containerStyle = {   
width: '40vw',
height: '70vh',
}

let center = {
  lat: 53.745,
  lng: 10.523
};

// array for google library imports
const libraries = ["places"]

function SearchMap({ handleMapOut }) {
  const [size, setSize] = useState({   
    width: '40vw',
    height: '70vh',
    });

    useLayoutEffect(() => {
      function updateSize() {
        if(window.innerWidth<1000){
        setSize({   
          width: '75vw',
          height: '50vh',
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
 


  

  // this code is from Google Map Docs
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
  //////////////



  return isLoaded ? (
    <div>
      <div className="SearchField">
        <PlacesAutoComplete setSelected={setSelected} handleMapOut={handleMapOut} ></PlacesAutoComplete>
      </div>

      <GoogleMap
        mapContainerStyle={size}
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

// Component for Autocomplete GoogleMap Search using npm combobox
const PlacesAutoComplete = ({ setSelected, handleMapOut }) => {
  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions, } = usePlacesAutocomplete()

  const handleSelect = async (address) => {
    setValue(address, false)
    clearSuggestions()
    const results = await getGeocode({ address })
    const latlng = await getLatLng(results[0])

    // format results for handleMapOut func
    const formatted_results = {}
    for (let i = 0; i < results[0].address_components.length; i++) {
      formatted_results[results[0].address_components[i].types[0]] = results[0].address_components[i].long_name
    }
    // prepare data for Submit
    const data = {
      lat: latlng.lat,
      lng: latlng.lng,
      housenumber: formatted_results.street_number || "",
      postal_code: formatted_results.postal_code,
      country: formatted_results.country,
      street: formatted_results.route || formatted_results.establishment || "",
      city: formatted_results.locality || formatted_results.postal_town,
      name: address.slice(0, address.indexOf(",")),
      googleplaces_id: results[0].place_id
    }

    //////////
    handleMapOut(data)
    center = latlng
    setSelected(latlng)
  }

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput value={value} disabled={!ready} placeholder="Search for a place..." className="comboIn" onChange={e => setValue(e.target.value)} />
      <ComboboxPopover>
        <ComboboxList className='comboList'>{status === "OK" && data.map(({ place_id, description }) => <ComboboxOption className='comboOpt' key={place_id} value={description} />)}</ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}

export default SearchMap