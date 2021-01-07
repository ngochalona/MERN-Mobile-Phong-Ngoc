import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'
import FacebookLogin from 'react-facebook-login';
import Cookies from 'js-cookie'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const responseSuccessGoogle =  (res) => {
    console.log(res);
    const data = {
      email: res.profileObj.email,
      name: res.profileObj.name,
      google_id: res.profileObj.googleId,
      token: res.tokenId,
    }
    //dispatch(provideGoogle(data))
    axios({
      method: "post",
      url: "http://localhost:8080/auth/google",
      data: data,
    }).then(response => {
      var expTime = new Date(new Date().getTime() + 3 * 60 * 1000);
      Cookies.set('userInfo', data.token, { expires: expTime })
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      window.location.reload()
      history.push('/')
    }).catch(() => alert("Account is inActive"))
  }

  const responseFacebook = (res) => {
    // console.log(res);
    const data = {
      email: res.email,
      name: res.name,
      facebook_id: res.id,
      token: res.signedRequest
    }
    axios({
      method: "post",
      url: "http://localhost:8080/auth/facebook",
      data: data,
    }).then(response => {
      var expTime = new Date(new Date().getTime() + 3 * 60 * 1000);
      Cookies.set('userInfo', data.token, { expires: expTime })
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      window.location.reload()
      history.push('/')
    }).catch(() => alert("Account is inActive"))
  }

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
                <h1>Sign In</h1>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                    </Form.Group>

                    <Button style={{float:"right"}} type='submit' variant='success'>
                    Sign In
                    </Button>
                </Form>

                <Row className='py-3'>
                    <Col>
                    New Customer?{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                    </Link>
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row className='justify-content-md-center'>
        <GoogleLogin
            //style = {{ backgroundColor: 'red' }}
            clientId="356264430308-t7a6div7hkueet4f55e1t1lplfhq0vhu.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseSuccessGoogle}
            // onFailure={responseErrorGoogle}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button onClick={renderProps.onClick} 
              style={{ backgroundColor: "#d73d32",  
              fontFamily: 'Helvetica,sans-serif',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: 'calc(.27548vw + 12.71074px)',
              border: 'calc(.06887vw + .67769px) solid #d73d32',
              padding: 'calc(.34435vw + 13.38843px) calc(.34435vw + 18.38843px)',
              width: '23%',
              marginTop: '20px',
              marginBottom: '10px'
            
            }}>LOGIN GOOGLE</button>
          )}
          
          />
        </Row>

        <Row className='justify-content-md-center'>
            <FacebookLogin
            appId="192275745894926"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook} 
  
            />
        </Row>
    </Container>
  )
}

export default LoginScreen