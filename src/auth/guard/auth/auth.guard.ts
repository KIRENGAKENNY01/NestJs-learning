import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';


// for protected Endpoint 
@Injectable()
export class AuthGuard implements CanActivate {
   constructor(private jwtService:JwtService) {}
  
  
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest(); // To get the current request 
    const authorization = request.headers.authorization;  // 'Bearer <token>'
    const token = authorization?.split(' ')[1];  // extract token 

    if(!token){ 
      throw new UnauthorizedException(); 
    }

    try{ 
      const payload = await this.jwtService.verifyAsync(token);   // validate token 
      /**
       * Verifies that the JWT signature is valid.
         Returns the decoded payload from the JWT.
       */
      request.user = payload
      return true; 
    }catch(error){ 
      throw new UnauthorizedException(); 
    }
  }
}
