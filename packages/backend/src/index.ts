import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import multer from '@koa/multer';
import { processCSV } from './services/csvProcessor';
import { createErrorResponse } from './utils/errorHandler';

const app = new Koa();
const router = new Router();

// Middleware for error handling
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error(err);
    const errorResponse = createErrorResponse(err as Error);
    ctx.status = errorResponse.status;
    ctx.body = errorResponse;
  }
});

// Enable CORS
app.use(cors());

// File upload configuration
const upload = multer({
  dest: 'upload/',
  limits: { fileSize: 400 * 1024 * 1024 }, // 400 MB limit
});

// API Routes
router.post('/upload', upload.single('file'), async (ctx) => {
  const file = ctx.file;

  if (!file) {
    ctx.status = 400;
    ctx.body = { error: 'No file uploaded' };
    return;
  }

  if (!file.mimetype.includes('csv')) {
    ctx.status = 400;
    ctx.body = { error: 'Only CSV files are allowed' };
    return;
  }

  try {
    const zipBuffer = await processCSV(file.path);
    ctx.set('Content-Disposition', 'attachment; filename=result.zip');
    ctx.body = zipBuffer;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: error instanceof Error ? error.message : 'Server error' };
  }
});

app.use(router.routes()).use(router.allowedMethods());

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
