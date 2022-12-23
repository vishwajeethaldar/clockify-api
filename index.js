const express =  require("express")
const cors =  require("cors")
const dotenv = require("dotenv")
const connect = require("./src/db");
const userRouter = require("./src/features/users/users.route")
const projectRouter = require("./src/features/projects/project.router")
const taskRouter = require("./src/features/tasks/task.router")
const groupRouter =  require("./src/features/groups/group.router")
const clientRouter =  require("./src/features/clients/client.router");
const Users = require("./src/features/users/users.model");
const app = express();
dotenv.config()
app.use(cors({
    origin:"*"
}));

app.use(express.urlencoded({
    extended:true
}));
app.use(express.json())

app.get("/", async (req, res)=>{
    let users  =  await Users.find();
    res.send(users)
})
app.use("/users", userRouter);
app.use("/projects", projectRouter)
app.use("/tasks", taskRouter)
app.use("/groups", groupRouter)
app.use("/clients", clientRouter)

app.listen(process.env.PORT||8080, async()=>{
    await connect();
    console.log("server running http://localhost:8080");   
})

module.exports = app