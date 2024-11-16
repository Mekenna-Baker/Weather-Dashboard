import path from 'path';
import { Router } from 'express';
import { fileURLToPath } from 'url';

const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// TODO: Define route to serve index.html

router.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

export default router;
