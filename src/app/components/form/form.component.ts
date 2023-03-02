import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  myForm: FormGroup;

  constructor(private usersService: UsersService) {
    this.myForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required
      ]),
      last_name: new FormControl("", [
        Validators.required
      ]),
      email: new FormControl("", [
        Validators.required
      ]),
      image: new FormControl("", [
        Validators.required
      ]),
    }, [])
  }

  getDataForm() {
    console.log(this.myForm.value);
  }

  checkControl(pControlName: string, pError: string): boolean {
    if(this.myForm.get(pControlName)?.hasError(pError) && this.myForm.get(pControlName)?.touched) {
      return true
    }
    return false
  }

  ngOnInit(): void {

  }


}
