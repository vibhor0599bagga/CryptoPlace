import { createContext, useState, useEffect } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-z8NiQS6Zj5YkX9z8hz6iNvS8' }
        };

        try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options);
            const data = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.error("Error fetching coins:", error);
        }
    };

    useEffect(() => {
        fetchAllCoin(); // Call the function
    }, [currency]);

    const ContextValue = {
        allCoin,
        currency,
        setCurrency
    };

    return (
        <CoinContext.Provider value={ContextValue}>
            {props.children}
        </CoinContext.Provider>
    );
};

export default CoinContextProvider;
