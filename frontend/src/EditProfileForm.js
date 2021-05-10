import React,{useContext} from "react";
import CurrentUserContext from "./CurrentUserContext"
import 'bootstrap/dist/css/bootstrap.css';
import { useFormik } from 'formik';
import { Card, Button, CardBody, 
        Form,FormGroup,Label ,Input} from 'reactstrap';

const validate = values => {
    const errors = {}; 
    if (!values.password) {
        errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be at least 6 characters';
    }

    if (!values.first_name) {
        errors.first_name = 'Required';
    } else if (values.first_name.length > 15) {
        errors.first_name = 'Must be 15 characters or less';
    }

    if (!values.last_name) {
        errors.last_name = 'Required';
    } else if (values.last_name.length > 20) {
        errors.last_name = 'Must be 20 characters or less';
    }
    
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    return errors;
  };


const EditProfileForm=({save})=>{
    const {currentUser}=useContext(CurrentUserContext)
    console.log(currentUser)
    const formik = useFormik({
        initialValues : {
            username  : currentUser.username,
            first_name : currentUser.firstName,
            last_name  : currentUser.lastName,
            email     : currentUser.email,
            password  : '',
            image : currentUser.image
        },
        validate, 
        onSubmit      : async (values,actions) => {
          try {
            let res=await save(currentUser.username,values);
            if(res.success){
            actions.setStatus({ message: 'Profile Updated' });
            }
          } catch (err) {
            formik.errors.password = err;
          }
        }
      });
    
    return (
        <div className="col-md-4 m-auto">
            <h2>Profile</h2>
            <Card className="card">
                <CardBody>
                    <Form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <Label >Username</Label>
                            <p className="font-weight-bold">{formik.values.username}</p>
                            <img className="card-img rounded-circle user-img mt-2 ml-2 p-2" style={{width:'100px'}} src={formik.values.image} alt="user avatar"/>
                        </FormGroup>
                        <FormGroup>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? <div className="alert alert-danger">{formik.errors.first_name}</div>:null}
                        </FormGroup>
                        <FormGroup>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? <div className="alert alert-danger">{formik.errors.last_name}</div>:null}
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div>:null}
                        </FormGroup>
                        <FormGroup>
                            <Label>Confirm password to make changes:</Label>
                            <Input
                                type="password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div>:null}
                        </FormGroup>
                        <FormGroup>
                            <Label for="image">Avatar image </Label>
                            <Input 
                                type="text"
                                id="image"
                                name="image"
                                value={formik.values.image}
                                placeholder="Enter your image"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.image && formik.errors.image ? <div className="alert alert-danger">{formik.errors.image}</div>:null}
                        </FormGroup>
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
export default EditProfileForm;