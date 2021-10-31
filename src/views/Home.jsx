import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchAsyncCategory } from '../stores/category';

function Home() {
    const dispatch = useDispatch()
	const { categories } = useSelector(state => state.categories)

    useEffect(() => {
        dispatch(fetchAsyncCategory())
    }, [dispatch])

    console.log(categories);

    return (
        <div>
            <h1>Home</h1>
            {categories.pending }
        </div>
    )
}

export default Home
