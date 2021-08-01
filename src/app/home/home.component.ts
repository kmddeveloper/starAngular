//ng g c home/home --flat
import { Component, OnInit } from '@angular/core';
import {UserService} from '../core/services/user.service'
import {User} from '../core/models/User';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
              '../../assets/main/css/styles.css',
              './home.component.css'
             ]
})


export class HomeComponent implements OnInit {
  public users:User[]=[];


  constructor(private userService: UserService) { }
 
  ngOnInit(): void {
    
    this.userService.getUser().subscribe((data:User)=>{
        console.log(data);
        this.users.push(data);
        console.log(this.users);
    });    
  
   /*
    this.userService.getUser()
        .toPromise()
        .then(
          data => 
          {
          console.log(data);
          this.users.push(data);
          }
          );
          */
  }

}
