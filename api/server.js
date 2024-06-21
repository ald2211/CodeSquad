import app from "./index.js";

const port=process.env.PORT||5000

app.listen(port, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});