import React, { useState } from 'react';
import BitcoinImg from "../../Images/bitcoin_logo.svg"
import EthereumImg from "../../Images/ethereum_logo.svg"
import { PieChart, Pie, Cell, Legend } from 'recharts';

const UserWallet = ({ BtcExchangeRate, EthExchangeRate }) => {
  const [userBtc, setUserBtc] = useState(0)
  const [userEth, setUserEth] = useState(0)
  const [coinСhoice, setCoinСhoice] = useState("Bitcoin")
  const [coinToBuy, setCoinToBuy] = useState(1)
  const totalPrice = coinСhoice === BtcExchangeRate?.name ? coinToBuy * BtcExchangeRate?.toUSD : coinToBuy * EthExchangeRate?.toUSD

  function submitBuyCoin() {
    if (coinСhoice === "Bitcoin") {
      setUserBtc(userBtc + coinToBuy)
    } else if (coinСhoice === "Ethereum") {
      setUserEth(userEth + coinToBuy)
    } else alert("Не выбрана криптовалюта")
  }

  function getCoinRatio() {
    const btc = userBtc * BtcExchangeRate?.toUSD;
    console.log(btc, "btc")
    const eth = userEth * EthExchangeRate?.toUSD;
    console.log(eth, "eth")
    const percent = (btc + eth) * 0.01;
    console.log(percent, "percent")
    return [{
      name: "BTC",
      value: Math.round(btc / percent)
    }, {
      name: "ETH",
      value: Math.round(eth / percent)
    }]
  }


  const graphData = getCoinRatio()
  console.log(graphData)
  return (
    <>
      <div>
        <h2>Мой кошелек</h2>
        <p>Bitcoin (BTC): {userBtc}</p>
        <p>Ethereum (ETH): {userEth}</p>
        <p>Общая стоимость: {((userBtc * BtcExchangeRate?.toUSD) + (userEth * EthExchangeRate?.toUSD)).toFixed(2)} USD</p>
      </div>
      <div>
        <PieChart width={500} height={250}>
          <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label  >
            <Cell key={graphData[0]} fill="orange" />
          </Pie>
          <Legend />
        </PieChart>
      </div>
      <div>
        <h2>Купить криптовалюту</h2>
        <div>
          <p>Выберите криптовалюту: {coinСhoice}</p>
          <button onClick={(e) => setCoinСhoice(e.target.name)}>
            <img name="Bitcoin" src={BitcoinImg} width="100px" height="50px"></img>
          </button>
          <button onClick={(e) => setCoinСhoice(e.target.name)}>
            <img name="Ethereum" src={EthereumImg} width="100px" height="50px"></img>
          </button>
        </div>
        <label>
          Количество
          <input type="number" min="1" value={coinToBuy} onChange={e => setCoinToBuy(+(e.target.value))} ></input><span> = {totalPrice.toFixed(2)} USD</span>
        </label>
        <button onClick={submitBuyCoin}>Купить</button>
      </div>
    </>
  );
};

export default UserWallet;