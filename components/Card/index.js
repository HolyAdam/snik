import React from 'react'
import ContentLoader from 'react-content-loader'

import { AppContext } from "../../App";

import styles from './Card.module.scss'

const Card = ({ id, imgUrl, title, price, onAddFavorite, onPlus, favorited = false, added = false, loading = false, parentId }) => {

    const { isItemAdded } = React.useContext(AppContext)


    const [isFavorite, setIsFavorite] = React.useState(favorited)

    const onFavoriteClick = () => {
        setIsFavorite(!isFavorite)
        onAddFavorite({ id, name: title, imgUrl, price })
    }
    

    const onClickAdd = () => {
        onPlus({ id, name: title, imgUrl, price, parentId: id })
    }

    return (
        <div className={styles.card}>

            {
                loading ? <ContentLoader 
                speed={2}
                width={165}
                height={270}
                viewBox="0 0 150 270"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="16" rx="2" ry="2" width="150" height="155" /> 
                <rect x="0" y="188" rx="0" ry="0" width="150" height="15" /> 
                <rect x="0" y="210" rx="0" ry="0" width="90" height="15" /> 
                <rect x="0" y="239" rx="0" ry="0" width="80" height="27" /> 
                <circle cx="136" cy="253" r="14" />
            </ContentLoader> : <>
                { onAddFavorite && <div className={styles.favorite} onClick={onFavoriteClick}>
                    <img src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"} alt="Иконка избранное" />
                </div> }
                <img width={133} height={112} src={imgUrl} alt="Кроссовки модели один" />
                <h5 className="mb-20">{title}</h5>
                <div className="card-info d-flex justify-between align-center">
                    <div className="d-flex flex-column">
                    <span>Цена</span>
                    <strong>{price} руб.</strong>
                    </div>
                    {
                        onPlus && <img 
                        className={styles.plus} 
                        onClick={onClickAdd} 
                        src={isItemAdded(id) ? "img/button-added.svg" : "img/button-add.svg"} 
                        alt="Иконка добавить"
                    />
                    }
                </div>
            </>
            }
        </div>
    )
}

export default Card