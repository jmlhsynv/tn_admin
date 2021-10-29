import React, {useState, useEffect} from 'react'

function Home() {
    let [category, setCategory] = useState(null);
    useEffect(() => {
        fetch("http://localhost:1998/api/Categories")
        .then(res => res.json())
        .then(data => setCategory(data))
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {
                category && category.map( e => (
                    <h1>{e.NAME_}</h1>
                ))
            }
        </div>
    )
}

export default Home
