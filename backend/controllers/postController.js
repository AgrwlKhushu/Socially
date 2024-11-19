import { Response } from "../utils/response.js";

export const createPost = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
