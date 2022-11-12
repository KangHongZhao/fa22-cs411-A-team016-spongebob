import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Main = () => {
	const [data, setData] = useState({
		UserId: "",
		NewPassword: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// console.log(data.NewPassword);
			const url = `http://localhost:80/update_password?UserId=${encodeURIComponent(data.UserId)}&NewPassword=${encodeURIComponent(data.NewPassword)}`;
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
			<form onSubmit={handleSubmit}>
			    <h1>Personal Information</h1>
			    <input
					type="UserId"
					placeholder="UserId"
					name="UserId"
					onChange={handleChange}
					value={data.UserId}
				/>
			    <input
					type="NewPassword"
					placeholder="NewPassword"
					name="NewPassword"
					onChange={handleChange}
					value={data.NewPassword}
				/>
				<button type="submit">
						reset password
				</button>
				<div>
				<Link to="/search">
				<button type = 'button'>
					go to search
				</button>
				</Link>
				</div>
			</form>
		</div>
	);
};

export default Main;