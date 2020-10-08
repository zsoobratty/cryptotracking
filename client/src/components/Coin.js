import React from 'react'

const Coin = ({coin}) => {
    const { name, symbol, current_price, image } = coin
    return (
        <div className='Coin'>
            <img src={image} alt={name} width="50px" height="50px"/>
            <h2>{name}</h2> 
            <h3>{symbol.toUpperCase()}</h3>
            <h3>${current_price}</h3>
        </div>
    )
}

export default Coin
