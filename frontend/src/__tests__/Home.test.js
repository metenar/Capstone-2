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
  renderHome({username:"metenar"});
});

test('should match the snapshot', () => {
  const {asFragment}=renderHome({username:"metenar"});
  expect(asFragment()).toMatchSnapshot()
});

test('should welcome back visible', ()=>{
    renderHome({username:"metenar"});
    expect(screen.getByText(/Welcome Back/)).not.toBeNull();
})