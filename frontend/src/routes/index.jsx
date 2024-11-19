import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import LoadingPage from "../Components/Loading/Loading";
import LoginOtp from "../pages/Otp/LoginOtp";
import VerifyOtp from "../pages/Otp/VerifyOtp";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../redux/Actions/userActions";

const Path = () => {
	const [loading, setLoading] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 1000);
	}, []);

	const UserProfile = ({ id }) => {
		const dispatch = useDispatch();

		const { loading, message, error } = useSelector((state) => state.userAuth);

		useEffect(() => {
			if (id) {
				dispatch(loadUser(id));
			}
		}, [dispatch, id]);
	};

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return (
		<div>
			<Router>
				{loading ? (
					<h1>
						<LoadingPage />{" "}
					</h1>
				) : (
					<Routes>
						<Route path="/" element={<Home />} />
						if(UserProfile) <Route path="/login" element={<Home />} />
						else <Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/login/:id" element={<LoginOtp />} />
						<Route path="/verify/:id" element={<VerifyOtp />} />
					</Routes>
				)}
			</Router>
		</div>
	);
};

export default Path;
