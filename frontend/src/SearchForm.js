import React,{useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, Input} from 'reactstrap';

const SearchForm=({search})=>{
    const [term,setTerm]=useState("");
    const handleChange=e=>{
        setTerm(e.target.value);
    }
    const handleSubmit=e=>{
        e.preventDefault();
        search(term || undefined);
        setTerm("");
    }
    return (
        <div className="mb-2">
        <Form onSubmit={handleSubmit} className="form-inline">
            <Input 
                className="form-control  flex-grow-1"
                type="text"
                name="term"
                value={term}
                placeholder="Enter search term.."
                onChange={handleChange}
                />
            <Button type="submit" color="primary">Submit</Button>
        </Form>
        </div>
    )
}
export default SearchForm;