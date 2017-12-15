import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})
export class BrowseComponent implements OnInit {

	queryResult: any[];
	private tableOptions = [];
    private columnHeaders = [];
    table: string = '';
    totalPages: number = 0;
	currentPage: number = 0;
	pageSize: number = 5;
  loggedIn: boolean = false;
  player: boolean = false;

  constructor(private dataService: DataService,
              private router: Router) { }

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

  goToGame(gid)
  {
    this.router.navigateByUrl('/game/' + gid);
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

  tableDropDownChanged(val: any) {
  	this.queryResult = [];
    const obj = this.tableOptions[val];
    console.log(val, obj);

    if (!obj) return;

    if (obj.id == 1) 
    {
      if (this.player)
      {
        this.columnHeaders = ["UID", "Username"];
        this.dataService.getAllPlayers().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Player';
        });
      }
      else
      {
        this.columnHeaders = ["UID", "Email", "First Name", "Last Name"];
        this.dataService.getAllUsers().subscribe( res => {
                  this.getResult(res);
                  this.table = 'User';
        });
      }
    }
    else if (obj.id == 2) 
    {
      if (this.player)
      {
        this.columnHeaders = ["UID", "Name"];
        this.dataService.getAllDevelopers().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Developer';
        });
      }
      else
      {
        this.columnHeaders = ["UID", "Username"];
        this.dataService.getAllPlayers().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Player';
        });
      }
    }
    else if (obj.id == 3) 
    {
      if (this.player)
      {
        this.columnHeaders = ["GID", "Title", "Developer"];
        this.dataService.getAllGames().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Game';
        });
      }
      else
      {
        this.columnHeaders = ["UID", "Name"];
        this.dataService.getAllDevelopers().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Developer';
        });
      }
    }
    else if (obj.id == 4) 
    {
      if (this.player)
      {
        this.columnHeaders = ["UID", "Username", "Game Title", "Rating"];
        this.dataService.getAllReviews().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Review';
        });
      }
      else
      {
        this.columnHeaders = ["UID", "GID"];
        this.dataService.getAllModerators().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Moderator';
        });
      }
    }
    else if (obj.id == 5) 
    {
      if (this.player)
      {
        this.columnHeaders = ["Number", "GID", "Game Title", "Name" , "Points"];
        this.dataService.getAllAchievements().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Achievement';
        });
      }
      else
      {
        this.columnHeaders = ["GID", "Title", "Developer"];
        this.dataService.getAllGames().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Game';
        });
      }
    }
    else if (obj.id == 6) 
    {
      if (this.player)
      {}
      else
      {
        this.columnHeaders = ["UID", "Username", "Game Title", "Rating"];
        this.dataService.getAllReviews().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Review';
        });
      }
    }    
    else if (obj.id == 7)
    {
      if (this.player)
      {}
      else
      {
        this.columnHeaders = ["GID", "UID", "Username", "Title"];
        this.dataService.getAllPurchases().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Purchase';
        });
      }
    }
    else
    {
      if (this.player)
      {}
      else
      {
        this.columnHeaders = ["Number", "GID", "Game Title", "Name" , "Points"];
        this.dataService.getAllAchievements().subscribe( res => {
                  this.getResult(res);
                  this.table = 'Achievement';
        });
      }
    }
  } 

  getResult(res) {
  	this.queryResult = res;
  	this.totalPages = Math.ceil(( this.queryResult.length) / this.pageSize);
  	this.currentPage = 1;
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
