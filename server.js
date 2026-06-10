const express = require('express');
const os = require('os');
const app = express();
const PORT = 3000;

let visitorCount = 0;

// Middleware to count visitors
app.use((req, res, next) => {
    if (req.url === '/' || req.url === '/health') {
        visitorCount++;
    }
    next();
});

// Main Endpoint
app.get('/', (req, res) => {
    const currentTimestamp = new Date().toISOString();
    const containerId = os.hostname(); // In Docker, hostname is the Container ID

    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>DevOps Node.js Web App</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; background-color: #f4f6f9; color: #333; }
                .container { border: 2px solid #0066cc; display: inline-block; padding: 30px; border-radius: 10px; background: white; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }
                h1 { color: #0066cc; }
                p { font-size: 18px; }
                .highlight { font-weight: bold; color: #cc0000; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Deployment Successful!</h1>
                <p><strong>Timestamp (UTC):</strong> ${currentTimestamp}</p>
                <p><strong>Container ID:</strong> <span class="highlight">${containerId}</span></p>
                <p><strong>Visitor Counter:</strong> ${visitorCount}</p>
            </div>
        </body>
        </html>
    `);
});

// Health Endpoint for Scaling Demo Requirements
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP', containerId: os.hostname(), visitors: visitorCount });
});

app.listen(PORT, () => {
    console.log(`Application running locally on http://localhost:${PORT}`);
});