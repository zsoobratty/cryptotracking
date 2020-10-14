import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'

const Coins = ({coins}) => {

    console.log(coins)

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