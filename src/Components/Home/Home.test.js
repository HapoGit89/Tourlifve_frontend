import { render} from '@testing-library/react';
import Home from './Home';

// Smoke Test

it('renders without crashing', () => {
render(<Home />);
});

// Snapshot Test

it('matches Snapshot', () => {
    const {asFragment} = render(<Home />);
    expect(asFragment).toMatchSnapshot()
    });