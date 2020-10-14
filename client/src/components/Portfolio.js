import React, {useState, useEffect, useContext} from 'react'
import axios from 'axios'

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
            console.log(portfolio.data)
            if(portfolio.data) {
                setTrackedCoins(portfolio.data.myCoins)
                setLoading(false)
            }
        }
        fetchData()
    },[])

    return (
        <div>
            This is my Portfolio page
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                trackedCoins.map(coin => {
                    return <li>{coin.name}</li>
                })
            )}
        </div>
    )
}

export default Portfolio
