import React from 'react'

const Coin = ({coin}) => {
    const { name, symbol, current_price } = coin
    return (
        <div className='coin-container'>
            <h2>{name} - {symbol.toUpperCase()}</h2>
            <h3>${current_price}</h3>
        </div>
    )
}

export default Coin
