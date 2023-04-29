import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

function gamehistory() {

    const [totalAmounts, setTotalAmounts] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [totalWinningAmount, setTotalWinningAmount] = useState(0);
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
        <div className='ml-auto mt-[50px]  bg-cyan-300 mr-auto text-center h-[500px] w-[1000px]'>
            <div className='absolute  mt-[10px] ml-[430px] w-[150px] h-[30px]  bg-green-800 rounded-lg items-center]'>
                <Link href='/rules'>
                    <h1 className='text-white font-bold'>Rules</h1>
                </Link>
            </div>
            <div className='absolute   mt-[10px] ml-[200px] w-[150px] h-[30px]  bg-green-800 rounded-lg items-center]'>
                <Link href='/gamehistory'>
                    <h1 className='text-gray-300 hover:text-white font-bold'>Game History</h1>
                </Link>
            </div>
            <Link href='/bet'>
                <div className='absolute rounded-full text-white font-bold pt-[5px] bg-green-800 w-[40px] ml-[950px]  h-[40px] items-center]'>
                    X
                </div>
            </Link>
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
                            <td className='font-bold'>Operator Points :{`balance`}</td>
                        </tr>
                    </tfoot>
                </table>
                <div className='bg-black rounded-lg mt-5 w-[30%] ml-5'>
                <button className='text-white'>Print</button>

                </div>
            </div>
            {/* <table className="table-auto ml-[10%] bg-white absolute mt-[5%]">
      <thead>
        <tr>
          <th className="px-4 py-2">Sale Points / Total Amount</th>
          <th className="px-4 py-2">Win Points / Winning Amount</th>
          <th className="px-4 py-2">Operator Points / Remaining Balance</th>
        </tr>
      </thead>
      <tbody>
     
      </tbody>
    </table> */}
        </div>
    )
}

export default gamehistory