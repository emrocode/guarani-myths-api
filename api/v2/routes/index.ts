import express, { Request, Response } from 'express';
import getMythModel from '../../db/schemas';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const lang = (req.query.lang as string) || 'en';
  const id = req.query.id ? (+req.query.id as number) : null;
  const collectionName = `myths_${lang}`;
  const Myth = getMythModel(collectionName);

  try {
    const data = id ? await Myth.find({ id: id }) : await Myth.find();

    if (!id) return res.status(200).json(data);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error fetching myths' });
  }
});

export default router;
