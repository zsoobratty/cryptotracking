import React from 'react'

const Coin = ({coin}) => {
    const { name, symbol, current_price, image, market_cap_rank } = coin
    return (
        <div className='Coin'>
            <h1>{market_cap_rank}</h1>
            <img src={image} alt={name} width="50px" height="50px"/>
            <h2>{name}</h2> 
            <h3>{symbol.toUpperCase()}</h3>
            <h3>${current_price}</h3>
        </div>
    )
}

export default Coin
