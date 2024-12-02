import React, { useContext, useEffect, useState } from 'react'
import "./Home.css";
import {CoinContext} from "../../context/CoinContext";
import {Link} from "react-router-dom";

const Home = () => {

const {allCoin, currency} = useContext(CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input, setInput] = useState('');

const inputHandler = (e)=>{
  setInput(e.target.value);
  if(e.target.value === ''){
    setDisplayCoin(allCoin);
  }
}

const searchHandler = async(e)=>{
  e.preventDefault();
  const coins = await allCoin.filter((item)=>{
    return item.name.toLowerCase().includes(input.toLowerCase());
  })
  setDisplayCoin(coins);
}

useEffect(()=>{
  setDisplayCoin(allCoin);
},[allCoin])

  return (
    <div className='Home'>
      <h1>Largest <br /> Crypto Marketplace</h1>
      <p>Welcome to the world's largest cryptocurrency marketplace. SignUp to explore more <br /> about cryptos.</p>
      <form onSubmit={searchHandler}>
        <input onChange={inputHandler} list='coinlist' value={input} type='text' placeholder='Search Crypto..' required/>
        <datalist id='coinlist'>
          {allCoin.map((item, index)=>(<option key={index} value={item.name}/>))}
        </datalist>
        <button>Search</button>
      </form>
      <div className="table">
        <div className="tlayout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className='marketCap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item, index)=>(
            <Link to={`/coin/${item.id}`} className='tlayout' key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image}/>
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={item.price_change_24h>0?"green":"red"}>{currency.symbol} {Math.floor(item.price_change_24h*100)/100}</p>
              <p className='marketCap'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home
