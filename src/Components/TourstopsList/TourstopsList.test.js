import { render } from '@testing-library/react';
import userContext from '../../userContext';
import { BrowserRouter } from 'react-router-dom';
import TourstopList from './TourstopsList';



// Smoke Test

it('renders without crashing', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs"}
    render(<BrowserRouter>
            <userContext.Provider value={user}>
            <TourstopList tour_id={2} tourstops={[{date:"2012-10-12",city:"test", name:"test"}]}/>
            </userContext.Provider>
           </BrowserRouter>
      )
});


// Snapshot Test

it('matches Snapshot', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs"}
    const {asFragement} = render(<BrowserRouter>
            <userContext.Provider value={user}>
            <TourstopList tour_id={2} tourstops={[{date:"2012-10-12",city:"test", name:"test"}]}/>
            </userContext.Provider>
           </BrowserRouter>
      )
      expect(asFragement).toMatchSnapshot()
});