import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'

const Portfolio = () => {
    let portfolioValue = 0
    const [trackedCoins, setTrackedCoins] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            const portfolio = await axios.get('/mycoins', {
                headers: {
                    "Authorization": localStorage.getItem('token')
                }
            })
            if(portfolio.data) {
                setTrackedCoins(portfolio.data.myCoins)
                setLoading(false)
            }
        }
        fetchData()
    },[trackedCoins])

    const totalValue = () => {
        trackedCoins.forEach((coin) => {
            portfolioValue += (coin.currentPrice * coin.holding)
        })
        return portfolioValue.toFixed(2)
    }

    return (
        <div className='Portfolio-container'>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                <h1>My Portfolio:</h1>
                {trackedCoins.length > 0 ? (
                    <div>
                    <h2>Value of holdings: ${totalValue()}</h2>
                    <div className='Portfolio'>
                    {trackedCoins.map(coin => {
                        return <Coin key={coin._id} coin={coin} />
                    })}
                    </div>
                    </div>
                ) : (
                    <h1>You haven't added any coins to your portfolio yet!</h1>
                )}
                </div>
            )}
        </div>
    )
    
}

export default Portfolio
