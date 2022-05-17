import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import "./CryptoConverter.css";

const CryptoConverter = ({ coin, coinInterval }) => {
  const [userAmount, setUserAmount] = useState(null);

  function getDate(prop) {
    const fullDate = new Date(prop * 1)
    const day = fullDate.getDate()
    const month = fullDate.getMonth() + 1
    return `${day}/${month}`
  }

  const graphData = coinInterval?.map(el => {
    return {
      date: getDate(el[0]), coin: el[1].toFixed(2)
    }
  })

  return (
    <>
      {coin ? (
        <div className='converter'>
          <div className='coinInfo'>
            <h2>{coin.name}</h2>
            <h1>{`1 ${coin.name} = ${coin.toUSD} USD = ${coin.toAnotherCoin} ${coin.coin === "btc" ? "ETH" : "BTC"}`}</h1>
            <div className='coinInfo__exchange'>
              <label>
                {coin.name}
                <input type="number" value={userAmount} onChange={e => setUserAmount(e.target.value)}></input>
              </label>
              <span> = {(userAmount * coin.toUSD).toFixed(2)} USD </span>
              <span>= {(userAmount * coin.toAnotherCoin).toFixed(2)} {coin.coin === "btc" ? "ETH" : "BTC"}</span>
            </div>
          </div>
          <div className="coinInterval">
            <LineChart width={730} height={250} data={graphData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="coin" name={coin.coin} stroke="#8884d8" dot={{ stroke: 'black  ', strokeWidth: 2 }} activeDot={{ r: 6 }} />
            </LineChart>
          </div>
        </div>
      ) : "Данные загружаются"
      }
    </>
  );
};

export default CryptoConverter;