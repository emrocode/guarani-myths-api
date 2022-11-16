import express from 'express';
import path from 'path';
import cors from 'cors';
import router from './v1/routes';
import { createServer } from 'http';

const app = express();
const PORT = process.env.PORT || 3000;

app
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors())
  .use('/v1/myths', router)
  .set('json spaces', 2)
  .get('/', (_req, res) =>
    res.sendFile(path.join(__dirname) + '/assets/index.html')
  );

const server = createServer(app);

server.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

export { server };
