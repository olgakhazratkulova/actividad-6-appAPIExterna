import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NewUser } from 'src/app/interfaces/new-user.interface';
import { User } from 'src/app/interfaces/user.interface';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  title: string = 'NEW';
  myForm: FormGroup;
  editing: boolean = false;

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
        Validators.pattern(/^\S+\@\S+\.[com,es,ru]/)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)
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
          Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result: any) => {
            if (result.isConfirmed) {
              Swal.fire('Saved!', '', 'success')
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
            this.router.navigateByUrl('/user/' + user?.id)
          })
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
          Swal.fire(
            'Done!',
            'New user has been created!',
            'success'
          );
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
        this.editing = true;

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
