import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';
import { defaultBlurDataUrl } from '@/constants';


export async function createBlurDataURL(imagePreview: string) {
  try {
    const imagePath = path.join(process.cwd(), 'public', imagePreview);
    const buffer = await sharp(imagePath).resize({ width: 24 }).webp({ quality: 20 }).toBuffer();
    return `data:image/webp;base64,${buffer.toString('base64')}`;
  } catch (error) {
    console.error(error);
    return defaultBlurDataUrl;
  }
}
