import React from "react";
import {useHistory} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { Form, FormGroup, Label, Input} from "reactstrap";
import {Button} from "reactstrap"
import { useFormik } from 'formik';

const validate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Required';
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less';
    }
  
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
        errors.password = 'Must be at least 6 characters';
    }
  
    return errors;
  };


const LoginForm=({login})=>{
    const history = useHistory();
    const formik = useFormik({
      initialValues : {
        username : '',
        password : ''
      },
      validate,
      onSubmit      : async (values) => {
        try {
          let res=await login(values);
          if(res.success){
            history.push('/')
        }
        } catch (err) {
          formik.errors.password = err;
        }
      }
    });
    
    
    return (
        <section className="col-md-4 m-auto">
        <Form onSubmit={formik.handleSubmit}>
            <h2>Login</h2>
            <FormGroup>
                <Label for="username">Username </Label>
                <Input 
                    type="text"
                    id="username"
                    name="username"
                    value={formik.values.username}
                    placeholder="Enter username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? <div className="alert alert-danger">{formik.errors.username}</div>:null}
            </FormGroup>
            <FormGroup>
                <Label for="password">Password </Label>
                <Input 
                    type="password"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    placeholder="Enter your password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password ? <div className="alert alert-danger">{formik.errors.password}</div>:null}
            </FormGroup>
            <Button color="primary">Submit</Button>
        </Form>
        </section>
    )
}
export default LoginForm;