//ng g c home/home --flat
import { Component, OnInit } from '@angular/core';
import {UserService} from 'src/app/core/services/user/user.service'
import {User} from '../core/models/User';
import { StateService } from 'src/app/core/services/state/state.service';
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

  firstName:string='';
  constructor(private userService: UserService, private currentState:StateService) { }
 
  ngOnInit(): void {
    
    this.currentState.state$.subscribe({
        next: state=> {
          this.firstName= state.first_name
        },
        error: error => {
            console.log('home get state error=', error);
        },
        complete: ()=> {
          console.log('home get state completed');
        }
    });
    //this.userService.getUser().subscribe((data:User)=>{
    //    console.log(data);
    //    this.users.push(data);
    //    console.log(this.users);
    //});    
  
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
