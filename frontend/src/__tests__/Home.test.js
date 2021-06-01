import { render,screen} from '@testing-library/react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import Home from '../Home';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderHome(currentUser) {

    return render(
        <BrowserRouter>
            <CurrentUserContext.Provider value={{currentUser}}>
                <Switch>
                    <Route exect path="/">
                        <Home />
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </BrowserRouter>
    );
  }


test('renders without crushing', () => {
  renderHome({currentUser:"metenar"});
});

test('should match the snapshot', () => {
  const {asFragment}=renderHome({currentUser:"metenar"});
  expect(asFragment()).toMatchSnapshot()
});

test('should welcome back visible', ()=>{
    renderHome({currentUser:"metenar"});
    expect(screen.getByText(/Welcome Back/)).not.toBeNull();
})