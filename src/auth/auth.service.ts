import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service.js';
import { JwtService } from '@nestjs/jwt';

type AuthInput = { username:string, password:string}
type SignInResponse = { userId: number, username: string}
type AuthResult = { accessToken: string ,userId: number, username: string}

@Injectable()
export class AuthService {
    // The way they use services in other serviecs is by using @Injectable() decorator and then injecting the service in the constructor of the class. 
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}


async authenticate(input: AuthInput): Promise<AuthResult> {
    const user = await this.validateUser(input); 

    if(!user){ 
     throw new UnauthorizedException(); 
    }
    return this.signIn(user); 
}






/**
 * The logic behind is that validateUser retrieves user's record seeing if the input name given exists in the database.
 *  and then checks password
 *   then returns userId and username
 */

async validateUser(input: AuthInput): Promise<SignInResponse | null> {
    const user = await this.usersService.findUserByName(input.username); 
    if(user && user.password === input.password){ 
        return { 
            userId: user.userId, 
            username: user.username
        }
    }
    return null; 
}


async signIn(input:SignInResponse): Promise<AuthResult> {
    const tokenPayload = {
        sub: input.userId, 
        username: input.username
    }

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, username:input.username , userId:input.userId}
}

}


