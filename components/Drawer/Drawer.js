import React from "react"
import axios from 'axios'

import Info from "../Info"
import { useCart } from "../../hooks/useCart"

import styles from './Drawer.module.scss'


const Drawer = ({ items = [], onClose, onRemoveItem, onClickOverlay, opened }) => {

    const {cartItems, setCartItems, totalPrice} = useCart()
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const delay = (ms) => new Promise(resolve => {
      setTimeout(resolve, ms)
    })


    const onClickOrder = async () => {
      try {
        setIsLoading(true)
        const { data } = await axios.post('https://6295fd44810c00c1cb6cd51d.mockapi.io/orders', {
          items: cartItems
        })
        setOrderId(data.id)
        setIsOrderCompleted(true)
        setCartItems([])


        for (let i = 0; i < cartItems.length; i++) {
          await axios.delete('https://6295fd44810c00c1cb6cd51d.mockapi.io/cart/' + cartItems[i].id)
          await delay(1000)
        }

      } catch(e) {
        alert('Ошибка')
      }
      setIsLoading(false)
    }

    return (
    <div className={`${styles.overlay} ${opened ? styles.activated : ''}`} onClick={onClickOverlay}>
        <div className={`${styles.drawerBlock} d-flex flex-column`}>
          <h3 className="d-flex justify-between mb-30">
            Корзина
            <img className="cu-p" src="img/button-remove.svg" alt="Закрыть" onClick={onClose} />
          </h3>

          {
            items.length > 0
              ? (
                <>
                <div className="drawerTop flex">


          <div className="items">
          {
            items.map((obj, index) => (
              <div key={index} className="cartItem d-flex align-center mb-20">
                <div className="cartItemImg mr-20" style={{
                  width: 68, 
                  height: 68, 
                  backgroundImage: `url(${obj.imgUrl})`,
                  backgroundSize: 'contain',
                  backgroundPosition: '0 -5px',
                  backgroundRepeat: 'no-repeat'
                }}></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.name}</p>
                  <strong>{obj.price} руб.</strong>
                </div>
                <img onClick={() => onRemoveItem(obj.parentId)} className="removeBtn" src="/img/button-remove.svg" alt="Remove" />
              </div>
            ))
          }

          
          </div>
          </div>

          <div className="drawerBottom">
          <ul className="cartTotalBlock">
            <li className="d-flex">
              <span>Итого</span>
              <div></div>
              <b>{totalPrice} руб.</b>
            </li>
            <li className="d-flex">
              <span>Налог 5%</span>
              <div></div>
              <b>{(totalPrice * 0.05).toFixed(2)} руб.</b>
            </li>
          </ul>
          <button disabled={isLoading} className="greenBtn" onClick={onClickOrder}>
            Оформить заказ
            <img src="img/arrow.svg" alt="Стрелка" />
          </button>
          </div>
        </>
              )
          : (
            <Info title={isOrderCompleted ? `Спасибо за заказ. Ваш номер #${orderId}` : "Корзина пуста"} /> 
            
          )
          }


          
        </div>

    </div>

    )
}

export default Drawer