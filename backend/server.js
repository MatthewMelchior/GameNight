const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json()); // Parse JSON bodies

// Set up the session
app.use(session({
    secret: process.env.SESSION_SECRET, // Change this to a strong secret
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.COOKIE_SECURE == "true", // Use true if serving over HTTPS, this is a wonky line, maybe I should use type script?
        httpOnly: true, // Prevent JavaScript access to cookies
        sameSite: "lax", // Set SameSite attribute
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
}));

const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const gameRoutes = require('./routes/games');
app.use('/api/games', gameRoutes);

const questionRoutes = require('./routes/questions');
app.use('/api/questions', questionRoutes);

const imageRoutes = require('./routes/images');
app.use('/api/images', imageRoutes);

const answerRoutes = require('./routes/answers');
app.use('/api/answers', answerRoutes);


app.get('/', (req, res) => {
    res.send('Health check');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
