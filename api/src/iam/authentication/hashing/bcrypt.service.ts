import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { HashingService } from './hashing.service';

@Injectable()
export class BcryptService implements HashingService {
  private salt = 10;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.salt);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
