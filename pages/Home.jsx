import React from "react";

import Card from "../components/Card";


const Home = ({ 
    items,
    searchVal,
    onAddFavorite,
    onAddToCart,
    onClearInput,
    onChangeSearchInput,
    isLoading
 }) => {
    
    const toLowerFn = items => items
      .filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase()))

    const renderItems = () => {
      return (
        isLoading 
          ? [...Array(8)]
          : toLowerFn(items)
      )
        .map((obj, index) => (
          <Card 
            key={index}
            title={obj?.name} 
            price={obj?.price}
            id={obj?.id} 
            imgUrl={obj?.imgUrl}
            onAddBtnClick={() => alert(obj)}
            onAddFavorite={onAddFavorite}
            onPlus={onAddToCart}
            loading={isLoading}
          />
      ))
    }

    return (
        <div className="content p-40">
        <div className="d-flex justify-between align-center mb-40">
          <h1 className="content__title">
            {searchVal ? `Поиск по запросу: ${searchVal}` : 'Все кроссовки'}
          </h1>
          <div className="search-block d-flex">
            <img src="img/search.svg" alt="Поиск" />
            {
              searchVal && <img onClick={onClearInput} className="clear cu-p" src="img/button-remove.svg" alt="Закрыть" />
            }

            <input type="text" placeholder="Поиск..." onChange={onChangeSearchInput} value={searchVal} />
          </div>
        </div>
        <div className="snickers d-flex flex-wrap">
        
        {
          renderItems()
        }

        
        </div>
      </div>
    )
}

export default Home