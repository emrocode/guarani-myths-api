import { Request, Response, NextFunction } from 'express';
import { verifyKey } from '@unkey/api';

const withAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const key = authHeader?.toString().replace('Bearer ', '');
  const apiId = process.env.UNKEY_API_ID ?? '';

  if (!key) return res.status(401).send({ error: 'Unauthorized' });

  try {
    const { result } = await verifyKey({ key, apiId });

    if (!result?.valid) return res.status(401).send({ error: 'Unauthorized' });

    next();
  } catch (error) {
    console.error('Error verifying API key:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export default withAuth;
