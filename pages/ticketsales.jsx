import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState';

const ticketsales = () => {
    const [totalAmounts, setTotalAmounts] = useState([]);
    const [startDate, setStartDate] = useState('');
    const { state, dispatch } = useContext(DataContext)
    const { auth } = state
    const [endDate, setEndDate] = useState('');
    const [totalWinningAmount, setTotalWinningAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [totalWinningAmountBarcode, setTotalWinningAmountBarcode] = useState(0);

    useEffect(() => {
        const fetchBetsTotal = async () => {
            const { data } = await axios.get(`/api/totalbets?start=${startDate}&end=${endDate}`);
            setTotalAmounts(data.betDetails);
        };
        const fetchBarcodesTotal = async () => {
            const { data } = await axios.get(`/api/barcodestotal?start=${startDate}&end=${endDate}`);
            setTotalWinningAmountBarcode((prevTotalAmounts) => [...prevTotalAmounts, ...data.totalAmount]);
        };

        fetchBetsTotal();
        fetchBarcodesTotal();
    }, [startDate, endDate]);

    const [userName, setUserName] = useState("");

    useEffect(() => {
        if (auth && auth.user && auth.user.userName) {
            setUserName(auth.user.userName);
        }
        console.log(userName, "this is my user bitch")
    }, [auth]);

    useEffect(() => {
          if (userName) {
               axios.get(`/api/user/balance?userName=${userName}`)
                    .then(response => {
                         setBalance(response.data.balance)

                         console.log("trying to fetch balance", balance)
                    })
                    .catch(error => console.error(error))
          }
     }, [userName])

    useEffect(() => {
        const totalWinningAmount = totalAmounts.reduce((total, bet) => {
            return total + bet.totalAmount;
        }, 0);
        setTotalWinningAmount(totalWinningAmount);
    }, [totalAmounts]);

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };
    return (
        <div>
            <div className='mt-[5%] absolute'>
                <label>
                    Start Date:
                    <input type="date" value={startDate} onChange={handleStartDateChange} />
                </label>
                <label>
                    End Date:
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                </label>
                <table className='mt-5'>
                    <thead>

                    </thead>
                    <tbody>
                        {/* {totalAmounts.map((bet, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bet.totalAmount}</td>
              <td>{new Date(bet.createdAt).toLocaleString()}</td>
            </tr>
          ))} */}
                    </tbody>
                    <tfoot>
                        <tr className='font-bold flex'>
                            <td></td>
                            <td>Sale Points: {totalWinningAmount}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Winning Points: {totalWinningAmountBarcode}</td>
                        </tr>
                        <tr>
                            <td className='font-bold'>Operator Points :{balance}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>


        </div>
    )
}

export default ticketsales





