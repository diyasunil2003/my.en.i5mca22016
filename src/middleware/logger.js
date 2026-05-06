const logger = {
    info: (message, context = "SYSTEM") => {
        const entry = `[${new Date().toISOString()}] [INFO] [${context}]: ${message}`;
        process.stdout.write(entry + "\n");
    },
    error: (message, trace = "") => {
        const entry = `[${new Date().toISOString()}] [ERROR]: ${message} ${trace}`;
        process.stderr.write(entry + "\n");
    }
};

export default logger;