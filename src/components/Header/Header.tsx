import { useState, useEffect, useRef } from "react";
import {apiRequest} from "../fetch-api";

import './header.css'

const Currency = () => {
  let currencyRef = useRef([
    { cur: "USD", buy: 0, sale: 0, id: 1 },
    { cur: "EUR", buy: 0, sale: 0, id: 2 }
  ])

  const [currency, setCurrency] = useState(currencyRef.current)


// получаем данные о курсах валют от Приватбанка и записывает в обьект currensy:
  useEffect(() => {
    apiRequest
      .getRates()
      .then((res) => {
        let data = res.data as Array<{ccy: string, buy: number, sale: number}>
        console.log(res.data)
        currencyRef.current.forEach(item => {
          data.forEach(getItem => {
            if(getItem.ccy === item.cur) {
              item.buy = Math.floor(getItem.buy * 100) / 100;
              item.sale = Math.floor(getItem.sale * 100) / 100;
            }
          });
        });
        setCurrency([...currencyRef.current]);
      });
  }, [setCurrency]);

  return (         
    <div className="header"> 
      <div className="container">
        <div className="header__inner">
          <div className="header__logo"><b>H<span>a</span>wk<span>w</span>eb</b></div>
            <div className="header__exchange">
              {currency.map((itemCurrency) => (
                <div className="exchange__rate" key={itemCurrency.id}>
                  <span className="exchange__out">{itemCurrency.cur + ': ' + itemCurrency.buy}/{itemCurrency.sale}</span>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default Currency;