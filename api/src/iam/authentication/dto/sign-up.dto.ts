import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class SignUpDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9_-]{4,12}$/, {
    message:
      'Username must be 4-12 characters long and can only contain letters, numbers, underscores, and hyphens',
  })
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number or special character',
  })
  password: string;

  @IsNotEmpty()
  @Match('password', { message: "confirmPassword doesn't match password" })
  confirmPassword: string;
}
