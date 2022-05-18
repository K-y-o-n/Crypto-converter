import React, { useState } from 'react';
import BitcoinImg from "../../Images/bitcoin_logo.svg"
import EthereumImg from "../../Images/ethereum_logo.svg"
import { PieChart, Pie, Cell, Legend } from 'recharts';
import "./UserWallet.css"

const UserWallet = ({ BtcExchangeRate, EthExchangeRate }) => {
  // props - инфо о криптовалюте: название, сокращение, курс к $ и другой валюте

  const [userBtc, setUserBtc] = useState(1)
  const [userEth, setUserEth] = useState(3.24)
  const [coinСhoice, setCoinСhoice] = useState("Bitcoin")
  const [coinToBuy, setCoinToBuy] = useState(1)
  const [coinСhoiceToSell, setCoinСhoiceToSell] = useState("Bitcoin")
  const [coinToSell, setCoinToSell] = useState(1)
  const totalPrice = coinСhoice === BtcExchangeRate?.name ? coinToBuy * BtcExchangeRate?.toUSD : coinToBuy * EthExchangeRate?.toUSD
  const totalSellPrice = coinСhoiceToSell === BtcExchangeRate?.name ? coinToSell * BtcExchangeRate?.toUSD : coinToSell * EthExchangeRate?.toUSD

  // обработчик для кнопки "Купить"
  function submitBuyCoin() {
    if (coinСhoice === "Bitcoin") {
      setUserBtc(userBtc + coinToBuy)
      setCoinToBuy(1)
    } else if (coinСhoice === "Ethereum") {
      setUserEth(userEth + coinToBuy)
      setCoinToBuy(1)
    }
  }

  // обработчик для кнопки "Продать"
  function submitSellCoin() {
    if (coinСhoiceToSell === "Bitcoin") {
      if (userBtc >= coinToSell) {
        setUserBtc(userBtc - coinToSell)
        setCoinToSell(1)
      } else alert("Недостаточно криптовалюты для продажи")
    }
    if (coinСhoiceToSell === "Ethereum") {
      if (userEth >= coinToSell) {
        setUserEth(userEth - coinToSell)
        setCoinToSell(1)
      } else alert("Недостаточно криптовалюты для продажи")
    }
  }

  // ф. расчитывает соотношение криптовалют в кошельке
  function getCoinRatio() {
    const btc = userBtc * BtcExchangeRate?.toUSD;
    const eth = userEth * EthExchangeRate?.toUSD;
    const percent = (btc + eth) * 0.01;
    return [{
      name: "BTC",
      value: Math.round(btc / percent)
    }, {
      name: "ETH",
      value: Math.round(eth / percent)
    }]
  }

  // данные для графика
  const graphData = getCoinRatio()

  return (
    <>
      <div className='wallet'>
        <div className='wallet__coins'>
          <h2>Мой кошелек</h2>
          <p>Bitcoin (BTC): {userBtc}</p>
          <p>Ethereum (ETH): {userEth}</p>
          <p>Общая стоимость: {((userBtc * BtcExchangeRate?.toUSD) + (userEth * EthExchangeRate?.toUSD)).toFixed(2)} USD</p>
        </div>
        <div className='wallet__ratio'>
          <PieChart width={200} height={180}>
            <Pie data={graphData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label  >
              <Cell key={graphData[0]} fill="orange" />
            </Pie>
            <Legend />
          </PieChart>
        </div>
      </div>

      <div className='tradeCoin'>
        <h2>Купить криптовалюту</h2>
        <div>
          <p>Выберите криптовалюту: {coinСhoice}</p>
          <button onClick={(e) => setCoinСhoice(e.target.name)}>
            <img name="Bitcoin" alt="Bitcoin" src={BitcoinImg} width="100px" height="50px"></img>
          </button>
          <button onClick={(e) => setCoinСhoice(e.target.name)}>
            <img name="Ethereum" alt="Ethereum" src={EthereumImg} width="100px" height="50px"></img>
          </button>
        </div>
        <label className='tradeCoin__label'>
          Количество
          <input className='tradeCoin__input' type="number" min="0.1" value={coinToBuy} onChange={e => setCoinToBuy(+(e.target.value))} ></input><span className='tradeCoin__totalPrice'> = {totalPrice.toFixed(2)} USD</span>
        </label>
        <button className='tradeCoin__submit' onClick={submitBuyCoin}>Купить</button>
      </div>

      <div className='tradeCoin'>
        <h2 >Продать криптовалюту</h2>
        <div>
          <p>Выберите криптовалюту: {coinСhoiceToSell}</p>
          <button onClick={(e) => setCoinСhoiceToSell(e.target.name)}>
            <img name="Bitcoin" alt="Bitcoin" src={BitcoinImg} width="100px" height="50px"></img>
          </button>
          <button onClick={(e) => setCoinСhoiceToSell(e.target.name)}>
            <img name="Ethereum" alt="Ethereum" src={EthereumImg} width="100px" height="50px"></img>
          </button>
        </div>
        <label className='tradeCoin__label'>
          Количество
          <input className='tradeCoin__input' type="number" min="0.1" value={coinToSell} onChange={e => setCoinToSell(+(e.target.value))} ></input><span className='tradeCoin__totalPrice'> = {totalSellPrice.toFixed(2)} USD</span>
        </label>
        <button className='tradeCoin__submit' onClick={submitSellCoin}>Продать</button>
      </div>
    </>
  );
};

export default UserWallet;