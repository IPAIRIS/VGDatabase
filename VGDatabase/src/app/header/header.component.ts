import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

	accType: string = '';

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.authorizeUser();
  }

  authorizeUser()
  {
    var x = document.cookie.split(';');

    for (var i = 0 ; i < x.length; i++) 
    {
      if (x[i].split('=')[0].trim() == 'type') 
      {
        this.accType = x[i].split('=')[1];
      }
      else if (x[i].split('=')[0].trim() == 'loggedIn')
      {
        if (!(x[i].split('=')[1] == 'true'))
        {
          this.logout();
        }
      }
    }
    if (this.accType === undefined) 
    {
      this.logout();
    } 
    else if (this.accType != 'Player' && this.accType != 'Developer' && this.accType != 'Moderator') 
    {
      this.logout();
    }
  }

  logout() 
  {
    document.cookie = "email =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "type =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "loggedIn =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";    
    this.router.navigateByUrl('/login');
  } 
}