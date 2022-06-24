import React from 'react'
import { AppContext } from '../App'

export const Info = ({ title }) => {

    const { setCartOpened } = React.useContext(AppContext)

  return (
    <div>
        <p className="empty">{title}</p>
        <button onClick={() => setCartOpened(false)}>
            Закрыть корзину
        </button>

    </div>
  )
}

export default Info