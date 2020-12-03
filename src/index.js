import express from 'express';
import router from './routers.js';
import * as dotenv from 'dotenv'
dotenv.config();

const app = express();
app.use(express.json())
const PORT = process.env.PORT || 3000

app.use(router);

app.listen(PORT, () => console.log(`Todo List API started! on ${PORT}`));
