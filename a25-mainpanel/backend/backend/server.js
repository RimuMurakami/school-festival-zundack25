require("dotenv").config();

const express = require("express");
const voteRoutes = require("./routes/votes");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use("/api/votes", voteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
