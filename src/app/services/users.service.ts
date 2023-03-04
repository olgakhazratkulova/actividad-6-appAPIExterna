import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { NewUser } from '../interfaces/new-user.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
  private baseUrl: string = 'https://peticiones.online/api/users/'

  constructor(private httpClient: HttpClient) { }

  getAll(pPage: number = 1): Promise<any> {
    return lastValueFrom(this.httpClient.get<any>(`${this.baseUrl}?page=${pPage}`));
  }

  getUserById(pId: string): Promise<User> {
    return lastValueFrom(this.httpClient.get<User>(`${this.baseUrl}${pId}`));
  }

  create(pUser: NewUser): Promise<NewUser> {
    return lastValueFrom(this.httpClient.post<NewUser>(this.baseUrl, pUser));
  }

  update(pUser: User): Promise<User> {
    return lastValueFrom(this.httpClient.put<User>(`${this.baseUrl}${pUser.id}`, pUser));
  }

  delete(pId: string): Promise<any> {
    return lastValueFrom(this.httpClient.delete<any>(`${this.baseUrl}${pId}`));
  }


}
