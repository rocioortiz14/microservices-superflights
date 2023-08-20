import { Controller, Post, Req, Body, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { User } from 'src/user/model/user.model';
import { LocalAuthGuard } from './guards/local_auth.guard';

@ApiTags('Authentication')
@Controller('api/v2/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async signIn(@Req() req) {
    console.log(req.user)
    return await this.authService.signIn(req.user);
  }

  @Post('signup')
  async signUp(@Body() user: User) {
    return await this.authService.signUp(user);
  }
}
