import React from 'react'
import { useParams } from 'react-router-dom'

const CoinDetails = ({setParams, coinData}) => {
    const params = useParams()
    setParams(params.id)

    return (
        <div className='CoinDetails'>
            {coinData ? (
                <div>
                    <h1>Market Rank {coinData.market_cap_rank}</h1>
                    <h2>{coinData.name} - {coinData && coinData.symbol ? coinData.symbol.toUpperCase() : null}</h2>
                    <img src={coinData && coinData.image ? coinData.image.large : null} alt={coinData.name}/>
                    <h3 style={{color: "green"}}>| 24H High: ${coinData && coinData.market_data ? coinData.market_data.high_24h.usd : null} | <span style={{color: "red"}}> | 24H Low: ${coinData && coinData.market_data ? coinData.market_data.low_24h.usd : null} |</span></h3>
                    <h3>{coinData && coinData.description ? coinData.description.en : null }</h3>    

                </div>
            ) : (
                <div>
                    <h1>This coin doesn't exist</h1>
                </div>
            )}
        </div>
    )
}

export default CoinDetails
