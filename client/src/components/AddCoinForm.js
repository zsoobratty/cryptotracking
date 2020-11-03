import Axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import UserContext from '../context/UserContext'


const AddCoinForm = ({coinDetails}) => {
    const {userData} = useContext(UserContext)
    const [amountHeld, setAmountHeld] = useState()
    const {id, symbol, current_price} = coinDetails

    const handleAddCoin = async (e) => {
        e.preventDefault()
        if (coinDetails.holding) {
            if (coinDetails.holding + parseInt(amountHeld) < 1) {
                await Axios.delete(`/mycoins/${coinDetails.name}`, {
                    headers: {
                        "Authorization": userData.token
                    }
                })
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
            } else {
                await Axios.patch(`/mycoins/${coinDetails.name}`, {
                    holding: parseInt(amountHeld)
                },
                { headers: {
                    "Authorization": userData.token
                }})
                .then(res => {
                    console.log(res)
                })
                .catch(err => {
                    console.log(err.message)
                })
            }
        } else {

        await Axios.post('/mycoins/add', {
            name: id,
            holding: parseInt(amountHeld),
            purchasePrice: current_price,
            currentPrice: current_price,
            symbol: symbol
        },
        { headers: {
            "Authorization": userData.token
        }})
        .then(res => {
            console.log(res, 'then')
        })
        .catch(err => {
            console.log(err.message, 'catch')
        })
        }
        setAmountHeld('')
    }

    return (
        <div className='AddCoinForm'>
            <form>
                <input 
                    type="number"
                    placeholder="Enter the amount you hold"
                    value={amountHeld}
                    onChange={(e) => setAmountHeld(e.target.value)}
                />
                <button onClick={handleAddCoin}>Submit</button>
            </form>

        </div>
    )
}

export default AddCoinForm
