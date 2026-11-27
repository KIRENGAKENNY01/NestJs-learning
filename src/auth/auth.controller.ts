import { Controller, HttpCode, Post,Body, Get, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthGuard } from './guard/auth/auth.guard.js';

@Controller('auth')
export class AuthController {
     constructor(private authService: AuthService) {}

    @HttpCode(201)
    @Post('login')
    login(@Body() input: {username: string, password: string }) {
       return this.authService.authenticate(input);
     }

    @UseGuards(AuthGuard)
    @Get('me')
    getUserInfo(@Request() request:{ user: any }){ 
      return request.user
     }

}
