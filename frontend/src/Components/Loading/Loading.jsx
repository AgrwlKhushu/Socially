
import "../../styles/Loading.css";

const LoadingPage = () => {
	const spans = Array.from({ length: 128 });

	return (
		<section className="loading-page">
			<div className="loading-cont">
				{spans.map((_, index) => (
					<span key={index} className="span"></span>
				))}
				<div className="loading-box">
					<div className="loading-content">
						<h2>Loading...</h2>
						<div className="loading-spinner"></div> {/* Rotating circle */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LoadingPage;
