import { useState, useEffect, useCallback } from "react";
import { useDispatch } from 'react-redux';
import Header from "../Header/Header";
import CurrencyInput from "../Currecy-exchange/Currency-exchange";
import fetchAPI from "../fetch-api";
import { setRateReducer } from '../../redux/slices/rate';

import s from "./App.module.css";

export default function App() {
  
  const dispatch = useDispatch(),
    [amount1, setAmount1] = useState<number>(1),
    [amount2, setAmount2] = useState<number>(1),
    [currency1, setCurrensy1] = useState<string>("UAH"),
    [currency2, setCurrensy2] = useState<string>("USD"),
    [rate, setRate] = useState([]),
    params = [
      {amount: amount1, currency: currency1},
      {amount: amount2, currency: currency2},
    ]

  useEffect(() => {
    fetchAPI()
      .then((response) => response.text())
      .then((result) => {
        const ratesParset = JSON.parse(result);
        setRate(ratesParset.rates);
        dispatch(setRateReducer(ratesParset.rates))
      })
      .catch((error) => console.log("error", error));
  }, [dispatch]);

  function formatNumber(number: number) {
    return Number(number.toFixed(2));
  }

  const handleAmountChange = useCallback((amount: number, index: number) => {
    if(index===1){
      setAmount2(formatNumber((amount * rate[currency2 as unknown as number]) / rate[currency1 as unknown as number]));
      setAmount1(amount);
    }else{
      setAmount1(formatNumber((amount * rate[currency1 as unknown as number]) / rate[currency2 as unknown as number]));
      setAmount2(amount);
    }
  }, [currency1, currency2, rate])

  const handleCurrencyChange = (currency: string, index: number) => {
    if(index===1){
      setAmount2(formatNumber((amount1 * rate[currency2 as unknown as number]) / rate[currency as unknown as number]));
      setCurrensy1(currency);
    }else{
      setAmount1(formatNumber((amount2 * rate[currency1 as unknown as number]) / rate[currency as unknown as number]));
      setCurrensy2(currency);
    }
  }
  
  useEffect(() => {
    if (rate) handleAmountChange(1, 1);
  }, [rate, handleAmountChange]);

  return (
    <div className={s.container}>
      <Header />
      <section className={s.exchange}>
        {params.map((el, indx) => (
          <CurrencyInput key={indx}
            index={indx+1}
            onAmaontChange={handleAmountChange}
            onCurrencyChange={handleCurrencyChange}
            amount={el.amount}
            currency={el.currency}
          />
        ))}
      </section>
    </div>
  );
}
