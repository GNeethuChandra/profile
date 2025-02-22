const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve index.html
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Handle form submission and display on form.html
app.post("/submit", (req, res) => {
    const { name, email, message } = req.body;

    // Read form.html and inject values dynamically
    fs.readFile("form.html", "utf8", (err, data) => {
        if (err) {
            res.status(500).send("Error loading form.html");
            return;
        }
        const updatedData = data
            .replace("{name}", name)
            .replace("{email}", email)
            .replace("{message}", message);

        res.send(updatedData);
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/index.html`);
});
