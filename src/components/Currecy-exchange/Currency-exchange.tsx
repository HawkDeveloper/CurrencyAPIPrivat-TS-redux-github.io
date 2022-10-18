import { useSelector } from 'react-redux';
import { rateSelector } from '../../redux/slices/rate';
import s from "./Currency-exchnge.module.css";

export default function CurrencyInput({onAmaontChange, onCurrencyChange, amount, index, currency} : 
    {onAmaontChange: any, onCurrencyChange: any; amount: number, index: number, currency: string}) {

    const currencies = Object.keys(useSelector(rateSelector.getRate).rate);

return (
    <div className={s.container}>
        <input type="text" value={amount ? amount : 0} onChange={(e) => onAmaontChange(e.target.value, index)}/>
        <select value={currency} onChange={(e) => onCurrencyChange(e.target.value, index)}>
            {currencies && currencies.map((currency, indx) => (
                <option key={indx}>{currency}</option>
            ))}
        </select>
    </div>
)
};
