import dotenv from 'dotenv';
import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors({
  origin: process.env.WEB_ORIGIN,
  credentials: true
}));
app.use(cookieParser());
app.use(morgan('combined'));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.get('/healthz', (_req, res) => {
  res.json({ ok: true });
});

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});