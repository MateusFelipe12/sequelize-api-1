import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import routes from './routes';
require('./models/index');

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, '../access.log'),
  { flags: 'a' }
);

app.use(morgan('combined', { stream: accessLogStream }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

routes(app);

app.use((req, res) => {
  res.status(404).send('404 - Página não encontrada')
});

const port = 3000
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}!`);
});