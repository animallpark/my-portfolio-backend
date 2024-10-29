const app = express();
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
app.use(express.json());
const mongoUrl = "mongodb+srv://anujb5606:anujb5606@cluster0.ddkb0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
app.use(cors())
mongoose.connect(mongoUrl)
  .then(() => {
    console.log("connected to database")
  }
  )
  .catch((e) => {
    console.log(e)

  })

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
})

const user = mongoose.model('users', userSchema)
app.post("/register", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.name ||
    !body.email ||
    !body.message
  ) {
    return res.status(400).json({ msg: "all done" })
  }

  const result = await user.create({
    name: body.name,
    email: body.email,
    message: body.message,
  })
  console.log(result)
  return res.status(201).json({ msg: "success" });
});
app.listen(8001, () => {
  console.log("server connected")
})