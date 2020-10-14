import React from 'react'
import Coin from './Coin'

const Coins = ({coins}) => {

    return (
        <div className='Coins-container'>
            <h2 className='Coins-summary'>Here are the current top 100 coins</h2>
            <div className='Coins'>
            {coins.map((coin) => 
                <Coin key={coin.id} coin={coin} />
            )}
            </div>
        </div>
    )
}

export default Coins