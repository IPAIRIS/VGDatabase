import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

	rForm: FormGroup;
	post: any;
	email: string = '';
	accountType: string = '';
	password: string = '';

	failedLogin: boolean = false;
	user: any[];

  constructor(private dataService: DataService,
  				private router: Router,
  				private fb: FormBuilder) 
  { 
  	this.rForm = fb.group({
  		'email': [null, Validators.compose([Validators.required, Validators.email])],
  		'password': [null, Validators.compose([Validators.required])],
  		'accountType': [null, Validators.compose([Validators.required])]
  	});
  }

  ngOnInit()
  {

  	var x = document.cookie.split(';');
  	var i = 0;

  	for ( ; i < x.length; i++) 
  	{
  		if (x[i].split('=')[0].trim() == 'loggedIn') 
  		{
  			if (x[i].split('=')[1] == 'true'){
  				this.router.navigateByUrl('/home');	
  			}
  		}
  	}
  }

  formSubmit(post) 
  {
  	this.failedLogin = false;
  	this.email = post.email;
  	this.password = post.password;
  	this.accountType = post.accountType;

  	if (this.accountType == 'Developer')
  	{
  		this.loginDeveloper();
  	} 
  	else if (this.accountType == 'Player')
  	{
  		this.loginPlayer();
  	} 
  	else if (this.accountType == 'Moderator')
  	{
  		this.loginModerator();
  	}
  }

  loginDeveloper() 
  {
  	this.dataService.getDeveloperFromEmail(this.email).subscribe((response) => 
  		{
  			this.user = response;

		  	if (this.user && this.user.length) 
		  	{
		  		if (this.user[0].Email == this.email && this.user[0].Password == this.password) 
		  		{
		  			document.cookie = "email = " + this.email;
		  			document.cookie = "type = Developer";
		  			document.cookie = "loggedIn = true";

		  			this.router.navigateByUrl('/home');
		  		} 
		  		else 
		  		{
		  			this.loginFail();
		  		}
		  	} 
		  	else
		  	{
		  		this.loginFail();
		  	}
  		});
  }

  loginPlayer() 
  {	  
  	this.dataService.getPlayerFromEmail(this.email).subscribe((response) => 
  		{
  			this.user = response;

		  	if (this.user && this.user.length) 
		  	{
		  		if (this.user[0].Email == this.email && this.user[0].Password == this.password) 
		  		{
		  			document.cookie = "email = " + this.email;
		  			document.cookie = "type = Player";
		  			document.cookie = "loggedIn = true";

		  			this.router.navigateByUrl('/home');
		  		} 
		  		else 
		  		{
		  			this.loginFail();
		  		}
		  	} 
		  	else
		  	{
		  		this.loginFail();
		  	}
  		});
  }

  loginModerator() 
  {
  	this.dataService.getModeratorFromEmail(this.email).subscribe((response) => 
  		{
  			this.user = response;

		  	if (this.user && this.user.length) 
		  	{
		  		if (this.user[0].Email == this.email && this.user[0].Password == this.password) 
		  		{
		  			document.cookie = "email = " + this.email;
		  			document.cookie = "type = Moderator";
		  			document.cookie = "loggedIn = true";

		  			this.router.navigateByUrl('/home');
		  		} 
		  		else 
		  		{
		  			this.loginFail();
		  		}
		  	} 
		  	else
		  	{
		  		this.loginFail();
		  	}
  		});
  }

  loginFail() 
  {
	this.failedLogin = true;
	this.email = '';
	this.password = '';
	this.accountType = '';
	document.cookie = "email =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "type =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
	document.cookie = "loggedIn =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }

}
