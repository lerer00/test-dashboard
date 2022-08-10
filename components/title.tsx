import React, {useEffect, useState} from "react";

// @ts-ignore
export default function Title() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('/api/hello')
            .then((res) => res.json())
            .then((data: any) => {
                setData(data.name)
                setLoading(false)
            })
    }, [])

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>

    return (
        <>
            <h1>{data}</h1>
        </>
    );
};