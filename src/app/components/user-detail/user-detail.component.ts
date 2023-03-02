import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  arrUsers: User[] = [];

  constructor(private usersService: UsersService) {

  }

  async ngOnInit(): Promise<void> {
    try {
      let response = await this.usersService.getAll();
      this.arrUsers = response.results;
      console.log(this.arrUsers);  
    }
    catch(error) {
      console.log(error);
    }

  }

}
