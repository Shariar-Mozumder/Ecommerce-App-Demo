import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/ecommerce-services/user.service';
import { RequestMessage } from 'src/app/services/model/RequestMessage';
import { User } from 'src/app/services/model/User';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  userForm!: FormGroup;
  user!: User;
  userId:number=0;
  requestMessage:RequestMessage= new RequestMessage();

  constructor(private fb: FormBuilder,private toastr: ToastrService, private userService: UserService,private _router: Router, private _avRoute: ActivatedRoute){}
  ngOnInit(): void {
    this.userId = this._avRoute.snapshot.params['id'] > 0?this._avRoute.snapshot.params['id']:0;
    this.createForm();
    this.getUserById();

  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      gender: new FormControl('male'),
      isAdmin: new FormControl(true),
    });
  }

  getUserById() {
    const data = {
      MyID:this._avRoute.snapshot.params['id']

    };
    console.log('aaaaa',data);

    this.requestMessage.RequestObj=data;

    this.userService.getUserById(this.requestMessage).subscribe(data => {
      console.log("res",data);
      const res = data.responseObj;

      this.userForm = this.fb.group({
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        password: res.password,
        gender: new FormControl(res.gender),
        isAdmin: new FormControl(res.isAdmin),
      });
    });
  }

  onSave() {
    const user = {
      UserID:this.userId,
      FirstName: this.userForm.value.firstName,
      LastName: this.userForm.value.lastName,
      Email: this.userForm.value.email,
      Password: this.userForm.value.password,
      Gender: this.userForm.controls['gender'].value,
      IsAdmin: this.userForm.controls['isAdmin'].value,
    };

    this.requestMessage.RequestObj=user;
    this.userService.addUser(this.requestMessage).subscribe((res: any) => {
      console.log(res);
      this._router.navigate(['/user-list']);
    });
  }


  onUpdate() {
    const user = {
      UserID:this.userId,
      FirstName: this.userForm.value.firstName,
      LastName: this.userForm.value.lastName,
      Email: this.userForm.value.email,
      Password: this.userForm.value.password,
      Gender: this.userForm.controls['gender'].value,
      IsAdmin: this.userForm.controls['isAdmin'].value,
    };

    this.requestMessage.RequestObj=user;
    this.userService.addUser(this.requestMessage).subscribe((res: any) => {
      console.log(res);
      this._router.navigate(['/user-list']);
    });
  }

  saveOrUpdateUser() {
    if (this.userId>0){
      this.onUpdate();
    } else {
      this.onSave();
    }

  }

}


