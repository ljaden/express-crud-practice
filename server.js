require("dotenv").config();
const app = require("./app");

const db = require("./config/db");
// const tourSchema = new db.Schema({
//   name: String,
// });
// const Tour = db.model("tour", tourSchema);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Port: ${port}`);
});
