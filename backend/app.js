import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import path from "path";
// import ejs from "ejs";
import cors from "cors";

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));

app.use(
	cors({
		origin: [process.env.LOCAL_URL, process.env.WEB_URL],
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	})
);

// app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", postRouter);

app.get("/", (req, res) => {
	// res.send("Hello World!");
	res.render("home", {
		title: "Social.ly",
	});
});

app.get("/login", (req, res) => {
	res.render("login");
});

export default app;
