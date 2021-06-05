import { render,screen} from '@testing-library/react';
import { MemoryRouter, Route, Switch} from "react-router-dom";
import SignUpForm from '../SignUpForm';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderSignUp(currentUser) {

    return render(
        <MemoryRouter initialEntries={["/signup"]}>
            <CurrentUserContext.Provider value={currentUser}>
                <Switch>
                    <Route exect path="/signup">
                        <SignUpForm />
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
  renderSignUp({currentUser});
});

test('should match the snapshot', () => {
  const {asFragment}=renderSignUp({currentUser});
  expect(asFragment()).toMatchSnapshot()
});

test('should First Name visible', ()=>{
    renderSignUp({currentUser});
    expect(screen.queryAllByText('First Name')).not.toBeNull();
})