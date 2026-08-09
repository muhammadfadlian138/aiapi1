const express = require("express");
const axios = require("axios");

const app = express();

const PORT = 3000;

app.use(express.static("public"));

app.get("/ask", async (req, res) => {
    const prompt = req.query.prompt;
    
    try {
        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "smollm2:135m",
                prompt: req.query.prompt,
                stream: false
            }
        );

        res.json({
            message: response.data.response
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            error: "AI request failed."
        });
    }
});

app.get("/hello", (req, res) => {
    res.json({
        message: "Hello World!3"
    });
});

app.get("/time", (req, res) => {
    res.json({
        time: new Date()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});