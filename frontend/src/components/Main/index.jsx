import { Link } from "react-router-dom";
const main = () => {
	return (
		<div>
			<nav>
				<h1>Personal Information</h1>
				<Link to="/search">
				<button type = 'button'>
					go to search
				</button>
				</Link>
			</nav>
		</div>
	);
};

export default main;