import { render,screen} from '@testing-library/react';
import { MemoryRouter, Route, Switch} from "react-router-dom";
import UpdateMyBookForm from '../UpdateMyBookForm';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderUpdate(currentUser,myBooks) {

    return render(
        <MemoryRouter initialEntries={["mybooks/update/qw11t5"]}>
            <CurrentUserContext.Provider value={{currentUser,myBooks}}>
                <Switch>
                    <Route exect path="/mybooks/update/:book_id">
                        <UpdateMyBookForm update={"mete"} />
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </MemoryRouter>
    );
  }

  const myBooks=[
    {
      username:"metenar",
      book_id:"qw11t5",
      current_status:"Finished",
      rating:'5.0',
      finished_date:"2021-03-03"
    }]

test('renders without crushing', () => {
  renderUpdate({username:"metenar"},myBooks);
});

test('should match the snapshot', () => {
  const {asFragment}=renderUpdate({username:"metenar"},myBooks);
  expect(asFragment()).toMatchSnapshot()
});

test('should Book Status visible', ()=>{
    renderUpdate({username:"metenar"},myBooks);
    expect(screen.queryAllByText('qw11t5')).not.toBeNull();
})