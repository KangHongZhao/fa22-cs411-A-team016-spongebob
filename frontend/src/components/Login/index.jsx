import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './login.css';

const Login = () => {
	const [data, setData] = useState({ 
		email: "", 
		password: "" 
	});
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:80/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
			window.location = "/";
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className="loginBox">
			<div>
				<form className="loginForm" onSubmit={handleSubmit}>
					<h3 className="title">Login In</h3>
					<div className="loginInfo">
					<label>Email Address</label>
					<br></br>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
					/>
					</div>
					<div className="loginInfo">
					<label>Password</label>
					<br></br>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					</div>
					{error && <div>{error}</div>}
					<Link to="/Main">
					<button type="submit" className="submitbutton">
						Sign In
					</button>
					</Link>
				<Link to="/signup" className="signup">
				<h3>sign up</h3>
				</Link>
				</form >
			</div>
		</div>
	);
};

export default Login;