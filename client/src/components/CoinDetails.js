import React, {useContext} from 'react'
import CoinContext from '../context/CoinContext'

const CoinDetails = () => {
    const {coinData} = useContext(CoinContext)
    console.log(coinData)
    return (
        <div className='CoinDetails'>
            <h2>{coinData.name} - {coinData && coinData.symbol ? coinData.symbol.toUpperCase() : null}</h2>
            <img src={coinData && coinData.image ? coinData.image.large : null}/>
            <h3>{coinData && coinData.description ? coinData.description.en : null }</h3>
        </div>
    )
}

export default CoinDetails
