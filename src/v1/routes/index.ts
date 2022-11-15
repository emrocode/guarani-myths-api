import express from 'express';
import _ from 'underscore';
import mythsData from '../../json/data.json';
import { Response } from '../../types';

const router = express.Router();
const myths: Array<Response> = mythsData;

router
  .get('/', (_req, res) => res.status(200).send(myths))
  .get('/:id', (req, res) => {
    const id: number = +req.params.id;
    const myth = myths.find((obj) => obj.id === id);

    if (myth) return res.status(200).send(myth);
    if (id <= 0) return res.status(500).redirect('/v1/myths/1');
    if (id >= 9) return res.status(500).redirect('/v1/myths/8');
  })
  .post('/', (req, res) => {
    const { name, description, image } = req.body;
    if (name && description && image) {
      const id = myths.length + 1;
      const newData = { id, ...req.body };
      myths.push(newData);
      return res.send(myths);
    } else {
      return res.status(500).send('bad request');
    }
  })
  .put('/:id', (req, res) => {
    const id: number = +req.params.id;
    const { name, description, image } = req.body;
    if (name && description && image) {
      _.each(myths, item => {
        if (item.id == id) {
          item.name = name;
          item.description = description;
          item.image = image;
        }
      });
      return res.status(200).send(myths);
    } else {
      return res.status(404).send({ error: 'Sorry, cant find that' });
    }
  })
  .delete('/:id', (req, res, _next) => {
    const id: number = +req.params.id;
    _.each(myths, (item, i) => {
      if (item.id == id) {
        myths.splice(i, 1);
        return res.status(200).send(`Item ${id} has been deleted`);
      }
    });
    return res.status(200).send(myths);
  });

export default router;
