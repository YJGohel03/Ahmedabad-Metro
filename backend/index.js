dotenv.config({
    path:path.resolve('./.env'),
});
import dotenv from 'dotenv'
import path from "path"
import { app } from './app.js'
import connectDB from './db/index.js';

const PORT = process.env.PORT || 3000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listning on port ${PORT}`);
    })
})
.catch((error) => {
    console.log(`Server listing error => `, error);
})