import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import Home from './views/Home'
import Product from './views/Product'
import Cart from './views/Cart'
import Login from './views/Login'
import Register from './views/Register'
import Profile from './views/Profile'
import Shipping from './views/Shipping'
import Payment from './views/Payment'
import PlaceOrder from './views/PlaceOrder'
import Order from './views/Order'
import UserList from './views/UserList'
import UserEdit from './views/UserEdit'
import ProductList from './views/ProductList'
import ProductEdit from './views/ProductEdit'
import ProductCreate from './views/ProductCreate'
import OrderList from './views/OrderList'

const App = () => {
  return (
    <div>
      <Router>
        <Header></Header>
        <main className="py-3">
          <Container>
            {/* Điều hướng đến và nạp component vào trang */}
            <Route path='/' component={Home} exact />
            <Route path='/product/:id' component={Product} />
            <Route path='/shipping' component={Shipping} />
            <Route path='/payment' component={Payment} />
            <Route path='/placeOrder' component={PlaceOrder} />
            <Route path='/login' component={Login}/>
            <Route path='/profile' component={Profile} />
            <Route path='/register' component={Register} />
            <Route path='/cart/:id?' component={Cart} />
            <Route path='/admin/userlist' component={UserList} />
            <Route path='/admin/user/:id/edit' component={UserEdit} />
            <Route path='/order/:id?' component={Order}/>
            <Route path='/admin/productlist' component={ProductList} />
            <Route path='/admin/product/:id/edit' component={ProductEdit} />
            <Route path='/admin/product/create' component={ProductCreate} />
            <Route path='/admin/orderlist' component={OrderList} />
            <Route path='/search/:keyword' component={Home} exact />
          </Container>
          
        </main>
        <Footer></Footer>
      </Router>
      
    </div>
  )
}

export default App


