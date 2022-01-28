import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { getStatus } from '../stores/auth';
function Home() {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getStatus())
    }, [dispatch])
	const { username } = useSelector(state => state.auth)
    return (
        <div>
            <h1 style={{textTransform: "uppercase"}}>Welcome {username}</h1>
        </div>
    )
}

export default Home
