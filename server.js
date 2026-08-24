const express = require("express");
const axios = require("axios");
const mysql = require('mysql2/promise');

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

app.get("/cuaca", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.bmkg.go.id/publik/prakiraan-cuaca",
            {
                params: {adm4: "32.73.10.1006"}
            }
        );

        // console.log(response.data["data"][0]["cuaca"][1][0]);
        res.json({
            message: response.data["data"][0]["cuaca"][1][0]
        });

    } catch (err) {
        console.error(err.message);
    }
});

async function main() {
    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'yourpassword',
    //     database: 'school'
    // });

    // console.log('Connected to MySQL');

    // const [rows] = await connection.execute(
    //     'SELECT * FROM students'
    // );

    // console.table(rows);

    // await connection.end();
}

// main().catch(console.error);

app.get("/cek_db", async (req,res) => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'qwerty',
            database: 'absensi_upacara'
        });

        console.log('Connected to MySQL');

        const [rows] = await connection.execute(
            'SELECT * FROM presensi'
        );

        console.table(rows);

        await connection.end();
    } catch (err){
        console.error(err.message);
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