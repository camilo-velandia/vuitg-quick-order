import React, { useState, useEffect } from 'react';
import {useMutation, useLazyQuery } from 'react-apollo'
import UPDATE_CART from '../graphql/updateCart.graphql'
import GET_PRODUCT from '../graphql/getProductBySku.graphql'

const QuickOrder = () => {

  const [inputText, setInputText] = useState('')
  const [search, setSearch] = useState('')
  const [addToCart] = useMutation(UPDATE_CART)
  const [getProductData, {data: product}] = useLazyQuery(GET_PRODUCT)

  const handleChange = (event:any) =>{
    setInputText(event.target.value)
  }

  useEffect(() => {
    if(product){
      let skuId = parseInt(inputText)
      addToCart({
        variables:{
          salesChannel:"1",
          items:[{
            id: skuId,
            quantity: 1,
            seller:"1"
          }]
        }
      })
      .then(()=>{
        window.location.href = '/checkout'
      })
    }

}, [product, search])


  const addProductToCart=()=>{
      getProductData({
        variables:{
          sku: inputText
        }
      })
  }
  const searchProduct = (event:any) => {
    event.preventDefault()
    if(!inputText){
      alert('ingrese el numero de producto')
    }else{
      setSearch(inputText)
      addProductToCart()
    }
  }




  return (
    <div>
      <h2>compra rapida</h2>
      <form onSubmit={searchProduct}>
        <div>
        <label htmlFor="sku">imgres el numero de sku</label>
        <input type="text" name="sku" id="sku" onChange={handleChange} />
        </div>
        <input type="submit" value="anadir al carrito" />
      </form>
    </div>
  );
};

export default QuickOrder;
