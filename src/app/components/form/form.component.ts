import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/interfaces/new-user.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title: string = 'NEW';
  myForm: FormGroup;
  emailPattern: string = '^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$';
  imageUrlPattern: string = '\bhttps?:\/\/\S+\.(jpg|jpeg|png|gif)\b';

  constructor(
    private usersService: UsersService,
    private router: Router,
    private ativatedRoute: ActivatedRoute
    ) {
    this.myForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required
      ]),
      last_name: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.emailPattern)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(this.imageUrlPattern)
      ]),
    }, [])
  }

  async getDataForm() {
    let user = this.myForm.value;
    if(user.id) {
      try {
        let response = await this.usersService.update(user);
        console.log(response);
        if(response.id) {
          alert(`User ${response.first_name} with id ${response.id} has been updated succesfully`);
          this.router.navigate([`home`])  
        }
      }
      catch(error) {
        console.log(error);
       }
      
    }else {
      try {
        let response = await this.usersService.create(user);
        console.log(response);
        if(response.id) {
          alert(`User ${response.first_name} with id ${response.id} has been created succesfully`);
          this.router.navigate([`home`])
        }
       } 
       catch(error) {
        console.log(error);
       }
    
    }
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.myForm.get(pControlName)?.hasError(pError) && this.myForm.get(pControlName)?.touched) {
      return true
    }
    return false
  }

  ngOnInit(): void {
    this.ativatedRoute.params.subscribe(async(params : any) => {
      let id = params.id;
      if(id) {
        this.title = 'UPDATE';
        let response = await this.usersService.getUserById(id);
        let user: User = response;

        this.myForm = new FormGroup({
          id: new FormControl(id, []),
          first_name: new FormControl(user?.first_name, []),
          last_name: new FormControl(user?.last_name, []),
          email: new FormControl(user?.email, []),
          image: new FormControl(user?.image, []),
        }, [])
    
      }
    })
  }


}
