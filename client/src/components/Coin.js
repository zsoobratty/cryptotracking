import axios from 'axios'
import React, {useState} from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import UserContext from '../context/UserContext'

const Coin = ({coin}) => {
    const {userData} = useContext(UserContext)
    const history = useHistory()

    const [coinDetails, setCoinDetails] = useState([])
    const { name, symbol, current_price, image, market_cap_rank, holding } = coin


    
    useEffect(() => {
        if(holding) {
                const fetchData = async () => {
                    const coinInfo = await axios.get(`https://api.coingecko.com/api/v3/coins/${name}`)
                    if(coinInfo.data) {
                        setCoinDetails(coinInfo.data)
                        axios.patch(`/mycoins/${coinInfo.data.id}`, {
                            currentPrice: coinInfo.data.market_data.current_price.usd
                        },
                        {headers: {
                            'Authorization': userData.token
                        }})
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
                    <button onClick={() => history.push(`/coin/${name.toLowerCase()}`)}>Find out more</button>
                </div>
            ) : (
            <div>
                <h1>{market_cap_rank}</h1>
                <img src={image} alt={name} width="50px" height="50px"/>
                <h2>{name}</h2> 
                <h3>{symbol.toUpperCase()}</h3>
                <h3>${current_price}</h3>
                <button onClick={() => history.push(`/coin/${name.toLowerCase()}`)}>Find out more</button>
            </div>
            )}
        </div>
    )
}

export default Coin
