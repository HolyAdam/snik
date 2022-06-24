import React from 'react'

import { useCart } from '../hooks/useCart'

import { Link } from 'react-router-dom'

const Header = (props) => {

    const {totalPrice} = useCart()

    return (
        <header className="header d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="headerLeft d-flex align-center">
                    <img width={40} height={40} src="/img/logo.png" alt="Логотип" />
                    <div className="headerInfo">
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>

            <ul className="d-flex">
            <li className="mr-20 cu-p" onClick={props.onCartClick}>
                <img className="mr-10" width={18} height={18} src="/img/cart.svg" alt="Иконка корзины" />
                <span>{totalPrice} руб.</span>
            </li>
            <li className="mr-20 cu-p">
                <Link to="/favorites">
                    <img width={18} height={18} src="/img/favorite-prof.svg" alt="Иконка любимых" />
                </Link>
            </li>
            <li>
                <Link to="/orders">
                    <img width={18} height={18} src="/img/user.svg" alt="Иконка пользователя" />
                </Link>
            </li>
        </ul>
      </header>
    )
}

export default Header