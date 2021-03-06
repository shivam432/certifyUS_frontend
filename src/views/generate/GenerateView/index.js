import React, { Component } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';


import {
  Box,
  Container,
  Grid,
  TextField,
  makeStyles,
  Button,
  IconButton,
  Card,
  Link,
  CardContent,
  Typography,
  Modal,
  CardHeader,
} from '@material-ui/core';
import Page from 'src/components/Page';
import { Formik } from 'formik';
import jwt_decode from 'jwt-decode';
import ImagePicker from 'react-image-picker';
import 'react-image-picker/dist/index.css';
import Loader from 'react-loader-spinner';
import logo from 'src/images/enjoy.jpg'


const useStyles = makeStyles(theme => ({
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
    height: '100% ',
  },
  input: {
      display: 'none',
  },
  card: {
    justifyItems: 'center',
    textAlign: 'center',
    display: 'block',
    margin: 'auto',
    marginTop: '50px',
  },
  content: {
    top: '35%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    width: '60%',
    transform: 'translate(-40%, -10%)',
  },
  card:{
    justifyItems:"center",
    display: "block",
    margin:"auto",
  }
}));




var admin_emailId;
var decoded;
var file;
var template;

export default class ProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signature: '',
      image: null,
      imageList: [],
      loaded: false,
      open: false,
    };
    this.onPick = this.onPick.bind(this);
    this.handlechange = this.handlechange.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handlechange = event => {
    this.setState({
      signature: event.target.value,
    });
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let image = e.target.files[0];

    reader.onloadend = () => {
      file = image;
    };

    reader.readAsDataURL(image);
  }
     _handleTemplateChange(e) {
            e.preventDefault();

            let reader = new FileReader();
            let image = e.target.files[0];

            reader.onloadend = () => {
              template = image;
            }

            reader.readAsDataURL(image)
          }
     onPick(image){
            this.setState({
              image: {image},
            })
          }
     handleOpen = () => {
            this.setState({
               open:true,
            })
            
          };
        
    handleClose = () => {

      setTimeout(() => {
        this.setState({
          open:false,
        })
      }, 500);     
         
    }
        
        componentDidMount() {
          var templates = [];
          fetch('http://localhost:5000/templates/')
            .then(resp => resp.json())
            .then(data =>
              data.map(async images => {
                var imageUrl = 'http://localhost:5000/' + images.url;
                templates.push(imageUrl);
                this.setState({
                  imageList: templates,
                  loaded: true,
                });
              })
            );

           
          // console.log(imageList)
          
        }
  render() {
    return (
      <Page style={{margin:"15px"}}>
        <Container maxWidth="xl">
          <Formik
            initialValues={{
              firstName: '',
            }}
            onSubmit={value => {
              if(this.state.image.image.src && file && this.state.signature )
              {
              var  res = this.state.image.image.src.substring(21, this.state.image.image.src.length);
              res="uploads"+res;
              console.log(res);
             if (localStorage.getItem('token') != null) {
               decoded = jwt_decode(localStorage.getItem('token'));
             }
             admin_emailId = decoded.email;
             console.log(file);
             var axios = require('axios');
             var data = new FormData();
             console.log(this.state.signature);
             console.log(admin_emailId);
             console.log(decoded.email);
             data.append('signature', this.state.signature);
             data.append('file', file);
             data.append('template_url',res);
             data.append('admin_email', admin_emailId);

              var config = {
                method: 'post',
                url: 'http://localhost:5000/generateCertificates/create',
                data: data,
              };

              axios(config)
                .then(function(response) {
                  
                  console.log(JSON.stringify(response.data));
                })
                .catch(function(error) {
                  console.log(error);
                });
                this.handleOpen();
              }
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values,
            }) => (
              <Card >
                <CardContent>
                  <Typography variant="h2" component="h2" style={{textAlign:"center"}}>
                    <br></br>
                    Generate Certificates
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Box mt={12} xl={12}>
                      <Typography varient="h3" component="h3" style={{padding:"20px",fontSize:"20px",marginTop:"-65px"}}>
                        Choose a template : 
                      </Typography>
                      {this.state.loaded == false ? (
                        <center>
                          <Loader
                            type="ThreeDots"
                            color="#00BFFF"
                            height={80}
                            width={80}
                            style={{ marginTop: 100 + 'px' }}
                          />
                        </center>
                      ) : (
                        <ImagePicker
                        style={{width:"50%", marginLeft:"25px"}}
                          images={this.state.imageList.map((image, i) => ({
                            src: image,
                            value: i,
                          }))}
                          onPick={this.onPick}
                        />
                      )}

                      <div
                        style={{
                          
                          marginBottom: 10 + 'px',
                          marginLeft: 20 + 'px',
                        }}
                      >
                     
                          <Typography varient="h3" component="h3" style={{paddingTop:"20px",paddingBottom:"15px",fontSize:"20px"}}>Upload csv file :</Typography>
                       
                        <input
                          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                          type="file"
                          style={{ marginLeft: 10 + 'px' }}
                          onChange={this._handleImageChange}
                          name="csvfile"
                        />
                      </div>

                      <Typography varient="h3" component="h3" style={{paddingTop:"20px",paddingBottom:"10px",fontSize:"20px",marginLeft:"24px"}}>Signature :</Typography>

                      <TextField
                        label="Signature"
                        value={this.state.signature}
                        id="outlined-margin-normal"
                        name="Signature"
                        onChange={this.handlechange}
                        helperText="Signature : Your Name "
                        margin="normal"
                        variant="outlined"
                        style={{ justifyContent: 'center', width: '50%', textAlign:"center", margin:"15px" }}
                      />
                    </Box>

                    <Box my={2} style={{ textAlign: 'center'}}>
                      <Button
                        color="primary"
                        onClick={isSubmitting}
                        halfWidth
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
                 <Modal
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                   
                  >
                    <div style={{  position: 'absolute', width: 700,  backgroundColor: "white", left: "40%", top: "30%", marginLeft: "-150px",marginTop: "-150px"}}>   
                    <img src="https://image.freepik.com/free-vector/success-vector-illustration_1893-2234.jpg" style={{borderRadius: "8px" ,width: "100%",height: "auto"}}/>
                        <p id="simple-modal-description">
                        <div style={{ display:"flex", padding:"10px" }}>
                          <Typography varient="h5" component="h5" style={{fontSize:"18px",justifyContent: 'center', flex:'center'}}>
                             Congratulations certificate generated and email sent successfully !!!!
                            
                                </Typography> 
                          </div>
                              <br></br>
                        </p>
                      
                  

                  <Link
                      component={RouterLink}
                      to="/app/dashboard"
                      variant="h6"
                    >
                      <Box my={2} style={{ textAlign: 'center'}}>
                      <Button
                        color="secondary"
                        halfWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Close
                      </Button>
                    </Box>
                  </Link>
                  </div>

                  </Modal>
        </Container>
      </Page>
    );
  }
}