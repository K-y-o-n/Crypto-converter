import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserWallet from "./components/UserWallet/UserWallet";
import CryptoConverter from './components/CryptoConverter/CryptoConverter';

function App() {
  const [bitcoin, setBitcoin] = useState(null);
  const [bitcoinInterval, setBitcoinInterval] = useState(null)
  const [ethereum, setEthereum] = useState(null)
  const [ethereumIntevral, setEthereumInterval] = useState(null)

  useEffect(() => {
    fetchBitcoinCurrent();
    fetchEthereumCurrent();
    fetchBitcoinInterval();
    fetchEthereumInterval();
  }, [])

  async function fetchBitcoinCurrent() {
    function getUsd() {
      return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
    }

    function getEth() {
      return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eth');
    }
    try {
      Promise.all([getUsd(), getEth()])
        .then(function (results) {
          const usd = results[0].data;
          const eth = results[1].data;
          setBitcoin({
            name: "Bitcoin",
            coin: "btc",
            toUSD: usd.bitcoin.usd,
            toAnotherCoin: eth.bitcoin.eth
          })
        });

    } catch (err) {
      console.log(err)
    }
  }

  async function fetchEthereumCurrent() {
    function getUsd() {
      return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
    }

    function getBtc() {
      return axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=btc');
    }

    try {
      Promise.all([getUsd(), getBtc()])
        .then(function (results) {
          const usd = results[0].data;
          const eth = results[1].data;
          setEthereum({
            name: "Ethereum",
            coin: "eth",
            toUSD: usd.ethereum.usd,
            toAnotherCoin: eth.ethereum.btc
          })
        });

    } catch (err) {
      console.log(err)
    }
  }

  async function fetchBitcoinInterval() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily')

      const data = response.data.prices
      setBitcoinInterval(data)
    } catch (err) {
      console.log(err)
    }
  }

  async function fetchEthereumInterval() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=14&interval=daily')

      const data = response.data.prices
      setEthereumInterval(data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {/* <>
        <CryptoConverter coin={bitcoin} coinInterval={bitcoinInterval} />
        <CryptoConverter coin={ethereum} coinInterval={ethereumIntevral} />
      </> */}
      <UserWallet BtcExchangeRate={bitcoin} EthExchangeRate={ethereum} />
    </>
  );
}

export default App;
