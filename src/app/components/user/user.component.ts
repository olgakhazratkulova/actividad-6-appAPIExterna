import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() myUser!: User;

  constructor(
    private usersService: UsersService,
    ) {

  }

  async deleteUser(pId: string | undefined): Promise<void> {
    if(pId !== undefined) {
      try {
        let response = await this.usersService.delete(pId);
        console.log(response);
        if(response) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result: any) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          });
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
