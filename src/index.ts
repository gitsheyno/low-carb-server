import * as dotenv from "dotenv";
dotenv.config();
console.log(process.env.JWT_SECRET, "check");
import app from "./server";

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`hello on http://localhost:${PORT}`);
});
