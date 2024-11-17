const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

const app = require('./app')


// Start the application
const startApp = async () => {
    const port = process.env.PORT || 8005;
    app.listen(port, () => {
        console.log(`App running on port: ${port}`);
    });
};

// Initialize the application
startApp();