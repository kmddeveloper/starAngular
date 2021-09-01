import { Component, OnInit } from '@angular/core';
import { PRIMARY_OUTLET, Router, RoutesRecognized, UrlSerializer } from '@angular/router';
import { StateService } from 'src/app/core/services/state/state.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../assets/main/css/styles.css',
              './nav.component.css',              
             ]
})
export class NavComponent implements OnInit {

  private role:string;
  title: string = "Star Jamboree"
  userName: string = "Hi Guest";


  navItems:any = [
    {
      index: 0,
      name: "Home",
      routePath: "home",
      queryParams: '',
      active: "active",      
      roles: ['guest', 'user', 'admin']      
     },
     {
      index: 1,
      name: "Products",
      routePath: "product",
      queryParams: {'pagenum':1, 'pagesize':10, 'categoryid':1},
      active: "",
      roles: ['guest', 'user', 'admin']      
     },
     {
      index: 2,
      name: "Login",
      routePath:  "login",
      queryParams: '',
      active: "",
      roles: ['guest']      
      },
      {
        index: 3,
        name: "register",
        routePath:  "register",        
        active: "",
        roles: ['guest']      
      },
      {
       index: 4,
       name: "Contact",
       routePath:  "contact",
       queryParams: '',
       active: "",
       roles: ['guest', 'user', 'admin']      
     },
     {
      index: 5,
      name: "Logout",
      routePath:  "logout",
      queryParams: '',
      active: "",
      roles: ['user', 'admin']      
     }
  ];

  constructor(private router: Router, private urlSerializer:UrlSerializer, private stateService:StateService) {}
 
  ngOnInit(): void {

    this.role='guest';
    

    this.stateService.state$.subscribe({
      next: state=>{   
            console.log('nav subscribe state role=', state.role)     ;
            this.role=state.role;
            this.userName=state.first_name;
      },
      error: error => {
          console.log('nav subsribe error=', error);
      }
    });
    this.selectActiveMenu();    
  }

  private selectActiveMenu(){  
    this.router.events.forEach((event) => {         
      if(event instanceof RoutesRecognized ) {            
        if (event && event.url){          
          let urlTree = this.urlSerializer.parse(event.url);                     
           if (urlTree.root){
              let children = urlTree.root.children;              
              if (children){
                  let primary= children[PRIMARY_OUTLET];                 
                  if (primary){
                    let segments = primary.segments;
                    if (segments && segments.length > 0){
                        let currentRoute= segments[0].path;                              
                        console.log('currentRoute',currentRoute);
                         this.navItems.forEach(element => {                          
                            if (element.routePath == currentRoute)
                               element.active="active";                                                           
                           else
                               element.active="";            
                          }); 
                    }                   
                  }
              }
           }           
        }
        return false;
    }});
  }

  getRouteParams(params:any):string{
     if (params && params.length > 0){
         return params.join(", ");        
     }
     return '';
  }

  selectedMenu(e) {

    //let item = e.getAttribute('menu-item');
    //this.navItems.forEach(element => {
    //  if (element.index == item)
     //     element.active="active";
     // else
     //     element.active="";            
    //});      
  }
}
