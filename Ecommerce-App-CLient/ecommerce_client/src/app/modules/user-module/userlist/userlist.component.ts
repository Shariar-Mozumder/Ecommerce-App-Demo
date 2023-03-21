import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/ecommerce-services/user.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{
  lstUser : any
  constructor(private userService: UserService){

  }

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.userService.getUserList().subscribe((res: any) => {
      console.log(res);
      this.lstUser=res.responseObj;
      console.log(res);

    });
  }
}
