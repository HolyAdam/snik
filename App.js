import React from "react";
import axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import Drawer from "./components/Drawer/Drawer";
import Header from "./components/Header";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext()

function App() {

  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchVal, setSearchVal] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const [cartOpened, setCartOpened] = React.useState(false)

  const onAddToCart = async (obj) => {

    const currentAdded = cartItems.find(item => +item.parentId === +obj.id)

    try {
      if (currentAdded) {
        axios.delete('https://6295fd44810c00c1cb6cd51d.mockapi.io/cart/' + currentAdded.id)
        setCartItems(prevState => prevState.filter(cart => +cart.parentId !== +obj.id))
      } else {
          setCartItems(prevState => [...prevState, obj])
          const {data} = await axios.post('https://6295fd44810c00c1cb6cd51d.mockapi.io/cart', obj)
          setCartItems(prevState => prevState.map(item => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              }
            }
            return item
          }))
      }
    } catch(e) {
      alert('Не удалось сделать операцию в корзине')
    }
  }

  const onChangeSearchInput = e => {
    setSearchVal(e.target.value)
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete('https://6295fd44810c00c1cb6cd51d.mockapi.io/cart/' + id)
      setCartItems(prevState => prevState.filter(item => +item.parentId !== +id))
    } catch(e) {
      alert('Ошибка при удалении из корзины')
    }

  }

  const onAddFavorite = (obj) => {

    const currentFavorite = favorites.find(item => +item.id === +obj.id)

    try {
      if (currentFavorite) {
        axios.delete('https://6295fd44810c00c1cb6cd51d.mockapi.io/favorites/' + obj.id)
        setFavorites(prevState => prevState.filter(item => +item.id !== +obj.id))
      } else {
        axios.post('https://6295fd44810c00c1cb6cd51d.mockapi.io/favorites', obj)
          .then(({ data }) => {
            setFavorites(prevState => [...prevState, data])
          })
      }
    } catch(e) {
      alert('Не удалось добавить в избранное')
    }

  }

  const onClickOverlay = e => {
    if (e.target.classList.contains('overlay')) {
      setCartOpened(false)
    }
  }
  

  const onClearInput = () => {
    setSearchVal('')
  }

  React.useEffect(() => {
    async function fetchData() {

      try {
        setIsLoading(true)

        const resp = await fetch('https://6295fd44810c00c1cb6cd51d.mockapi.io/items')

        const [data, resCart, resFavorites] = await Promise.all([
          resp.json(),
          axios.get('https://6295fd44810c00c1cb6cd51d.mockapi.io/cart'), 
          axios.get('https://6295fd44810c00c1cb6cd51d.mockapi.io/favorites')
        ])



        setCartItems(resCart.data)
        setFavorites(resFavorites.data)
        setItems(data)
        setIsLoading(false)

      } catch(e) {
        alert('Ошибка!')
      }


    }

    fetchData()
  }, [])

  const isItemAdded = (id) => {
    return cartItems.some(cartItem => +cartItem.parentId === +id)
  }

  return (
    <AppContext.Provider value={{ items, cartItems, favorites, isItemAdded, setCartOpened, setCartItems, onAddToCart }}>
      <div className="wrapper clear">

        <div>
          <Drawer items={cartItems} onRemoveItem={onRemoveItem} onClose={() => setCartOpened(false)} onClickOverlay={onClickOverlay} opened={cartOpened} />
        </div>



        <Header onCartClick={() => setCartOpened(true)} />

        <Routes>
          <Route path="/" element={<Home
            items={items}
            cartItems={cartItems}
            searchVal={searchVal}
            onAddFavorite={onAddFavorite}
            onAddToCart={onAddToCart}
            onClearInput={onClearInput}
            onChangeSearchInput={onChangeSearchInput}
            isLoading={isLoading}
          />} />
          <Route path="/favorites" element={<Favorites
              onAddFavorite={onAddFavorite}
            />} />
            <Route path="/orders" element={<Orders
              
            />} />
          </Routes>

        </div>
    </AppContext.Provider>
  );
}

export default App;
