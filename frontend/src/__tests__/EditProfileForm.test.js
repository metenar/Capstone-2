import { render,screen} from '@testing-library/react';
import { MemoryRouter, Route, Switch} from "react-router-dom";
import EditProfileForm from '../EditProfileForm';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderUpdate(currentUser) {

    return render(
        <MemoryRouter initialEntries={["/profile"]}>
            <CurrentUserContext.Provider value={{currentUser}}>
                <Switch>
                    <Route exect path="/profile">
                        <EditProfileForm save={"mete"} />
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
  renderUpdate({currentUser});
});

test('should match the snapshot', () => {
  const {asFragment}=renderUpdate({currentUser});
  expect(asFragment()).toMatchSnapshot()
});

test('should Book Status visible', ()=>{
    renderUpdate({currentUser});
    expect(screen.queryAllByText('metenar')).not.toBeNull();
})