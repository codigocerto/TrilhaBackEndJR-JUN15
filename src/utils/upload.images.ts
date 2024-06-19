import {
  BadRequestException,
  HttpException,
  UnsupportedMediaTypeException,
} from '@nestjs/common';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { FileDTO } from '../users/dto/file.dto';
import { appFireBase } from '../config/firebase.config';

export async function uploadImage(image: FileDTO) {
  try {
    const storage = getStorage(appFireBase);
    if (!image) {
      throw new BadRequestException('Image file is required.');
    }

    if (!image.mimetype.startsWith('image/')) {
      throw new UnsupportedMediaTypeException('Only image files are allowed.');
    }

    const extension = image.originalname.split('.').pop();

    const formattedFilename = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${extension}`;

    const storageRef = ref(storage, formattedFilename);

    const buffer = Buffer.from(image.buffer);

    await uploadBytesResumable(storageRef, buffer, {
      contentType: image.mimetype,
    });

    const url = await getDownloadURL(storageRef);
    const imageURL = url;

    return imageURL;
  } catch (error) {
    throw new HttpException(error.message, error.status);
  }
}
