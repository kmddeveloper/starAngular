import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../../assets/main/css/styles.css',
              './nav.component.css',
              
             ]
})
export class NavComponent implements OnInit {

  title: string = "Star Jamboree"
  navItems:any = [
    {
      index: 0,
      name: "Home",
      routePath: "home",
      queryParams: '',
      active: "active"
     },
     {
      index: 1,
      name: "Products",
      routePath: "product",
      queryParams: {'pagenum':1, 'pagesize':10, 'categoryid':1},
      active: ""
     },
     {
      index: 2,
      name: "Login",
      routePath:  "login",
      queryParams: '',
      active: ""
      },
      {
        index: 3,
        name: "register",
        routePath:  "register",        
        active: ""
      },
      {
       index: 4,
       name: "Contact",
       routePath:  "contact",
       queryParams: '',
       active: ""
     }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getRouteParams(params:any):string{
     if (params && params.length > 0){
         return params.join(", ");        
     }
     return '';


  }
  selectedMenu(e) {
    let item = e.getAttribute('menu-item');
    this.navItems.forEach(element => {
      if (element.index == item)
          element.active="active";
      else
          element.active="";            
    });      
  }

}
