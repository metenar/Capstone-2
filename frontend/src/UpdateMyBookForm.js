import React,{useContext} from "react";
import CurrentUserContext from "./CurrentUserContext"
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { Card, Button, CardBody, 
        Form,FormGroup,Label ,Input} from 'reactstrap';

const validate = values => {
    const errors = {}; 
    if (!values.current_status) {
        errors.current_status = 'Required';
    }
    return errors;
  };


const UpdateMyBookForm=({update})=>{
    
    const {book_id} =useParams();
    const {currentUser}=useContext(CurrentUserContext)
    let data=currentUser.library.find(book=>book.book_id===book_id)
    let initials={}
    if (data.current_status==="Finished"){
        initials.username=currentUser.username
        initials.book_id = data.book_id
        initials.current_status  = data.current_status
        initials.rating = data.rating
        initials.finished_date = data.finished_date        
    } else if (data.current_status==="Reading"){
        initials.username=currentUser.username
        initials.book_id = data.book_id
        initials.current_status  = data.current_status
        initials.progress=data.progress
    } else {
        initials.username=currentUser.username
        initials.book_id = data.book_id
        initials.current_status  = data.current_status
    }
    const formik = useFormik({
        initialValues : initials,
        validate,
        onSubmit      : async (values,actions) => {
          try {
            let res=await update(values.book_id,values);
            if(res.success){
            actions.setStatus({ message: 'Book Status Updated' });
            }
          } catch (err) {
            formik.errors.password = err;
          }
        }
      });
    
    return (
        <div className="col-md-4 m-auto">
            <h2>Book Status</h2>
            <Card className="card">
                <CardBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Label >Username</Label>
                            <p className="font-weight-bold">{formik.values.username}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>book_id</Label>
                            <p>{formik.values.book_id}</p>
                        </FormGroup>
                        <FormGroup>
                            <Label>Current Status</Label>
                            <Input
                                type="text"
                                name="current_status"
                                value={formik.values.current_status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.current_status && formik.errors.current_status ? <div className="alert alert-danger">{formik.errors.current_status}</div>:null}
                        </FormGroup>
                        {formik.values.current_status==="Finished" && (<FormGroup>
                            <Label>Rating</Label>
                            <Input
                                type="text"
                                name="rating"
                                value={formik.values.rating}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.rating && formik.errors.rating ? <div className="alert alert-danger">{formik.errors.rating}</div>:null}
                        </FormGroup>)
                        }
                        {formik.values.current_status==="Finished" && (<FormGroup>
                            <Label>Finished Date</Label>
                            <Input
                                type="text"
                                name="finished_date"
                                value={formik.values.finished_date}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.finished_date && formik.errors.finished_date ? <div className="alert alert-danger">{formik.errors.finished_date}</div>:null}
                        </FormGroup>)
                        }
                        {formik.values.current_status!=="Finished" && (<FormGroup>
                            <Label for="progress">Progress </Label>
                            <Input 
                                type="text"
                                id="progress"
                                name="progress"
                                value={formik.values.progress}
                                placeholder="Enter total page count read"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.progress && formik.errors.progress ? <div className="alert alert-danger">{formik.errors.progress}</div>:null}
                        </FormGroup>)
                        }
                        <div className="text-success">
                        {formik.status && formik.status.message ? formik.status.message:""}
                        </div>
                        <Button type="submit" color="primary">Save Changes</Button>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}
export default UpdateMyBookForm;