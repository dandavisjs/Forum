require("dotenv").config()
const express = require("express")
const db = require("./db")
const morgan = require('morgan')


const app = express()


app.use (express.json())

app.get("/api/getPosts", async (req,res) => {
    try {
        const results = await db.query("select * from posts")
        console.log(results);
        res.status(200).json({
            status: "success",
            results: results.rows.length,
            data:{ posts: results.rows, }        
        })
    } catch (err) {
        console.log(err);
    }
    
})

app.get("/api/posts/:id", (req,res) => {
    console.log(req.params);
    res.status(200).json({
        status: "success",
        data: {
            post: "Post 3"
        }
    })
})

app.post("/api/posts", (req,res)=> {
    console.log(req.body);
    res.status(201).json({
        status: "success",
        data: {
            post: "Post 3"
        }
    })
})

app.put("/api/posts/:id", (req,res) => {
    console.log(req.params.id);
    console.log(req.body);
    res.status(200).json({
        status: "success",
        data: {
            post: "Post 3"
        }
    })
})

app.delete("/api/posts/:id", (req,res) => {
    res.status(204).json({
        status:"success"
    })
})
const port = process.env.PORT || 3004

app.listen(port, () => {
    console.log((`Server is running on port ${port}`));
})