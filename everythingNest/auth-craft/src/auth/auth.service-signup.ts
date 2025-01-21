import { Injectable } from '@nestjs/common';
import { userMock } from './mock-file';
@Injectable()
export class AuthServiceSignUp {
    signUp(email: string, password: string){
         const userExist = userMock.find(user => user.email === email)
         if(userExist){
            throw new Error('User already exist')
         }
         //create user
         const userCreate = {id: userMock.length + 1, email, password}
         userMock.push(userCreate)

         return userCreate;

    }
}
