import { render,screen} from '@testing-library/react';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import UpdateMyBookForm from '../UpdateMyBookForm';
import '@testing-library/jest-dom'
import CurrentUserContext from "../CurrentUserContext"

function renderUpdate(currentUser,myBooks) {

    return render(
        <BrowserRouter>
            <CurrentUserContext.Provider value={{currentUser,myBooks}}>
                <Switch>
                    <Route exect path="/mybooks/update/:book_id">
                        <UpdateMyBookForm update={"mete"} />
                    </Route>
                </Switch>
            </CurrentUserContext.Provider>
        </BrowserRouter>
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
  renderUpdate({currentUser:"metenar"},myBooks);
});

test('should match the snapshot', () => {
  const {asFragment}=renderUpdate({currentUser:"metenar"},myBooks);
  expect(asFragment()).toMatchSnapshot()
});

test('should Book Status visible', ()=>{
    renderUpdate({currentUser:"metenar"},myBooks);
    expect(screen.queryByText(/metenar/i)).not.toBeNull();
})