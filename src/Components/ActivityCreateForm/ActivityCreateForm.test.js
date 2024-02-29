import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import ActivityCreateForm from './ActivityCreateForm';
import userContext from '../../userContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { act } from 'react-test-renderer';
import { TourApi } from '../../api';


const tourstop = {
  id: 10,
  name: "Alte Feuerwache Mannheim",
  country: "Germany",
  city: "Mannheim",
  street: "Brückenstraße",
  housenumber: "2",
  googleplaces_id: "ChIJ_9zn2CjMl0cR89fkHTMd_3c",
  tour_id: 7,
  location_id: 7,
  date: "2024-02-26T00:00:00.000Z",
  lat: 49.4957438,
  lng: 8.474236,
  activities: [
    ]
}


// Smoke Test

it('renders without crashing', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs"}
    render( <userContext.Provider value={user}>
           <BrowserRouter>
          <ActivityCreateForm></ActivityCreateForm>
           </BrowserRouter>
           </userContext.Provider>
      )
});


// Snapshot Test

it('matches Snapshot', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs"}
    const {asFragement} = render(<BrowserRouter>
            <userContext.Provider value={user}>
            <ActivityCreateForm></ActivityCreateForm>
            </userContext.Provider>
           </BrowserRouter>
      )
      expect(asFragement).toMatchSnapshot()
});


// specialized Tests

it('renders Search Form and Form', async() => {
  const ts = tourstop
    TourApi.getTourstopDetails = jest.fn()

    TourApi.getTourstopDetails.mockReturnValue({tourstop: ts})
  
  const user = {username: "Hannes", token: "askakjskjskjs"}
  const {getByText, getByPlaceholderText }=act(()=>{render(
          <userContext.Provider value={user}>
          <BrowserRouter>
          <ActivityCreateForm/>
          </BrowserRouter>
          </userContext.Provider>)})

          await waitFor(()=>expect(screen.getByText("Search For Interesting Places:")).toBeInTheDocument())
        
});

it('SearchForm Fires API Call', async() => {
  const ts = tourstop
    TourApi.getTourstopDetails = jest.fn()
    TourApi.searchPlaces = jest.fn()
    TourApi.searchPlaces.mockReturnValue({destinations: []})
    TourApi.getTourstopDetails.mockReturnValue({tourstop: ts})
  
  const user = {username: "Hannes", token: "askakjskjskjs"}
  const {getByText, getByPlaceholderText }=act(()=>{render(
          <userContext.Provider value={user}>
          <BrowserRouter>
          <ActivityCreateForm/>
          </BrowserRouter>
          </userContext.Provider>)})

          await waitFor(()=>expect(screen.getByText("Search For Interesting Places:")).toBeInTheDocument())
          const keyword = screen.getByPlaceholderText("Keyword...")
          const time = screen.getByLabelText("Traveltime")
          const mode= screen.getByLabelText("Mode of Travel:")
          const searchButton = screen.getByTestId("SearchButton")
          
          expect(keyword).toBeInTheDocument()
          expect(time).toBeInTheDocument()
          expect(mode).toBeInTheDocument()
          expect(searchButton).toBeInTheDocument()
          fireEvent.input(keyword, {target: {value: "Restaurant"}})
          fireEvent.change(mode, {target: {value: "walking"}})
          fireEvent.change(time, {target: {value: "5 min"}})
          expect(TourApi.getTourstopDetails).toHaveBeenCalled()
          expect(keyword).toHaveDisplayValue("Restaurant")
          expect(mode).toHaveDisplayValue("walking")
          expect(time).toHaveDisplayValue("5 min")
          fireEvent.click(searchButton)
          expect(TourApi.searchPlaces).toHaveBeenCalledTimes(1)

});


