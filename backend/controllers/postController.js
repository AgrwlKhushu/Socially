import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import { message } from "../utils/message.js";
import { Response } from "../utils/response.js";

export const createPost = async (req, res) => {
	try {
		//parsing body data
		const { image, caption, mentions, location } = req.body;

		// checking body data
		if (!caption) {
			return Response(res, 400, false, message.missingFieldsMessage);
		}

		if (!image) {
			return Response(res, 400, false, message.imageMissingMessage);
		}

		// upload image
		const imageResult = await cloudinary.v2.uploader.upload(image, {
			folder: "posts",
		});

		// creating post
		post = Post.create({
			image: {
				public_id: imageResult.public_id,
				url: imageResult.secure_url,
			},
			caption,
			location,
			mentions,
			owner: req.user._id,
		});

		// set owner
		post.owner = user._id;

		// add post to user's post array
		const user = await User.findById(req.user._id);
		user.posts.unshift(post._id);
		await user.save();

		// send response
		Response(res, 201, true, message.postCreatedMessage, post);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllPosts = async (req, res) => {
	try {
		// get all posts
		const posts = await Post.find().populate("owner", "username firstName avatar");

		if(posts.length === 0) {
			return Response(res, 404, false, message.postsNotFoundMessage);
		}

		// send response
		Response(res, 200, true, message.postsFoundMessage, posts);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getPostById = async (req, res) => {
	try {
		// get post by id
		const { id } = req.params;
		const post = await Post.findById(id).populate(
			"owner",
			"username firstName avatar"
		);

		if(!post) {
			return Response(res, 404, false, message.postNotFoundMessage);
		}

		// send response
		Response(res, 200, true, message.postFoundMessage, post);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getMyPosts = async (req, res) => {
	try {
		// get my posts
		const posts = await Post.find({ owner: req.user._id }).populate(
			"owner",
			"username firstName avatar"
		);

		if(posts.length === 0) {
			return Response(res, 404, false, message.postsNotFoundMessage);			
		}

		// send response
		Response(res, 200, true, message.postsFoundMessage, posts);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

