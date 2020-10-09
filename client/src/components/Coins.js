import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'

const Coins = () => {
    const [coins, setCoins] = useState([])

    useEffect(() => {
        axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
        .then(res => {
            setCoins(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [])

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