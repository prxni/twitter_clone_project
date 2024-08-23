import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import AuthProvider from "./Auth/AuthContext";
import Search from "./Pages/Search";
import Profile from "./Pages/Profile";
function App() {

	return (
		<AuthProvider>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/search" element={<Search />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</AuthProvider>
	);
}
export default App;
