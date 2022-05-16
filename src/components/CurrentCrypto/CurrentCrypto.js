import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CurrentCrypto = ({ coin, coinInterval }) => {
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
        <>
          <div>
            <h1>{`${coin.name} = ${coin.toUSD} USD = ${coin.toAnotherCoin} ${coin.coin === "btc" ? "ETH" : "BTC"}`}</h1>
          </div>
          <div>
            <label>
              {coin.name}
              <input type="number" value={userAmount} onChange={e => setUserAmount(e.target.value)}></input>
            </label>
            <span> = {userAmount * coin.toUSD} USD </span>
            <span>= {userAmount * coin.toAnotherCoin} {coin.coin === "btc" ? "ETH" : "BTC"}</span>
          </div>
          <LineChart width={730} height={250} data={graphData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="coin" name={coin.coin} stroke="#8884d8" dot={{ stroke: 'black  ', strokeWidth: 2 }} activeDot={{ r: 6 }} />
          </LineChart>
        </>
      ) : "данные загружаются"
      }
    </>
  );
};

export default CurrentCrypto;