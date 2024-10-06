// server.js
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (HTML)
app.use(express.static(path.join(__dirname, 'views')));

// Helper function to read user data from the JSON file
function readUserData() {
    const data = fs.readFileSync('data.json', 'utf8');
    return JSON.parse(data);
}

// Helper function to write user data to the JSON file
function writeUserData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
}

// Route to display the main login page (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/view/main.html'));
});

// Route to display the registration form
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/register.html'));
});

// Route to handle registration
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const users = readUserData();

    // Check if the user already exists
    if (users.find(user => user.username === username)) {
        return res.send('User already exists. Please choose a different username.');
    }

    // Add new user to the data
    users.push({ username, password });
    writeUserData(users);

    res.send('Registration successful! You can now <a href="/">login</a>.');
});

// Route to handle login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = readUserData();

    // Check if the user exists and password matches
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.sendFile(path.join(__dirname, 'views/index.html'));
    } else {
        res.send('Invalid username or password. Please try again.');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
