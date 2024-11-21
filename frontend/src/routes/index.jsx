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
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

const Path = () => {
	const dispatch = useDispatch();
	const { userLoading } = useSelector((state) => state.userAuth);

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return (
		<div>
			<Router>
				{userLoading ? (
					<LoadingPage />
				) : (
					<Routes>
						<Route
							path="/"
							element={
								<ProtectedRoute>
									<Home />
								</ProtectedRoute>
							}
						/>
						<Route
							path="/login"
							element={
								<AuthRoute>
									<Login />
								</AuthRoute>
							}
						/>
						<Route
							path="/register"
							element={
								<AuthRoute>
									<Register />
								</AuthRoute>
							}
						/>
						<Route
							path="/login/:id"
							element={
								<AuthRoute>
									<LoginOtp />
								</AuthRoute>
							}
						/>
						<Route
							path="/verify/:id"
							element={
								<AuthRoute>
									<VerifyOtp />
								</AuthRoute>
							}
						/>
					</Routes>
				)}
			</Router>
		</div>
	);
};

export default Path;
