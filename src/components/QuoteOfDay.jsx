import { useState } from "react";
import { useEffect } from "react";

function QuoteOfDay() {

    const [quote, setQuote] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const fetchData = async () => {
        try {
            setLoading(true)
            const res = await fetch("https://dummyjson.com/quotes/random")
            const data = await res.json()
            setQuote(data.quote)
        }
        catch (err) {
            console.log(err)
            setError("Failed to load quote");
        }
        finally {
            setLoading(false)
        }

    };

    useEffect(() => {
        setError("")
        fetchData();
    }, []);


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }


    return (
        <div className="quote-box">
            <h3>Quote of the Day</h3>
            <p>{quote}</p>
            <button onClick={fetchData}>
                Get New Quote
            </button>
        </div>
    );
}

export default QuoteOfDay;