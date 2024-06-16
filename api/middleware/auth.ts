import { Request, Response, NextFunction } from 'express';
import { verifyKey } from '@unkey/api';

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers['authorization']?.split(' ').at(1);

  if (!key) {
    return res.status(401).send('Unauthorized');
  }

  const { result, error } = await verifyKey(key);

  if (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }

  if (!result.valid) {
    return res.status(401).send('Unauthorized');
  }

  return next();
};

export default withAuth;
