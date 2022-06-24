import axios from "axios"
import React from "react"

import { AppContext } from "../App"

import Card from "../components/Card"

const Orders = () => {

    const [orders, setOrders] = React.useState([])
    const { onAddToCart, onAddFavorite} = React.useContext(AppContext)
    const [isLoading, setIsLoading] = React.useState(false)


    React.useEffect(() => {
      (async () => {
        try {
          setIsLoading(true)
          const { data } = await axios.get('https://6295fd44810c00c1cb6cd51d.mockapi.io/orders')
          setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []))
          setIsLoading(false)
        } catch(e) {
          alert('Ошибка при запросе о заказах')
        }
      })()

    }, [])

    return (
        <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 className="content__title">
            Мои заказы
          </h1>
          
        </div>
        <div className="snickers d-flex flex-wrap">
        {
          (
            isLoading 
              ? [...Array(8)]
              : orders
          )
            .map((obj, index) => (
              <Card 
                key={index}
                title={obj?.name} 
                price={obj?.price} 
                id={obj?.id}
                imgUrl={obj?.imgUrl}
                onAddBtnClick={() => alert(obj)}
                loading={isLoading}
              />
          ))
        }

        
        </div>
      </div>
    )
}

export default Orders