import React, { useEffect} from 'react'
import { connect, useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions.js'


const Home = ({match}) => {

    const keyword = match.params.keyword

    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList

    
    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            <h1>Sản phẩm mới nhất</h1>
            { loading ? 
            (<Loader></Loader>) 
            : error ? ( <Message variant="danger">{error}</Message>) 
            : <div>
                {
                    //typeof products.products !== 'undefined' && products.products.length > 0 ? 
                    typeof products !== 'undefined' && products.length > 0 ? 
                    <Row>
                    
                        {products.map((product) => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}

                    
                    </Row> : <h1>Hi</h1>
                }

</div>
            }
            
        </div>
    )
}

export default connect() (Home)
