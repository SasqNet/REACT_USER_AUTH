// BaseUrl.ts
import dotenv from 'dotenv';

dotenv.config();

const BASE_URL = process.env.NODE_ENV !== 'production'
  ? (process.env.USE_LOCALHOST ? 'http://localhost:8000' : 'http://192.168.0.113:8000')
  : process.env.PRODUCTION_API_URL;

export default BASE_URL;