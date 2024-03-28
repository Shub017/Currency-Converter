import { useEffect, useState } from "react";

export default function useCurrencyInfo(currency){

    const [data, setData] = useState({})

    useEffect(()=>{
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .then((res)=> res.json())
        .then((res)=> setData(res[currency]))
        .catch((err)=> 'Failed to fetch the request')
        console.log(data);
    }, [currency])

    return data
}