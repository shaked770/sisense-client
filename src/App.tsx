import React, {useEffect, useState} from 'react';
import './App.css';
import {TransactionDto} from "./models/transactionDto";
import {Chart} from "react-google-charts";
import Header from "./header/header";
import Footer from "./footer/footer";

const options = {
    title: "Company Performance",
    curveType: "function",
    legend: {position: "bottom"},
    hAxis: {
        format: "dd-MM-yyyy",
    },
    series: {
        0: {color: 'red'},
        1: {color: 'blue'},
        2: {color: 'green'},
    }
};

function App() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([] as any[]);
    const [invalidData, setInvalidData] = useState(false)
    const [startDate, setStartDate] = useState(new Date("2021-06-01T00:00:00.000Z"));
    const [endDate, setEndDate] = useState(new Date("2021-12-31T00:00:00.000Z"));

    useEffect(() => {
        if (!(startDate.getTime() < endDate.getTime())) {
            setInvalidData(true)
        } else {
            setInvalidData(false);
            fetch(`http://localhost:3000/transactions?fromDate=${startDate.toISOString()}&toDate=${endDate.toISOString()}`, {method: 'GET'})
                .then(res => res.json())
                .then(
                    (result: TransactionDto[]) => {
                        const data = [['', 'income', 'outcome', 'clear'], ...result.map(res => ([new Date(res.date), res.income, res.outcome, res.clear]))]
                        setItems(data);
                        setIsLoaded(true);
                    },
                    (error) => {
                        console.log(error)
                        setIsLoaded(true);
                        setError(error);
                    }
                )
        }
    }, [startDate, endDate])

    if (error) {
        return <div className={"error"}>We're sorry, but something went wrong. Try again later.</div>;
    } else if (!isLoaded) {
        return <div className={"loader"}><h1>Loading...</h1></div>;
    } else {
        return (
            <div className={"content"}>
                <Header dates={{startDate: startDate, endDate: endDate}} handleStartDateSelect={setStartDate}
                        handleEndDateSelect={setEndDate}/>
                {invalidData ?
                    <div className={"error"}>Please enter valid data. Start date should come before end date.</div> :
                    <div/>}
                <br/>
                <Chart

                    chartType="Line"
                    width="100%"
                    height="400px"
                    data={items}
                    options={options}
                />
                <br/>
                <Footer/>
            </div>
        )
    }
}

export default App;
