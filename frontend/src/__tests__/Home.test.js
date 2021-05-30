import { render,screen} from '@testing-library/react';
import Home from '../Home';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderHome(currentUser) {

    return render(
      <CurrentUserContext.Provider value={currentUser}>
        <Home />
      </CurrentUserContext.Provider>
    );
  }


test('renders without crushing', () => {
  renderHome("metenar");
});

test('should match the snapshot', () => {
  const {asFragment}=renderHome("metenar");
  expect(asFragment()).toMatchSnapshot()
});

test('should welcome back visible', ()=>{
    renderHome("metenar");
    expect(screen.queryByText('Welcome Back')).not.toBeNull();
})