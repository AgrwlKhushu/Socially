import Post from "../models/postModel.js";
import Reply from "../models/replyModel.js";
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
		let post = Post.create({
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
		const posts = await Post.find().populate(
			"owner",
			"username firstName avatar"
		);

		if (posts.length === 0) {
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

		if (!post) {
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

		if (posts.length === 0) {
			return Response(res, 404, false, message.postsNotFoundMessage);
		}

		// send response
		Response(res, 200, true, message.postsFoundMessage, posts);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const addComment = async (req, res) => {
	try {
		// get post by id
		const { id } = req.params;

		if (!id) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}

		const post = await Post.findById(id).populate(
			"owner",
			"username firstName avatar"
		);

		if (!post) {
			return Response(res, 404, false, message.postNotFoundMessage);
		}

		const { comment } = req.body;

		if (!comment) {
			return Response(res, 400, false, message.missingFieldsMessage);
		}
		// create comment
		const newComment = Comment.create({
			comment,
			owner: req.user._id,
			post: post._id,
		});

		// add comment to post
		post.comments.push(comment._id);
		await post.save();

		// send response
		Response(res, 201, true, message.commentAddedMessage, comment);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getCommentById = async (req, res) => {
	try {
		const { postId } = req.params;

		if (!postId) {
			return Response(res, 500, false, message.idNotFoundMessage);
		}

		const comment = await Comment.findById(postId).populate(
			"post owner",
			"username firstName avatar"
		);
		if (!comment) {
			return Response(res, 400, false, message.commentNotFoundMessage);
		}

		Response(res, 200, true, message.commentFoundMessage, comment);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const addReply = async (req, res) => {
	try {
		const { commentId } = req.params;

		if (!commentId) {
			return Response(res, 200, false, message.idNotFoundMessage);
		}

		const comment = await Comment.findById(commentId).populate(
			"post owner",
			"username firstName avatar"
		);

		if (!comment) {
			return Response(res, 400, false, message.commentNotFoundMessage);
		}

		const { reply } = req.body;

		if (!reply) {
			return Response(res, 400, false, message.missingFieldsMessage);
		}

		const newReply = Reply.create({
			reply,
			owner: req.user._id,
			comment: comment._id,
		});

		comment.replies.push(newReply._id);
		await comment.save();

		Response(res, 200, true, message.replyAddedMessage, newReply);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getReplyById = async (req, res) => {
	try {
		const { replyId } = req.params;

		if (!replyId) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}

		const reply = await Reply.findById(replyId).populate(
			"owner",
			"username, firstName, avatar"
		);

		if (!reply) {
			return Response(res, 400, false, message.replyNotFoundMessage);
		}

		Response(res, 200, true, message.replyFoundMessage, reply);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllComments = async (req, res) => {
	try {
		const { postId } = req.params;
		if (!postId) {
			return Response(res, 400, false, message.idNotFoundMessage);
		}

		const post = await Post.findById(postId);
		// .populate({
		// 	path: 'comments',
		// 	populate: {
		// 		path: 'owner',
		// 		select: 'username firstName avatar',
		// 		path: "replies",
		// 		populate: {
		// 			path: 'owner',
		// 			select: 'username firstName avatar'
		// 		}
		// 	}
		// })

		if (!post) {
			return Response(res, 400, false, message.postNotFoundMessage);
		}

		const comments = await Comment.find({ post: post._id })
			.populate({
				path: "owner",
				select: "username firstName avatar",
			})
			.populate({
				path: "replies",
				populate: {
					path: "owner",
					select: "username firstName avatar",
				},
			});

		Response(res, 200, true, message.commentFoundMessage, comments);
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllRepliesByComment = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};

export const getAllRepliesByPost = async (req, res) => {
	try {
	} catch (error) {
		Response(res, 500, false, error.message);
	}
};
