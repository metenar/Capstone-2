import React,{useContext} from "react";
import CurrentUserContext from "./CurrentUserContext"
import { Link } from "react-router-dom";
import BooksList from "./BooksList"

const Home=()=>{
    const {currentUser}=useContext(CurrentUserContext)
    return (
        <div className="text-center">
            <h1>Book API</h1>
            <p> You can follow your library using easy steps.</p>
            {currentUser 
            ? (<div>
                    <h3>Welcome Back, {currentUser.username}</h3>
                    <img className="card-img rounded-circle user-img mt-2 ml-2 p-2" style={{width:'150px'}} src={currentUser.image} alt="user avatar"/>
                    <BooksList />
                </div>
            )
        :(
            <p>
                <Link className="btn btn-primary mr-3" to="/login">
                    Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                    SignUp
                </Link>
            </p>
        )}
        </div>
    )
}
export default Home;