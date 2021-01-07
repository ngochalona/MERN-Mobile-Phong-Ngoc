import React, { useState } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import { saveShippingAddress } from '../actions/cartActions'

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  //const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveShippingAddress({ address, city, country }))
    history.push('/payment')
  }

  return (
    <Container>
        <Row className='justify-content-md-center'>
            <Col xs={12} md={6}>
              <CheckoutSteps step1 step2 />
              <h1>Shipping</h1>
              <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                  <Form.Label>Địa chỉ</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nhập địa chỉ'
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                  <Form.Label>Quận/Huyện</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nhập Quận/Huyện'
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                {/* <Form.Group controlId='postalCode'>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Enter postal code'
                    value={postalCode}
                    required
                    onChange={(e) => setPostalCode(e.target.value)}
                  ></Form.Control>
                </Form.Group> */}

                <Form.Group controlId='country'>
                  <Form.Label>Tỉnh</Form.Label>
                  <Form.Control
                    type='text'
                    placeholder='Nhập tỉnh'
                    value={country}
                    required
                    onChange={(e) => setCountry(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='danger'>
                  Tiếp tục
                </Button>
              </Form>
            </Col>
        </Row>
    </Container>
  )
}

export default ShippingScreen