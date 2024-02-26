import {  render , fireEvent, waitFor} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PoiResultCard from './PoiResultCard';



// Smoke Test
it('renders without crashing', () => {
render(
    <BrowserRouter>
        <PoiResultCard activity={{}}/>
    </BrowserRouter>  
);
});


// Snapshot Test

it('matches Snapshot', () => {
   const {asFragment} = render(
        <BrowserRouter>
            <PoiResultCard activity={{}}/>
        </BrowserRouter>
    );
    expect(asFragment).toMatchSnapshot()
    });


