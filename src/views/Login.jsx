import React, { useState } from 'react'
import axios from "axios";
import swal from 'sweetalert';


import { useDispatch } from 'react-redux';
import { login } from "../stores/auth"
import { useHistory } from "react-router-dom"
const {REACT_APP_API_URL} = process.env

function Login() {
	const [inp, setInp] = useState({})
	const history = useHistory()
	const dispatch = useDispatch()

	const getInputs = (e) => {
		let name = e.target.name
		let value = e.target.value

		setInp({
			...inp,
			[name]: value
		})
	}

	const handleLogin = async (e) => {
		e.preventDefault()
		await axios.post(REACT_APP_API_URL+"Login/authenticate", inp)
			.then(res => {
				const data = {
					token: res.data
				}
				dispatch(login(data))
				history.push('/')
			})
			.catch(err => swal({
				title: "Oops!",
				text: "Wrong password or username!",
				icon: "error",
				button: "Close",
			}))
	}


	return (

		<div className="bg">

			<div className="columns ">

				<div className="login-box">
					<form onSubmit={(e) => handleLogin(e)} className="form">
						<div className="signin" >
							<h1 className="topline">Login</h1>
							<br />
							<div className="input-field">
								<input id="email" type="text" name="username" placeholder="username" onChange={(e) => getInputs(e)} />

							</div>

							<div className="input-field">
								<input id="password" type="password" name="password" placeholder="Password" onChange={(e) => getInputs(e)} />

							</div>
							<div className="login-box-button">
								<button type="submit">
									<i className="fas fa-sign-in-alt"></i>
									LOG IN
								</button>
							</div>
						</div>
					</form>
				</div>
			</div >
		</div >
	)
}

export default Login
