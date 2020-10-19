import React, {useContext} from 'react'
import CoinContext from '../context/CoinContext'

const CoinDetails = () => {
    const {coinData} = useContext(CoinContext)
    console.log(coinData)
    return (
        <div>
            <h1>Hello CoinDetails</h1>
            <h2>{coinData.name} - {coinData.symbol}</h2>
        </div>
    )
}

export default CoinDetails
