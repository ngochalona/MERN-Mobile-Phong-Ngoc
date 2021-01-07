import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { Row, Col, Image, ListGroup, Button, Form } from 'react-bootstrap'
import {listProductDetails} from '../actions/productActions'

// Trang chi tiết sản phẩm
const Product = ({ history, match }) => { // match nhận pramas trên url

    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return (
        <div>
            {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>
            : (
                <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid></Image>
                    </Col>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Trạng thái: {product.countInStock > 0 ? 'Còn hàng' : 'Hết hàng'}
                            </ListGroup.Item>
                            {product.countInStock > 0 && (
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Qty</Col>
                                        <Col>
                                            <Form.Control as='select' value={qty} onChange={(e) =>
                                            setQty(e.target.value)}>
                                                
                                                {[...Array(product.countInStock).keys()].map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            )}
                            <ListGroup.Item>
                                Description: ${product.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                    <Button 
                                    onClick={addToCartHandler}
                                    variant='danger' 
                                    type='button' 
                                    disabled={product.countInStock === 0}>
                                        Thêm vào giỏ hàng
                                    </Button>
                                </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )    
        
            }
            
        </div>
    )
}

export default Product
