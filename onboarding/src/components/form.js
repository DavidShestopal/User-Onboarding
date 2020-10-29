import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Forms = ({ values, touched, errors, status }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    status && setUser(status);
  }, [status]);

  return (
    <div className="container">
      <div className="signup">
        <Form>
          <label>Name: </label>
          <Field type="text" name="name" placeholder="Enter Name" />
          {touched.name && errors.name && <p className="errors">{errors.name}</p>}
          <label> Email: </label>
          <Field type="email" name="email" placeholder="Enter Email" />
          {touched.email && errors.email && <p className="errors">{errors.email}</p>}
          <label> Password: </label>
          <Field type="password" name="password" placeholder="Enter Password" />
          {touched.password && errors.password && <p className="errors">{errors.password}</p>}
          <label> Terms of Services</label>
          <Field type="checkbox" checked={values.TermsOfService} name="TermsOfService" />
          <div className="filler"></div>
          <button type="submit" disabled={values.isSubmitting}>
            {values.isSubmitting ? 'Submitting' : 'Submit'}
          </button>
        </Form>
      </div>
      <div className="userinfo">
        <h3> Welcome to ShmoneyGang {user.name} ! </h3>
      </div>
    </div>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    name: '',
    email: '',
    password: '',
    TermsOfService: false,
  }),
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Name is Required!'),
    email: Yup.string()
      .min(3, 'Too Short!')
      .max(20, 'Too Long!')
      .email('Invalid email')
      .required('Email is Required!'),
    password: Yup.string()
      .min(8, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Password is Required'),
  }),
  handleSubmit: (values, { resetForm, setStatus }) => {
    axios
      .post('https://reqres.in/api/users', values)
      .then(response => {
        console.log('value', values);
        resetForm();
        setStatus(response.data);
      })
      .catch(err => console.log(err.response));
  },
})(Forms);
