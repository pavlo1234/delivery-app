import "dotenv/config";
import app from "./src/app.js";

app.listen(process.env.PORT || 8080, (error) => {
	if (error) console.log(error);
	else console.log("Server has been started");
});
