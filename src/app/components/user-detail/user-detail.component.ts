import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User | any;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute
    ) {

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(async(params)=> {
      let id: string = params['id'];
      let response: User = await this.usersService.getUserById(id);
      this.user = response;
    })

  }

}
