import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
	const [data, setData] = useState({
		Name: "",
		PhoneNumber: "",
		Gender: "",
		email: "",
		password: "",
		BirthDate: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:80/signup";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
			console.log(res.message);
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
		<div>
			<div>
				<h3>Back to login in</h3>
				<Link to="/login">
					<button type="button">
						Sign in
					</button>
				</Link>
			</div>
			<div>
				<form onSubmit={handleSubmit}>
					<h3>Create Account</h3>
					<input
						type="text"
						placeholder="Gender"
						name="Gender"
						onChange={handleChange}
						value={data.Gender}
					/>
					<input
						type="text"
						placeholder="BirthDate"
						name="BirthDate"
						onChange={handleChange}
						value={data.BirthDate}
					/>
					<input
						type="text"
						placeholder="Name"
						name="Name"
						onChange={handleChange}
						value={data.Name}
					/>
					<input
						type="text"
						placeholder="PhoneNumber"
						name="PhoneNumber"
						onChange={handleChange}
						value={data.PhoneNumber}
					/>
					<input
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleChange}
						value={data.email}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleChange}
						value={data.password}
					/>
					{error && <div>{error}</div>}
					<button type="submit">
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
