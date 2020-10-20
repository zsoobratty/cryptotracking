import axios from 'axios'
import React, {useState} from 'react'
import { useEffect } from 'react'

const Coin = ({coin}) => {
    const [coinDetails, setCoinDetails] = useState([])
    const { name, symbol, current_price, image, market_cap_rank, holding } = coin
    
    useEffect(() => {
        if(coin.holding) {
                const fetchData = async () => {
                    const coinInfo = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}`)
                    if(coinInfo.data) {
                        console.log(coinInfo.data)
                        setCoinDetails(coinInfo.data)
                    } else {
                        console.log('No coin under this name')
                    }
                }
                fetchData()
        }
    }, [])


    return (
        <div className='Coin'>
            {holding ? (
                <div>
                    <h1>{coinDetails.name}</h1>
                    <img src={coinDetails && coinDetails.image ? coinDetails.image.small : null } alt=""/>
                    <h3>Amount held: {holding} {symbol.toUpperCase()}</h3>
                    <h3>Total: ${(holding * ( coinDetails.market_data && coinDetails ? coinDetails.market_data.current_price.usd : null)).toFixed(2) }</h3>
                </div>
            ) : (
            <div>
                <h1>{market_cap_rank}</h1>
                <img src={image} alt={name} width="50px" height="50px"/>
                <h2>{name}</h2> 
                <h3>{symbol.toUpperCase()}</h3>
                <h3>${current_price}</h3>
            </div>
            )}
        </div>
    )
}

export default Coin
