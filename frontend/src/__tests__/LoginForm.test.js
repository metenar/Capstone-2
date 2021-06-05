import { render,screen} from '@testing-library/react';
import { MemoryRouter, Route, Switch} from "react-router-dom";
import LoginForm from '../LoginForm';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderLogin(currentUser) {

    return render(
        <MemoryRouter initialEntries={["/login"]}>
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route exect path="/login">
                        <LoginForm />
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </MemoryRouter>
    );
  }

  const currentUser=[
    {
      username:"metenar",
      firstName:"Mete",
      lastName:"NAR",
      email:'metenar@gmail.com',
      password:"",
      image:"www.mete.jpg"
    }]

test('renders without crushing', () => {
  renderLogin({currentUser});
});

test('should match the snapshot', () => {
  const {asFragment}=renderLogin({currentUser});
  expect(asFragment()).toMatchSnapshot()
});

test('should Login visible', ()=>{
    renderLogin({currentUser});
    expect(screen.queryAllByText('Login')).not.toBeNull();
})