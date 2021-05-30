import { render} from '@testing-library/react';
import App from '../App';

test('renders without crushing', () => {
  render(<App />);
});

test('should match the snapshot', () => {
  const {asFragment}=render(<App />);
  expect(asFragment()).toMatchSnapshot()
});
