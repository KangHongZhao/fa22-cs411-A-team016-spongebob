
import { Route, Routes} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";

function App() {
	return (
		<Routes>
			//const v = localStorage.getItem("token");
			<Route exact path="/" element={<><Login/></>}/>
			<Route exact path="/login" element={<><Login/></>}/>
			<Route path="/signup" exact element={<Signup />} />
		</Routes>
	);
}

export default App;