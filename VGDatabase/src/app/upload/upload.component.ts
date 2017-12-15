import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

    files: FileList; 
    filestring: string = '';
    jsonText: any;
    fileNotLoaded: boolean = false;
    jsonNotEntered: boolean = false;
    errorParsingJson: boolean = false;
	uploading: boolean = false;

	failedPlayers: number = 0;
	failedDevelopers: number = 0;
	failedModerators: number = 0;
	failedGames: number = 0;
	failedReviews: number = 0;
	failedPurchases: number = 0;
	failedAchievements: number = 0;	
	successPlayers: number = 0;

	duplicateEmails: boolean = false;
	duplicateUsernames: boolean = false;
	duplicateReviews: boolean = false;
	duplicatePurchases: boolean = false;
	duplicateAchievements: boolean = false;

	loggedIn: boolean = false;
	moderator: boolean = false;

  constructor(private dataService: DataService,
  				private router: Router) 
  { 
  }

  ngOnInit() 
  {
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

	getFiles(event) 
	{ 
		this.fileNotLoaded = false;
    	this.jsonNotEntered = false;
    	this.errorParsingJson = false;
    	this.duplicateEmails = false;
    	this.duplicateUsernames = false;
    	this.duplicateReviews = false;
		this.duplicatePurchases = false;
		this.duplicateAchievements = false;

	    this.files = event.target.files; 
	    var reader = new FileReader(); 
	    reader.onload = this._handleReaderLoaded.bind(this); 
	    if (this.files[0].name.endsWith('.json'))
	    {
		    reader.readAsText(this.files[0]);
	    }
	    else
	    {
	    	this.jsonNotEntered = true;
	    }
	} 

    _handleReaderLoaded(readerEvt) { 
        var binaryString = readerEvt.target.result; 
        this.filestring = binaryString;
        this.jsonText = JSON.parse(this.filestring);
   }

    logForm(form: NgForm) {

    	this.fileNotLoaded = false;
    	this.errorParsingJson = false;
    	this.uploading = true;
    	this.duplicateEmails = false;
    	this.duplicateUsernames = false;
    	this.duplicateReviews = false;
		this.duplicatePurchases = false;
		this.duplicateAchievements = false;

    	if (this.filestring == '')
    	{
    		this.uploading = false;
    		this.fileNotLoaded = true;
    	} 
    	else if (this.jsonText === undefined)
    	{
    		this.uploading = false;
    		this.errorParsingJson = true;
    	} 
    	else if (!this.hasDuplicates(this.jsonText))
    	{
    		if (this.hasValidInput(this.jsonText))
    		{
				if (this.jsonText.players !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.players.length; i++) 
		    		{
		    			this.sendPlayer(this.jsonText.players[i]);
					}
		    	}
				if (this.jsonText.developers !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.developers.length; i++) 
		    		{
		    			this.sendDeveloper(this.jsonText.developers[i]);
					}
		    	}
				if (this.jsonText.moderators !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.moderators.length; i++) 
		    		{
		    			this.sendModerator(this.jsonText.moderators[i]);
					}
		    	}
				if (this.jsonText.games !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.games.length; i++) 
		    		{
		    			this.sendGame(this.jsonText.games[i]);
					}
		    	}
				if (this.jsonText.reviews !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.reviews.length; i++) 
		    		{
		    			this.sendReview(this.jsonText.reviews[i]);
					}
		    	}
				if (this.jsonText.purchases !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.purchases.length; i++) 
		    		{
		    			this.sendPurchase(this.jsonText.purchases[i]);
					}
		    	}
				if (this.jsonText.achievements !== undefined)
		    	{
		    		for(var i = 0; i < this.jsonText.achievements.length; i++) 
		    		{
		    			this.sendAchievement(this.jsonText.achievements[i]);
					}
		    	}     			
    		}

	    	this.uploading = false;
    	}
    } 

    hasValidInput(json)
    {
		if (json.players !== undefined)
    	{
    		for(var i = 0; i < json.players.length; i++) 
    		{
    			if (!this.validPlayer(json.players[i])) {
    				return false;
    			}
			}
    	}
		if (json.developers !== undefined)
    	{
    		for(var i = 0; i < json.developers.length; i++) 
    		{
    			if (!this.validDeveloper(json.developers[i])) {
    				return false;
    			}
			}
    	}
		if (json.moderators !== undefined)
    	{
    		for(var i = 0; i < json.moderators.length; i++) 
    		{
    			if (!this.validModerator(json.moderators[i])) {
    				return false;
    			}
			}
    	}
		if (json.games !== undefined)
    	{
    		for(var i = 0; i < json.games.length; i++) 
    		{
    			if (!this.validGame(json.games[i])) {
    				return false;
    			}
			}
    	}
		if (json.reviews !== undefined)
    	{
    		for(var i = 0; i < json.reviews.length; i++) 
    		{
    			if (!this.validReview(json.reviews[i])) {
    				return false;
    			}
			}
    	}
		if (json.purchases !== undefined)
    	{
    		for(var i = 0; i < json.purchases.length; i++) 
    		{
    			if (!this.validPurchase(json.purchases[i])) {
    				return false;
    			}
			}
    	}
		if (json.achievements !== undefined)
    	{
    		for(var i = 0; i < json.achievements.length; i++) 
    		{
    			if (!this.validAchievement(json.achievements[i])) {
    				return false;
    			}
			}
    	}

    	return true;   	
    }

    hasDuplicates(json)
    {
    	if (this.hasDuplicateEmails(json))
    	{
    		this.uploading = false;
    		this.duplicateEmails = true;
    		return true;
    	}
    	else if (this.hasDuplicateUsernames(json))
    	{
    		this.uploading = false;
    		this.duplicateUsernames = true;
    		return true;
    	}  
    	else if (this.hasDuplicateReviews(json))
    	{
    		this.uploading = false;
    		this.duplicateReviews = true;
    		return true;
    	} 
    	else if (this.hasDuplicateAchievements(json))
    	{
    		this.uploading = false;
    		this.duplicateAchievements = true;
    		return true;
    	}  
    	else if (this.hasDuplicatePurchases(json))
    	{
    		this.uploading = false;
    		this.duplicatePurchases = true;
    		return true;
    	}

    	return false;  	
    }

	checkEmail(email) 
	{
		if (email.length > 0 && email.length < 101)
		{
			// var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
	  // 		return re.test(email);
	  		return true;
		}
		return false;
	}

	check45(text) 
	{
		if (text.length > 0 && text.length < 46)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	check1000(text) 
	{
		if (text.length > 0 && text.length < 1001)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	check100(text) 
	{
		if (text.length > 0 && text.length < 101)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	checkDate(text) 
	{
		if (text.length > 0)
		{
			var date_regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/ ;

			if (!(date_regex.test(text)))
			{
				return false;
			}

			return true;
		}
		else
		{
			return false;
		}
	}		

	checkPassword(password) 
	{
		if (password.length > 7 && password.length < 46)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	checkID(id) 
	{
		if (id.length > 0 && !isNaN(id))
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	checkStars(stars) 
	{
		if (stars.length > 0 && !isNaN(stars))
		{
			var tmp = parseInt(stars);
			if (tmp > 0 && tmp < 6)
			{
				return true;
			}
			return false;
		}
		else
		{
			return false;
		}
	}	

	checkNumber(number)
	{
		if (number.length > 0 && !isNaN(number))
		{
			return true;
		}
		else
		{
			return false;
		}		
	}	

	checkUsername(username) 
	{
		if (username.length > 0 && username.length < 21)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	hasDuplicateEmails(json)
	{
		var emails = []

		if (json.players !== undefined)
    	{
    		for(var i = 0; i < json.players.length; i++) 
    		{
    			emails.push(json.players[i].Email);
			}
    	}
		if (json.developers !== undefined)
    	{
    		for(var i = 0; i < json.developers.length; i++) 
    		{
    			emails.push(json.developers[i].Email);
			}
    	}
		if (json.moderators !== undefined)
    	{
    		for(var i = 0; i < json.moderators.length; i++) 
    		{
    			emails.push(json.moderators[i].Email);
			}
    	} 

    	emails.sort();

		for(var i = 0; i < emails.length - 1; i++) 
		{
			if (emails[i] == emails[i + 1])
			{
				return true;
			}
		}

		return false;	  	 	
	}

	hasDuplicateUsernames(json)
	{
		var usernames = []

		if (json.players !== undefined)
    	{
    		for(var i = 0; i < json.players.length; i++) 
    		{
    			usernames.push(json.players[i].Username);
			}
    	} 

    	usernames.sort();

		for(var i = 0; i < usernames.length - 1; i++) 
		{
			if (usernames[i] == usernames[i + 1])
			{
				return true;
			}
		}

		return false;	  	 	
	}

	hasDuplicateReviews(json)
	{
		var reviews = []

		if (json.reviews !== undefined)
    	{
    		for(var i = 0; i < json.reviews.length; i++) 
    		{
    			if (json.reviews[i].UID !== undefined && json.reviews[i].GID !== undefined)
    			{
    				var add = "" + json.reviews[i].UID + json.reviews[i].GID;
    				reviews.push(add);
    			}
			}
    	} 

    	reviews.sort();

		for(var i = 0; i < reviews.length - 1; i++) 
		{
			if (reviews[i] == reviews[i + 1])
			{
				return true;
			}
		}

		return false;		  	 	
	}	

	hasDuplicatePurchases(json)
	{
		var purchases = []

		if (json.purchases !== undefined)
    	{
    		for(var i = 0; i < json.purchases.length; i++) 
    		{
    			if (json.purchases[i].UID !== undefined && json.purchases[i].GID !== undefined)
    			{
    				var add = "" + json.purchases[i].UID + json.purchases[i].GID;
    				purchases.push(add);
    			}
			}
    	} 

    	purchases.sort();

		for(var i = 0; i < purchases.length - 1; i++) 
		{
			if (purchases[i] == purchases[i + 1])
			{
				return true;
			}
		}

		return false;	  	 	
	}	

	hasDuplicateAchievements(json)
	{
		var achievements = []

		if (json.achievements !== undefined)
    	{
    		for(var i = 0; i < json.achievements.length; i++) 
    		{
    			if (json.achievements[i].GID !== undefined && json.achievements[i].Number !== undefined)
    			{
    				var add = "" + json.achievements[i].GID + json.achievements[i].Number;
    				achievements.push(add);
    			}
			}
    	} 

    	achievements.sort();

		for(var i = 0; i < achievements.length - 1; i++) 
		{
			if (achievements[i] == achievements[i + 1])
			{
				return true;
			}
		}

		return false;		  	 	
	}					

	sendPlayer(player)
	{
      this.dataService.getUsersFromEmail(player.Email).subscribe((res) => {
        if ( res.length == 0 )
        {
          this.dataService.getPlayersFromUsername(player.Username).subscribe((res) => {
            if (res.length == 0)
            {
            	console.log('Add Player');
              this.dataService.insertPlayer(player);
            }
            else
            {
            	console.log('Failed Username');
              this.failedPlayers++;
            }
          });
        } 
        else 
        {
        	console.log('Failed Email');
          this.failedPlayers++;
        }
      });		
	}

	validPlayer(player)
	{
		if (player.Email === undefined || !this.checkEmail(player.Email))
		{
			console.log('Failed Email');
			return false;
		}
		if (player.FirstName === undefined || !this.check45(player.FirstName))
		{
			console.log('Failed First');
			return false;
		}
		if (player.LastName === undefined || !this.check45(player.LastName))
		{
			console.log('Failed Last');
			return false;
		}
		if (player.Password === undefined || !this.checkPassword(player.Password))
		{
			console.log('Failed Password');
			return false;
		}
		if (player.Username === undefined || !this.checkUsername(player.Username))
		{
			console.log('Failed Username');
			return false;
		}
		return true;							
	}

	sendDeveloper(developer)
	{
      this.dataService.getUsersFromEmail(developer.Email).subscribe((res) => {
        if ( res.length == 0 )
        {
        	console.log('Add Developer');
          this.dataService.insertDeveloper(developer);
        } 
        else 
        {
        	console.log('Failed Email');
          this.failedDevelopers++;
        }
      });		
	}	

	validDeveloper(developer)
	{
		if (developer.Email === undefined || !this.checkEmail(developer.Email))
		{
			console.log('Failed Email');
			return false;
		}
		if (developer.FirstName === undefined || !this.check45(developer.FirstName))
		{
			console.log('Failed First');
			return false;
		}
		if (developer.LastName === undefined || !this.check45(developer.LastName))
		{
			console.log('Failed Last');
			return false;
		}
		if (developer.Password === undefined || !this.checkPassword(developer.Password))
		{
			console.log('Failed Password');
			return false;
		}
		if (developer.Name === undefined || !this.check100(developer.Name))
		{
			console.log('Failed Name');
			return false;
		}
		if (developer.Description === undefined || !this.check1000(developer.Description))
		{
			console.log('Failed Description');
			return false;
		}
		if (developer.Description === undefined || !this.checkDate(developer.Founded))
		{
			console.log('Failed Founded');
			return false;
		}					
		return true;							
	}

	sendModerator(moderator)
	{
      this.dataService.getUsersFromEmail(moderator.Email).subscribe((res) => {
        if ( res.length == 0 )
        {
          this.dataService.getGamesFromGID(moderator.GID).subscribe((res) => {
            if ( res.length == 0 )
            {
	        	console.log('Failed Game');
	          this.failedModerators++;
            } 
            else 
            {
            	console.log('Insert Moderator');
              this.dataService.insertModerator(moderator);
            }
          });
        } 
        else 
        {
        	console.log('Failed Email');
          this.failedModerators++;
        }
      });		
	}	

	validModerator(moderator)
	{
		if (moderator.Email === undefined || !this.checkEmail(moderator.Email))
		{
			console.log('Failed Email');
			return false;
		}
		if (moderator.FirstName === undefined || !this.check45(moderator.FirstName))
		{
			console.log('Failed First');
			return false;
		}
		if (moderator.LastName === undefined || !this.check45(moderator.LastName))
		{
			console.log('Failed Last');
			return false;
		}
		if (moderator.Password === undefined || !this.checkPassword(moderator.Password))
		{
			console.log('Failed Password');
			return false;
		}
		if (moderator.GID === undefined || !this.checkID(moderator.GID))
		{
			console.log('Failed GID');
			return false;
		}				
		return true;							
	}	

	sendGame(game)
	{
	    this.dataService.getDevelopersFromUID(game.UID).subscribe((res) => {
	      if ( res.length == 0 )
	      {
			console.log('Failed developers');
			this.failedGames++;
	      } 
	      else 
	      {
	        this.dataService.insertGame(game);
	      }
	    });		
	}	

	validGame(game)
	{
		if (game.Title === undefined || !this.check100(game.Title))
		{
			console.log('Failed Title');
			return false;
		}
		if (game.UID === undefined || !this.checkID(game.UID))
		{
			console.log('Failed UID');
			return false;
		}
		if (game.ReleaseDate === undefined || !this.checkDate(game.ReleaseDate))
		{
			console.log('Failed Release Date');
			return false;
		}	
		if (game.Description === undefined || !this.check1000(game.Description))
		{
			console.log('Failed Description');
			return false;
		}	
		if (game.Price === undefined || !this.checkNumber(game.Price))
		{
			console.log('Failed Price');
			return false;
		}												
		return true;							
	}

	sendReview(review)
	{
	    this.dataService.getPlayersFromUID(review.UID).subscribe((res) => {
	      if ( res.length == 0 )
	      {
			console.log('Failed Players');
			this.failedReviews++;
	      } 
	      else 
	      {
	        this.dataService.getGamesFromGID(review.GID).subscribe((res) => {
	          if ( res.length == 0 )
	          {
				console.log('Failed Games');
				this.failedReviews++;
	          } 
	          else 
	          {
	            this.dataService.insertReview(review);
	          }
	        });        
	      }
	    });		
	}

	validReview(review)
	{
		if (review.UID === undefined || !this.checkID(review.UID))
		{
			console.log('Failed UID');
			return false;
		}	
		if (review.GID === undefined || !this.checkID(review.GID))
		{
			console.log('Failed GID');
			return false;
		}	
		if (review.Stars === undefined || !this.checkStars(review.Stars))
		{
			console.log('Failed Stars');
			return false;
		}	
		if (review.Title === undefined || !this.check100(review.Title))
		{
			console.log('Failed Title');
			return false;
		}	
		if (review.Body === undefined || !this.check1000(review.Body))
		{
			console.log('Failed Body');
			return false;
		}																						
		return true;							
	}	

	sendPurchase(purchase)
	{
	    this.dataService.getPlayersFromUID(purchase.UID).subscribe((res) => {
	      if ( res.length == 0 )
	      {
				console.log('Failed player');
				this.failedPurchases++;
	      } 
	      else 
	      {
	        this.dataService.getGamesFromGID(purchase.GID).subscribe((res) => {
	          if ( res.length == 0 )
	          {
				console.log('Failed Games');
				this.failedPurchases++;
	          } 
	          else 
	          {
	            this.dataService.insertPurchase(purchase);
	          }
	        });        
	      }
	    });		
	}

	validPurchase(purchase)
	{
		if (purchase.UID === undefined || !this.checkID(purchase.UID))
		{
			console.log('Failed UID');
			return false;
		}	
		if (purchase.GID === undefined || !this.checkID(purchase.GID))
		{
			console.log('Failed GID');
			return false;
		}																								
		return true;							
	}	

	sendAchievement(achievement)
	{
	    this.dataService.getGamesFromGID(achievement.GID).subscribe((res) => {
	      if ( res.length == 0 )
	      {
				console.log('Failed Games');
				this.failedAchievements++;
	      } 
	      else 
	      {
	        this.dataService.getAchievement(achievement.GID, achievement.Number).subscribe((res) => {
	          if ( res.length == 0 )
	          {
	            this.dataService.insertAchievement(achievement);
	          } 
	          else 
	          {
				console.log('Failed Aciev Already Exists');
				this.failedAchievements++;
	          }
	        }); 
	      }
	    });			
	}

	validAchievement(achievement)
	{
		if (achievement.Number === undefined || !this.checkNumber(achievement.Number))
		{
			console.log('Failed Number');
			return false;
		}	
		if (achievement.GID === undefined || !this.checkID(achievement.GID))
		{
			console.log('Failed GID');
			return false;
		}
		if (achievement.Title === undefined || !this.check100(achievement.Title))
		{
			console.log('Failed Title');
			return false;
		}
		if (achievement.Description === undefined || !this.check1000(achievement.Description))
		{
			console.log('Failed Description');
			return false;
		}
		if (achievement.Points === undefined || !this.checkNumber(achievement.Points))
		{
			console.log('Failed Points');
			return false;
		}																														
		return true;							
	}	
}
