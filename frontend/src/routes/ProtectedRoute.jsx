import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import toastOptions from "../constants/toast";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, authError } = useSelector((state) => state.userAuth);

	const dispatch = useDispatch();

	useEffect(() => {
		if (authError) {
			console.log(authError);
			toast.error(authError, toastOptions);
			dispatch({ type: "CLEAR_AUTH_ERROR" });
		}
	}, [authError]);

	return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
