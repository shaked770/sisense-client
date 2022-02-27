import React, {useEffect, useState} from 'react';
import './App.css';
import {TransactionDto} from "./models/transactionDto";
import {Chart} from "react-google-charts";
import Header from "./header";

const options = {
    title: "Company Performance",
    curveType: "function",
    legend: {position: "bottom"},
    hAxis: {
        format: "dd-MM-yyyy",
        // ticks: [
        //     new Date("2021-06-01T22:00:00.000Z"),
        //     new Date("2021-09-31T22:00:00.000Z"),
        //     new Date("2021-12-31T22:00:00.000Z")
        // ]
    }
};

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([] as any[]);
    const [startDate, setStartDate] = useState(new Date("2021-06-01T00:00:00.000Z"));
    const [endDate, setEndDate] = useState(new Date("2021-12-31T00:00:00.000Z"));

    useEffect(() => {
        fetch(`http://localhost:3000/transactions?fromDate=${startDate.toISOString()}&toDate=${endDate.toISOString()}`, {method: 'GET'})
            .then(res => res.json())
            .then(
                (result: TransactionDto[]) => {
                    const data = [['day', 'income', 'outcome', 'clear'], ...result.map(res => ([new Date(res.date), res.income, res.outcome, res.clear]))]
                    setItems(data);
                    setIsLoaded(true);
                },
                (error) => {
                    console.log(error)
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [startDate, endDate])

    if (error) {
        console.error(error)
        return <div>We're sorry, but something went wrong. Try again later.</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <>
                <Header dates={{startDate: startDate, endDate: endDate}} handleStartDateSelect={setStartDate} handleEndDateSelect={setEndDate}/>
                <div>Grocery shop</div>
                <Chart
                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={items}
                    options={options}
                />
            </>
        )
    }
}

export default App;
