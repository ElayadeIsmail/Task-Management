import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-up')
  async signUp(
    @Body() body: SignUpDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authenticationService.signUp(body, response);
  }
}
