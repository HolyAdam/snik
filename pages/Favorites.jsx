import React from "react"

import { AppContext } from "../App"

import Card from "../components/Card"

const Favorites = ({ onAddFavorite }) => {

    const { favorites } = React.useContext(AppContext)

    console.log('КОНТЕКСТ ФЭЙВОРИТ')

    return (
        <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 className="content__title">
            Избранное
          </h1>
          
        </div>
        <div className="snickers d-flex flex-wrap">
        
        {
          favorites
            .map((obj) => (
              <Card 
                favorited={true}
                key={obj.imgUrl}
                title={obj.name} 
                price={obj.price} 
                imgUrl={obj.imgUrl}
                onAddFavorite={onAddFavorite}
                id={obj.id}
              />
          ))
        }

        
        </div>
      </div>
    )
}

export default Favorites