import express, { Request, Response, NextFunction } from 'express';
import { withAuth as auth } from '../../middleware';
import { sanitizeString } from '../../utils';
import _ from 'underscore';
import mythsData from '../../json/db.json';
import { Myths } from '../../types';

const router = express.Router();
const myths: Array<Myths> = mythsData;

router
  .get('/', (_req: Request, res: Response) => res.status(200).send(myths))
  .get('/:id', (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const myth = myths.find(obj => obj.id === id);

    if (id <= 0) return res.status(500).redirect('/api/v1/myths/1');
    if (id >= 9) return res.status(500).redirect('/api/v1/myths/8');
    if (myth) res.status(200).send(myth);
  })
  .get('/name/:name', (req: Request, res: Response) => {
    const name: string = req.params.name;
    const myth = myths.filter(obj =>
      sanitizeString(obj.name.toLowerCase()).includes(name)
    );

    if (myth.length > 0) return res.status(200).send(myth);
    return res.status(404).send({ error: 'No myth has been found' });
  })
  .post('/', auth, (req: Request, res: Response) => {
    const { name, description, image } = req.body;

    if (name && description && image) {
      const id = myths.length + 1;
      const newData = { id, ...req.body };
      myths.push(newData);
      return res.status(201).send(myths);
    } else {
      return res.status(400).send({ error: 'Missing required fields' });
    }
  })
  .put('/:id', auth, (req: Request, res: Response) => {
    const id: number = +req.params.id;
    const { name, description, image } = req.body;

    if (isNaN(id) || id <= 0 || id > myths.length) {
      return res.status(404).send({ error: 'Invalid ID' });
    }

    if (!(name || description || image)) {
      return res.status(400).send({ error: 'Missing required fields' });
    }

    _.each(myths, item => {
      if (item.id === id) {
        item.name = name;
        item.description = description;
        item.image = image;
      }
    });

    return res.status(200).send(myths);
  })
  .delete('/:id', auth, (req: Request, res: Response, _next: NextFunction) => {
    const id: number = +req.params.id;
    _.each(myths, (item, i) => {
      if (item.id === id) {
        myths.splice(i, 1);
        return res.status(200).send({
          success: `Item ${id} has been deleted`,
        });
      }
    });
    return res.status(200).send(myths);
  });

export default router;
