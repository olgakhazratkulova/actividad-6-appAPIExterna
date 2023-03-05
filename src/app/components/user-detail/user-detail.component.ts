import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  

  user: User | any;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params)=> {
      let id: string = params['id'];
      let response: User = await this.usersService.getUserById(id);
      this.user = response;
    })

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
              );
              this.router.navigate([`home`])
            }
          });
        }  
      }
      catch(error) {
        console.log(error)
      }
    }
  }


}
