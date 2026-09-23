const express = require("express");
const axios = require("axios");
const mysql = require('mysql2/promise');
const fs = require('fs');
const https = require('https');
const dotenv = require("dotenv").config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
});

const app = express();

const PORT = 3000;

const options = {
    key: fs.readFileSync("./cert/192.168.110.226-key.pem"),
    cert: fs.readFileSync("./cert/192.168.110.226.pem")
};

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

app.get("/hasil", async(req,res) =>{
    try {
        console.log(123);
        const [barisbaris] = await db.execute(
            "SELECT id,nama_lengkap FROM daftar_murid WHERE nis=?;",
            [req.query.qr]
        );

        if (barisbaris.length>0){
            const [murid] = await db.execute(
                "INSERT INTO presensi VALUES(NULL,?,NOW());",
                [req.query.qr]
            );
            console.log("Database berhasil ditambahkan:", barisbaris.length, "baris, yaitu ", barisbaris[0].nama_lengkap);
        } else {
            console.log("Gagal mengabsen");
        }
        res.json(barisbaris);
    } catch (err){
        console.error(err.message);
    }
});

app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on http://0.0.0.0:3000");
});