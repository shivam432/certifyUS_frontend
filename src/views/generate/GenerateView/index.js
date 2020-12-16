import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  TextField,
  makeStyles,
  Button,
  IconButton,
  Card,
  CardContent,
  Typography,
  CardHeader
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import * as Yup from 'yup';
import { Formik } from 'formik';
import jwt_decode from "jwt-decode";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  productCard: {
    height: '100% '
  },
  input: {
    display: 'none',
  },
  card:{
    justifyItems:"center",
    textAlign: "center", 
    display: "block",
    margin:"auto",
  }
}));

var templates = [];
var admin_emailId;
var decoded;

const ProductList = () => {

  
  const classes = useStyles();
  var file;
  var template;
  const [signature, setMember] = React.useState('');

  const handlechange = (event) => {
    setMember(event.target.value);
  };

  function _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      file = image;
    }

    reader.readAsDataURL(image)
  }


  function _handleTemplateChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      template = image;
    }

    reader.readAsDataURL(image)
  }
  
  return (
    <Page
      className={classes.root}
    >
      <Container maxWidth="sm">
        <Formik
            
          onSubmit={(value) => {
            if (localStorage.getItem('token') != null) {
              decoded = jwt_decode(localStorage.getItem('token'));
            }
            admin_emailId = decoded.email;
            console.log(file);
            var axios = require('axios');
            var data = new FormData();
            console.log(signature);
            console.log(admin_emailId);
            console.log(decoded.email);
            data.append('signature', signature);
            data.append('file', file);
            data.append('template_url', 'uploads/2020-12-13T04-27-09.039ZWhite Geometric Design Participation Certificate (1)-1.png');
            data.append('admin_email', admin_emailId);

            var config = {
              method: 'post',
              url: 'http://localhost:5000/generateCertificates/create',
              data: data
            };

            axios(config)
              .then(function (response) {
                console.log(JSON.stringify(response.data));
              })
              .catch(function (error) {
                console.log(error);
              });
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values
          }) => (
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h2" component="h2">
                  Generate Certificates
                          </Typography>
                <form onSubmit={handleSubmit}>
                 
                  <Box mt={3}>
                  

                    <TextField
                      label="signature"
                      value={signature}
                      id="outlined-margin-normal"
                      name="signature"
                      className={classes.textField}
                      onChange={handlechange}
                      helperText="Signature : Your Name "
                      margin="normal"
                      variant="outlined"
                    />
                  </Box>
                  <div style={{ marginTop: 10 + "px", marginBottom: 10 + "px", marginLeft: 20 + "px" }}>
                    <span style={{ fontSize: 15 + "px", fontFamily: "monospace" }}><b>Upload Your CSV File:-</b></span>
                    <input
                      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      type="file"
                      style={{ marginLeft: 10 + "px" }}
                      onChange={_handleImageChange}
                      name="csvfile"
                    />
                  </div>
                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Submit
                  </Button>
                  </Box>
                 
                  <br></br>
                  <br></br>
                </form>
              </CardContent>
            </Card>
          )}
        </Formik>
      </Container>
    </Page>
  );
};

export default ProductList;
