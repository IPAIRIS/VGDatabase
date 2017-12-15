import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	rForm: FormGroup;
	post: any;
	table: string = '';
	column: string = '';
	query: string = '';
    private tableOptions = [];
    private columnOptions = [];
    private columnHeaders = [];

    loggedIn: boolean = false;
    player: boolean = false;

    queryResult: any[];
    totalPages: number = 0;
	  currentPage: number = 0;
	  pageSize: number = 5;

  constructor(private fb: FormBuilder, 
                private dataService: DataService,
                private router: Router)
  {
    this.rForm = fb.group({
  		'table': [null, Validators.compose([Validators.required])],
  		'column': [null, Validators.compose([Validators.required])],
  		'query': [null, Validators.compose([Validators.required])]
  	});
  }

  ngOnInit() 
  {
    this.authorizeUser();

    if (this.player)
    {
      this.tableOptions = [
      { id: 1, val: "Player" },
      { id: 2, val: "Developer" },
      { id: 3, val: "Game" },
      { id: 4, val: "Review" },
      { id: 5, val: "Achievement" }
      ];
    }
    else
    {
      this.tableOptions = [
      { id: 1, val: "User" },
      { id: 2, val: "Player" },
      { id: 3, val: "Developer" },
      { id: 4, val: "Moderator" },
      { id: 5, val: "Game" },
      { id: 6, val: "Review" },
      { id: 7, val: "Purchase" },
      { id: 8, val: "Achievement" }
      ];
    }    
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
    if (accType !== undefined && accType == 'Player') 
    {
      this.player = true;
    }
  }

  logout() 
  {
    document.cookie = "email =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "type =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "loggedIn =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";    
    this.router.navigateByUrl('/login');
  }    

  formSubmit(post) 
  {
  	this.table = post.table;
  	this.column = post.column;
  	this.query = post.query;

    if (this.table == 'User') 
    {
    	if (this.column == 'UID') 
    	{
    		this.dataService.getUsersFromUID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'Email')
    	{
    		this.dataService.getUsersFromEmail(this.query).subscribe( res => this.getResult(res));
    	}
    	else if (this.column = 'Last Name')
    	{
    		this.dataService.getUsersFromLastName(this.query).subscribe( res => this.getResult(res));
    	}    	
    }
    else if (this.table == 'Player') 
    {
    	if (this.column == 'UID') 
    	{
    		this.dataService.getPlayersFromUID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'Username')
    	{
    		this.dataService.getPlayersFromUsername(this.query).subscribe( res => this.getResult(res));
    	}    	
    }
    else if (this.table == 'Developer') 
    {
    	if (this.column == 'UID') 
    	{
    		this.dataService.getDevelopersFromUID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'Name')
    	{
    		this.dataService.getDevelopersFromName(this.query).subscribe( res => this.getResult(res));
    	}   	
    }
    else if (this.table == 'Moderator') 
    {
    	if (this.column == 'UID') 
    	{
    		this.dataService.getModeratorsFromUID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'GID')
    	{
    		this.dataService.getModeratorsFromGID(this.query).subscribe( res => this.getResult(res));
    	}     	
    }
    else if (this.table == 'Game') 
    {
    	if (this.column == 'GID') 
    	{
    		this.dataService.getGamesFromGID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'Title')
    	{
    		this.dataService.getGamesFromTitle(this.query).subscribe( res => this.getResult(res));
    	}
    	else if (this.column = 'Developer Name')
    	{
    		this.dataService.getGamesFromDeveloperName(this.query).subscribe( res => this.getResult(res));
    	}
    }
    else if (this.table == 'Review') 
    {
    	if (this.column == 'UID') 
    	{
    		this.dataService.getReviewsFromUID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'Username')
    	{
    		this.dataService.getReviewsFromUsername(this.query).subscribe( res => this.getResult(res));
    	}
    	else if (this.column = 'GID')
    	{
    		this.dataService.getReviewsFromGID(this.query).subscribe( res => this.getResult(res));
    	}  
    	else if (this.column = 'Game Title')
    	{
    		this.dataService.getReviewsFromGameTitle(this.query).subscribe( res => this.getResult(res));
    	}    	  	
    }    
    else if (this.table == 'Purchase')
    {
    	if (this.column == 'UID') 
    	{
    		this.dataService.getPurchasesFromUID(this.query).subscribe( res => this.getResult(res));
    	} 
    	else if (this.column == 'Username')
    	{
    		this.dataService.getPurchasesFromUsername(this.query).subscribe( res => this.getResult(res));
    	}
    	else if (this.column = 'GID')
    	{
    		this.dataService.getPurchasesFromGID(this.query).subscribe( res => this.getResult(res));
    	}  
    	else if (this.column = 'Game Title')
    	{
    		this.dataService.getPurchasesFromGameTitle(this.query).subscribe( res => this.getResult(res));
    	}    	
    }
    else
    {
    	if (this.column = 'GID')
    	{
    		this.dataService.getAchievementsFromGID(this.query).subscribe( res => this.getResult(res));
    	}  
    	else if (this.column = 'Game Title')
    	{
    		this.dataService.getAchievementsFromGameTitle(this.query).subscribe( res => this.getResult(res));
    	}    	
    }  	
  }

  getResult(res) {
  	this.queryResult = res;
  	this.totalPages = Math.ceil(( this.queryResult.length) / this.pageSize);
  	this.currentPage = 1;
  }  

  firstDropDownChanged(val: any) {
  	this.queryResult = [];
    const obj = this.tableOptions[val];
    console.log(val, obj);

    if (!obj) return;

    if (obj.id == 1) 
    {
      if (this.player)
      {
        this.columnOptions = ["UID", "Username"];
        this.columnHeaders = ["UID", "Username"];
      }
      else
      {
        this.columnOptions = ["UID", "Email", "Last Name"];
        this.columnHeaders = ["UID", "Email", "First Name", "Last Name"];
      }
    }
    else if (obj.id == 2) 
    {
      if (this.player)
      {
        this.columnOptions = ["UID", "Name"];
        this.columnHeaders = ["UID", "Name"];
      }
      else
      {
        this.columnOptions = ["UID", "Username"];
        this.columnHeaders = ["UID", "Username"];
      }
    }
    else if (obj.id == 3) 
    {
      if (this.player)
      {
        this.columnOptions = ["GID", "Title", "Developer Name"];
        this.columnHeaders = ["GID", "Title", "Developer"];
      }
      else
      {
        this.columnOptions = ["UID", "Name"];
        this.columnHeaders = ["UID", "Name"];
      }
    }
    else if (obj.id == 4) 
    {
      if (this.player)
      {
        this.columnOptions = ["UID", "Username", "GID", "Game Title"];
        this.columnHeaders = ["UID", "Username", "Game Title", "Rating"];
      }
      else
      {
        this.columnOptions = ["UID", "GID"];
        this.columnHeaders = ["UID", "GID"];
      }
    }
    else if (obj.id == 5) 
    {
      if (this.player)
      {
        this.columnOptions = ["GID", "Game Title"];
        this.columnHeaders = ["Number", "GID", "Game Title", "Name" , "Points"];
      }
      else
      {
        this.columnOptions = ["GID", "Title", "Developer Name"];
        this.columnHeaders = ["GID", "Title", "Developer"];
      }
    }
    else if (obj.id == 6) 
    {
      if (this.player)
      {}
      else
      {
        this.columnOptions = ["UID", "Username", "GID", "Game Title"];
        this.columnHeaders = ["UID", "Username", "Game Title", "Rating"];
      }
    }    
    else if (obj.id == 7)
    {
      if (this.player)
      {}
      else
      {
        this.columnOptions = ["GID", "UID", "Username", "Game Title"];
        this.columnHeaders = ["GID", "UID", "Username", "Title"];
      }
    }
    else
    {
      if (this.player)
      {}
      else
      {
        this.columnOptions = ["GID", "Game Title"];
        this.columnHeaders = ["Number", "GID", "Game Title", "Name" , "Points"];
      }
    }
  } 

  nextPage() 
  {
  	this.currentPage++;
  }

  prevPage() 
  {
  	this.currentPage--;
  }  

}
