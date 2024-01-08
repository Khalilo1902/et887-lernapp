import express from "express"
import router from "./server";
import flashcardRouter from "../routers/flashCardrouter";
// import { dbConnect } from "../dbConnect/dbConnect";






const app = express()

app.use(express.json())


app.use(router)
app.use('/api/flashcards', flashcardRouter)
const PORT = process.env.PORT|| 2400;

app.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
});