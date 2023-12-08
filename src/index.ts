import express from 'express';
import cors from 'cors';
import router from './v1/routes';

const app = express();
const PORT = process.env.PORT || 3000;

app
  .use(express.urlencoded({ extended: false }))
  .use(express.json())
  .use(cors())
  .use('/v1/myths', router)
  .set('json spaces', 2)

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});

export default app;
