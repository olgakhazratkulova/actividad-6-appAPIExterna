import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() myUser!: User;

  constructor(private usersService: UsersService) {

  }

  async deleteUser(pId: string | undefined): Promise<void> {
    if(pId !== undefined) {
      try {
        let response = await this.usersService.delete(pId);
        console.log(response);
        if(response) {
          alert('User has been deleted')
        }  
      }
      catch(error) {
        console.log(error)
      }
    }
  }

  ngOnInit(): void {
    console.log(this.myUser);
  }

}
