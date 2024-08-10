import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AuthProvider from "./Auth/AuthContext";

function App() {

	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</AuthProvider>
	);
}
export default App;
