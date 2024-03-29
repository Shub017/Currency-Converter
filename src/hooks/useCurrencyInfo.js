import { useEffect, useState } from "react";

export default function useCurrencyInfo(currency, date){

    const [data, setData] = useState({})

    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`)
        .then((res)=> res.json())
        .then((res)=> setData(res[currency]))
        .catch((err)=> 'Failed to fetch the request')
        // console.log(data);
        console.log(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${currency}.json`);
    }, [currency, date])

    return data
}