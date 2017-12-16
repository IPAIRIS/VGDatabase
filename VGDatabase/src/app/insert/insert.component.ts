import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

	userForm: FormGroup;
	gameForm: FormGroup;
	reviewForm: FormGroup;
	purchaseForm: FormGroup;
	achievementForm: FormGroup;

	table: string = '';
	aType: string = '';

  loggedIn: boolean = false;
  moderator: boolean = false;

	private tableOptions = [
      { id: 1, val: "User" },
      { id: 2, val: "Game" },
      { id: 3, val: "Review" },
      { id: 4, val: "Purchase" },
      { id: 5, val: "Achievement" }
    ];
	private accTypeOptions = [
      { id: 1, val: "Player" },
      { id: 2, val: "Developer" },
      { id: 3, val: "Moderator" }
    ];

  emailAlreadyExists: boolean = false;
  developerNameAlreadyExists: boolean = false;  
  usernameAlreadyExists: boolean = false;
  developerDoesNotExist: boolean = false;
  playerDoesNotExist: boolean = false;
  gameDoesNotExist: boolean = false;
  numberForGameAlreadyExists: boolean = false;
  success: boolean = false;

  constructor(private fb: FormBuilder,
  				private dataService: DataService,
          private router: Router) 
  {
    this.userForm = fb.group({
  		'Email': [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(100)])],
  		'FirstName': [null, Validators.compose([Validators.required, Validators.maxLength(45)])],
  		'LastName': [null, Validators.compose([Validators.required,  Validators.maxLength(45)])],
  		'Password': [null, Validators.compose([Validators.required, Validators.minLength(8),  Validators.maxLength(45)])],
  		'accountType': [null, Validators.compose([Validators.required])],
  		'Username': [null, Validators.compose([])],
  		'GID': [null, Validators.compose([])],
  		'Name': [null, Validators.compose([])],
  		'Description': [null, Validators.compose([])],
  		'Founded': [null, Validators.compose([])]
  	});

    this.gameForm = fb.group({
  		'Title': [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
  		'UID': [null, Validators.compose([Validators.required])],
  		'ReleaseDate': [null, Validators.compose([Validators.required])],
  		'Description': [null, Validators.compose([Validators.required, Validators.maxLength(1000)])],
  		'Price': [null, Validators.compose([Validators.required])]
  	});

    this.reviewForm = fb.group({
  		'UID': [null, Validators.compose([Validators.required])],
  		'GID': [null, Validators.compose([Validators.required])],
  		'Title': [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
  		'Body': [null, Validators.compose([Validators.required, Validators.maxLength(1000)])],
      'Stars': [null, Validators.compose([Validators.required])]
  	});

  	this.purchaseForm = fb.group({
  		'UID': [null, Validators.compose([Validators.required])],
  		'GID': [null, Validators.compose([Validators.required])],
  	});

  	this.achievementForm = fb.group({
  		'GID': [null, Validators.compose([Validators.required])],
  		'Number': [null, Validators.compose([Validators.required])],
  		'Title': [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
  		'Description': [null, Validators.compose([Validators.required, Validators.maxLength(1000)])],
  		'Points': [null, Validators.compose([Validators.required])]
  	});  	

  	this.userForm.get('accountType').valueChanges.subscribe(

	    (accountType: string) => {

	        if (accountType === 'Player') 
	        {
	            this.userForm.get('Username').setValidators([Validators.required, Validators.maxLength(20)]);
              this.userForm.get('Username').updateValueAndValidity();
	            this.userForm.get('GID').setValidators([]);
              this.userForm.get('GID').updateValueAndValidity();
	            this.userForm.get('Name').setValidators([]);
              this.userForm.get('Name').updateValueAndValidity();
	            this.userForm.get('Description').setValidators([]);
              this.userForm.get('Description').updateValueAndValidity();
	            this.userForm.get('Founded').setValidators([]);
              this.userForm.get('Founded').updateValueAndValidity();
	        } 
	        else if (accountType === 'Developer') 
	        {
	            this.userForm.get('Username').setValidators([]);
              this.userForm.get('Username').updateValueAndValidity();
	            this.userForm.get('GID').setValidators([]);
              this.userForm.get('GID').updateValueAndValidity();
	            this.userForm.get('Name').setValidators([Validators.required,  Validators.maxLength(100)]);
              this.userForm.get('Name').updateValueAndValidity();
	            this.userForm.get('Description').setValidators([Validators.required,  Validators.maxLength(1000)]);
              this.userForm.get('Description').updateValueAndValidity();
	            this.userForm.get('Founded').setValidators([Validators.required]);
              this.userForm.get('Founded').updateValueAndValidity();
	        }
	        else if (accountType === 'Moderator') 
	        {
	            this.userForm.get('Username').setValidators([]);
              this.userForm.get('Username').updateValueAndValidity();
	            this.userForm.get('GID').setValidators([Validators.required]);
              this.userForm.get('GID').updateValueAndValidity();
	            this.userForm.get('Name').setValidators([]);
              this.userForm.get('Name').updateValueAndValidity();
	            this.userForm.get('Description').setValidators([]);
              this.userForm.get('Description').updateValueAndValidity();
	            this.userForm.get('Founded').setValidators([]);
              this.userForm.get('Founded').updateValueAndValidity();
	        }
	    }
	);
  }

  ngOnInit() {
    this.authorizeUser();
  }

  authorizeUser()
  {
    var x = document.cookie.split(';');
    var accType;

    for (var i = 0 ; i < x.length; i++) 
    {
      if (x[i].split('=')[0].trim() == 'type') 
      {
      accType = x[i].split('=')[1];
      }
      else if (x[i].split('=')[0].trim() == 'loggedIn')
      {
        if (x[i].split('=')[1] == 'true')
        {
          this.loggedIn = true;
        }
      }
    }
    if (accType !== undefined && accType == 'Moderator') 
    {
    this.moderator = true;
    }
  }

  logout() 
  {
    document.cookie = "email =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "type =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "loggedIn =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";    
    this.router.navigateByUrl('/login');
  }    

  tableDropDownChanged(val: any) {
    
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;
    this.table = this.tableOptions[val].val;
    console.log(val, this.table);
  }

  accDDChange(val: any)
  {
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;    
  	this.aType = this.accTypeOptions[val].val;    
  }

  userSubmit(post) 
  {
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;

    if (this.aType == 'Developer')
    {
      this.dataService.getUsersFromEmail(post.Email).subscribe((res) => {
        if ( res.length == 0 )
        {
          this.dataService.insertDeveloper(post);
          this.success = true;
        } 
        else 
        {
          this.emailAlreadyExists = true;
        }
      });
    }
    else if (this.aType == 'Player')
    {
      this.dataService.getUsersFromEmail(post.Email).subscribe((res) => {
        if ( res.length == 0 )
        {
          this.dataService.getPlayersFromUsername(post.Username).subscribe((res) => {
            if (res.length == 0)
            {
              this.dataService.insertPlayer(post);
              this.success = true;
            }
            else
            {
              this.usernameAlreadyExists = true;
            }
          });
        } 
        else 
        {
          this.emailAlreadyExists = true;
        }
      });
    }
    else if (this.aType == 'Moderator')
    {
      this.dataService.getUsersFromEmail(post.Email).subscribe((res) => {
        if ( res.length == 0 )
        {
          this.dataService.getGamesFromGID(post.GID).subscribe((res) => {
            if ( res.length == 0 )
            {
              this.gameDoesNotExist = true;
            } 
            else 
            {
              this.dataService.insertModerator(post);
              this.success = true;
            }
          });
        } 
        else 
        {
          this.emailAlreadyExists = true;
        }
      });
    }    
  } 

  gameSubmit(post) 
  {
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;

    this.dataService.getDevelopersFromUID(post.UID).subscribe((res) => {
      if ( res.length == 0 )
      {
        this.developerDoesNotExist = true;
      } 
      else 
      {
        this.dataService.insertGame(post);
        this.success = true;
      }
    });
  }

  reviewSubmit(post) 
  {
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;

    this.dataService.getPlayersFromUID(post.UID).subscribe((res) => {
      if ( res.length == 0 )
      {
        this.playerDoesNotExist = true;
      } 
      else 
      {
        this.dataService.getGamesFromGID(post.GID).subscribe((res) => {
          if ( res.length == 0 )
          {
            this.gameDoesNotExist = true;
          } 
          else 
          {
            this.dataService.insertReview(post);
            this.success = true;
          }
        });        
      }
    });
  }

  purchaseSubmit(post) 
  {
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;

    this.dataService.getPlayersFromUID(post.UID).subscribe((res) => {
      if ( res.length == 0 )
      {
        this.playerDoesNotExist = true;
      } 
      else 
      {
        this.dataService.getGamesFromGID(post.GID).subscribe((res) => {
          if ( res.length == 0 )
          {
            this.gameDoesNotExist = true;
          } 
          else 
          {
            this.dataService.insertPurchase(post);
            this.success = true;
          }
        });        
      }
    });
  }   

  achievementSubmit(post) 
  {
    this.emailAlreadyExists = false;
    this.developerNameAlreadyExists = false;
    this.usernameAlreadyExists = false;
    this.developerDoesNotExist = false;
    this.playerDoesNotExist = false;
    this.gameDoesNotExist = false;
    this.numberForGameAlreadyExists = false;
    this.success = false;

    this.dataService.getGamesFromGID(post.GID).subscribe((res) => {
      if ( res.length == 0 )
      {
        this.gameDoesNotExist = true;
      } 
      else 
      {
        this.dataService.getAchievement(post.GID, post.Number).subscribe((res) => {
          if ( res.length == 0 )
          {
            this.dataService.insertAchievement(post);
            this.success = true;
          } 
          else 
          {
            this.numberForGameAlreadyExists = true;
          }
        }); 
      }
    });
  }   
}
