import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() 
  {
  	this.authorize();
  }

  authorize() 
  {
  	var x = document.cookie.split(';');
  	var i = 0;
  	var loggedIn;

  	for ( ; i < x.length; i++) 
  	{
  		if (x[i].split('=')[0].trim() == 'loggedIn') 
  		{
  			loggedIn = x[i].split('=')[1];
  			break;
  		}
  	}

  	if(loggedIn === undefined || loggedIn == 'false') {
  		this.router.navigateByUrl('/login');
  	}
  }
}
