// src/middleware/logger.js
// Updated to handle both Server and Browser environments

const logger = {
    info: (message, context = "SYSTEM") => {
        const entry = `[${new Date().toISOString()}] [INFO] [${context}]: ${message}`;

        // Check if we are in a Node.js environment
        if (typeof window === 'undefined') {
            process.stdout.write(entry + "\n");
        } else {
            // In the browser, we use console.log but format it to match our required style
            console.log(entry);
        }
    },
    error: (message, trace = "") => {
        const entry = `[${new Date().toISOString()}] [ERROR]: ${message} ${trace}`;

        if (typeof window === 'undefined') {
            process.stderr.write(entry + "\n");
        } else {
            console.error(entry);
        }
    }
};

export default logger;