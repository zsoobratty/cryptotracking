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
    },[])

    return (
        <div>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                <h1>My Portfolio:</h1>
                <h2>Value of holdings: {trackedCoins.forEach((coin) => {
                    portfolioValue += (coin.currentPrice * coin.holding)
                })} 
                ${portfolioValue.toFixed(2)}</h2>
                <div className='Portfolio'>
                {trackedCoins.map(coin => {
                    return <Coin key={coin._id} coin={coin} />
                })}
                </div>
                </div>
            )}
        </div>
    )
    
}

export default Portfolio
