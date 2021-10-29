import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../stores/auth';

function Profile() {
    
    const dispatch = useDispatch()
	const { user } = useSelector(state => state.auth)

    return (
        <div>
            <h1>Profie</h1>
            {user && (
				<div>
					<button onClick={() => dispatch(logout())}>exit</button>
				</div>
			)}
        </div>
    )
}

export default Profile
