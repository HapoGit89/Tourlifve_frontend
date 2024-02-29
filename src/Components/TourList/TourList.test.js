import { render,screen } from '@testing-library/react';
import TourList from './TourList';
import userContext from '../../userContext';
import { BrowserRouter } from 'react-router-dom';



// Smoke Test

it('renders without crashing', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs", tours: []}
    render(<BrowserRouter>
            <userContext.Provider value={user}>
            <TourList/>
            </userContext.Provider>
           </BrowserRouter>
      )
});


// Snapshot Test

it('matches Snapshot', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs", tours: []}
    const {asFragement} = render(<BrowserRouter>
            <userContext.Provider value={user}>
            <TourList/>
            </userContext.Provider>
           </BrowserRouter>
      )
      expect(asFragement).toMatchSnapshot()
});

//

it('shows add button', () => {
    const user = {username: "hannes", token: "ajshajhjshajhjhs", tours: []}
    const {} = render(<BrowserRouter>
            <userContext.Provider value={user}>
            <TourList/>
            </userContext.Provider>
           </BrowserRouter>
      )

      expect(screen.getByText("Create New Tour ...")).toBeInTheDocument()
     
});