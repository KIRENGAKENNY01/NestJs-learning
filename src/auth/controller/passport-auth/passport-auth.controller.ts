import { Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Req, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../../auth.service.js';
import { PassportLocalGuard } from '../../guard/passport-local/passport-local.guard.js';
import { PassportJwtGuard } from '../../guard/passport-jwt/passport-jwt.guard.js';
import { request } from 'http';

@Controller('auth-v2')
export class PassportAuthController {
constructor(private authService:AuthService){}

@HttpCode(HttpStatus.OK)
@Post('login')
@UseGuards(PassportLocalGuard)
login(@Request() request: { user: any }){
    return this.authService.signIn(request.user);
}

@Get('me')
@UseGuards(PassportJwtGuard)
getUserInfo(@Request() request:{ user: any }){
    return request.user;  
}

}
