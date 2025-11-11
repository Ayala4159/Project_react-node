import './App.css';
import {BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Register from './components/layout/User/register';
import Login from './components/layout/User/login';
import Header from './components/header/header';
import Categories from './components/header/categories';
import Basket from './components/layout/basket/basket';
import Products from './components/layout/Product/products';
import Product from './components/layout/Product/product';
import CategoriesList from './components/layout/Product/categoriesList';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import userSlice from './redux/userSlice';
import HomePage from './components/layout/homePage';
const myStore =configureStore({
  reducer:{
    userSlice
  }
})

function App() {
  return (
    <Provider store={myStore}>
    <div className="App">
    <Router>
      <Routes>
      <Route path="/" element={<Header><Categories/><HomePage/></Header>}></Route>
          <Route path="/login" element={<Header><Login/></Header>}></Route>
          <Route path="/basket" element={<Header><Categories/><Basket/></Header>}></Route>
          <Route path="/categories" element={<Header><Categories/></Header>}></Route>
          <Route path="/categoriesList/:name" element={<Header><Categories/><CategoriesList/></Header>}></Route>
          <Route path="/products" element={<Header><Categories/><Products/></Header>}></Route>
          <Route path="/:_id" element={<Header><Categories/><Product/></Header>}></Route>
          <Route path="/register" element={<Header><Register/></Header>}></Route>
      </Routes>
    </Router>
    </div>
    </Provider>
  )
}

export default App;