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

const SignUpForm=({signup})=>{
    const history= useHistory();
    const formik = useFormik({
        initialValues : {
          username : '',
          first_name: '',
          last_name: '',
          email: '',
          password : '',
          image: ''
        },
        validate,
        onSubmit      : async (values) => {
          try {
            let res=await signup(values);
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
            <h2>SignUp</h2>
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
            <FormGroup>
                <Label for="first_name">First Name </Label>
                <Input 
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formik.values.first_name}
                    placeholder="Enter your First Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.first_name && formik.errors.first_name ? <div className="alert alert-danger">{formik.errors.first_name}</div>:null}
            </FormGroup>
            <FormGroup>
                <Label for="last_name">Last Name </Label>
                <Input 
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formik.values.last_name}
                    placeholder="Enter your last Name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.last_name && formik.errors.last_name ? <div className="alert alert-danger">{formik.errors.last_name}</div>:null}
            </FormGroup>
            <FormGroup>
                <Label for="email">Email </Label>
                <Input 
                    type="email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    placeholder="Enter your email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? <div className="alert alert-danger">{formik.errors.email}</div>:null}
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
            <Button type="submit" color="primary">Submit</Button>
        </Form>
        </section>
    )
}
export default SignUpForm;