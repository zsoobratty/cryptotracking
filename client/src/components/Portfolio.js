import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Coin from './Coin'

const Portfolio = () => {

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
            <h1>My Portfolio:</h1>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                trackedCoins.map(coin => {
                    return <Coin key={coin._id} coin={coin}/>
                })
            )}
        </div>
    )
}

export default Portfolio
