import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

	loggedIn: boolean = false;
	hasReviews: boolean = false;
	gid: any;
	gameInfo: any[];
	reviews: any[];
    totalPages: number = 0;
	currentPage: number = 0;
	pageSize: number = 5;	
	private columnHeaders = ["Username", "Game Title", "Review Title", "Body", "Stars"];

  constructor(private dataService: DataService,
  				private router: Router,
  				private route: ActivatedRoute) { }

  ngOnInit() {
  	this.authorizeUser();

	this.route.params.subscribe(params => {
		this.gid = params['gid'];
		this.dataService.getGamesFromGID(this.gid).subscribe( res => {
			this.gameInfo = res;
			this.dataService.getReviewsFromGID(this.gid).subscribe( res => {
				this.getResult(res);
			});
		});
	});
  }

  authorizeUser()
  {
    var x = document.cookie.split(';');

    for (var i = 0 ; i < x.length; i++) 
    {
		if (x[i].split('=')[0].trim() == 'loggedIn')
		{
			if (x[i].split('=')[1] == 'true')
			{
			  this.loggedIn = true;
			}
		}
    }
  }

  logout() 
  {
    document.cookie = "email =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "type =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = "loggedIn =; expires=Thu, 01 Jan 1970 00:00:01 GMT;";    
    this.router.navigateByUrl('/login');
  } 

  getResult(res) {
  	this.reviews = res;
  	if (this.reviews.length != 0)
  	{
  		this.hasReviews = true;
  	}
  	this.totalPages = Math.ceil(( this.reviews.length) / this.pageSize);
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
