import React from 'react'

import { useDispatch } from 'react-redux';
import { login } from "../stores/auth"
import { useHistory } from "react-router-dom"

function Login() {

	const history = useHistory()
	const dispatch = useDispatch()
	const handleLogin = () => {
		// istek atıcaksınız
		// data..
		const dummyData = {
			id: 1,
			name: 'Jamal',
			token: 'qe24525235235235235'
		}
		dispatch(login(dummyData))
		history.push('/')
	}


	return (

		<div class="bg">

			<div class="columns ">

				<div class="login-box">
					<div className="form">
					<div class="signin" >
						<h1 class="topline">Login</h1>
						<br />
						<div class="input-field">
							<input id="email" type="email" name="email"  placeholder="Input your Email" />

						</div>

						<div class="input-field">
							<input id="password" type="password" name="password" placeholder="Password" />

						</div>
						<div class="login-box-button">
							<button type="submit" onClick={handleLogin}>
								<i class="fas fa-sign-in-alt"></i>
								LOG IN
							</button>
						</div>
					</div>
					</div>
				</div>
			</div >
		</div >
	)
}

export default Login
