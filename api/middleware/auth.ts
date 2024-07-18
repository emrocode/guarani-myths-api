import { Request, Response, NextFunction } from 'express';
import { verifyKey } from '@unkey/api';

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
  const key = req.headers['authorization']?.split(' ').at(1);

  if (!key) {
    res.status(401).send({
      error: 'Unauthorized: Missing API key',
    });
    return;
  }

  try {
    const { result } = await verifyKey(key);

    if (!result?.valid) {
      res.status(401).send({ error: 'Unauthorized: Invalid API key' });
      return;
    }

    next();
  } catch (error) {
    console.error('Error verifying API key:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export default withAuth;
