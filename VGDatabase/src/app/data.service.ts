import { Injectable } from '@angular/core';

import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	result: JSON;

  constructor(private http: Http, private hClient: HttpClient) { }

  	// Games

  	getGamesFromGID(gid: string) {
		return this.http.get("http://104.198.184.180:8080/api/games/gid/" + gid).map(result => this.result = result.json().data);
	}

  	getGamesFromTitle(title: string) {
		return this.http.get("http://104.198.184.180:8080/api/games/title/" + title).map(result => this.result = result.json().data);
	}

  	getGamesFromDeveloperName(dName: string) {
		return this.http.get("http://104.198.184.180:8080/api/games/developerName/" + dName).map(result => this.result = result.json().data);
	}

  	getAllGames() {
		return this.http.get("http://104.198.184.180:8080/api/games/all").map(result => this.result = result.json().data);
	}	

	insertGame(game: any) {
		return this.hClient.post('http://104.198.184.180:8080/api/games/insert', game).subscribe();
	}	

	// Users

  	getUsersFromUID(uid: string) {
		return this.http.get("http://104.198.184.180:8080/api/users/uid/" + uid).map(result => this.result = result.json().data);
	}

  	getUsersFromEmail(email: string) {
		return this.http.get("http://104.198.184.180:8080/api/users/email/" + email).map(result => this.result = result.json().data);
	}

  	getAllUsers() {
		return this.http.get("http://104.198.184.180:8080/api/users/all").map(result => this.result = result.json().data);
	}	

  	getUsersFromLastName(lName: string) {
		return this.http.get("http://104.198.184.180:8080/api/users/lastName/" + lName).map(result => this.result = result.json().data);
	}

	// Players	

  	getPlayersFromUID(uid: string) {
		return this.http.get("http://104.198.184.180:8080/api/players/uid/" + uid).map(result => this.result = result.json().data);
	}

  	getPlayersFromUsername(username: string) {
		return this.http.get("http://104.198.184.180:8080/api/players/username/" + username).map(result => this.result = result.json().data);
	}

  	getPlayerFromEmail(email: string) {
	return this.http.get("http://104.198.184.180:8080/api/players/email/" + email).map(result => this.result = result.json().data);
	}

  	getAllPlayers() {
		return this.http.get("http://104.198.184.180/api/players/all").map(result => this.result = result.json().data);
	}	

	insertPlayer(player: any) {
		return this.hClient.post('http://104.198.184.180/api/players/insert', player).subscribe();
	}		

	// Developers

  	getDevelopersFromUID(uid: string) {
		return this.http.get("http://104.198.184.180:8080/api/developers/uid/" + uid).map(result => this.result = result.json().data);
	}

  	getDevelopersFromName(name: string) {
		return this.http.get("http://104.198.184.180:8080/api/developers/name/" + name).map(result => this.result = result.json().data);
	}

  	getDeveloperFromEmail(email: string) {
		return this.http.get("http://104.198.184.180:8080/api/developers/email/" + email).map(result => this.result = result.json().data);
	}	

  	getAllDevelopers() {
		return this.http.get("http://104.198.184.180:8080/api/developers/all").map(result => this.result = result.json().data);
	}		

	insertDeveloper(developer: any) {
		return this.hClient.post('http://104.198.184.180:8080/api/developers/insert', developer).subscribe();
	}		

	// Moderators

  	getModeratorsFromUID(uid: string) {
		return this.http.get("http://104.198.184.180:8080/api/moderators/uid/" + uid).map(result => this.result = result.json().data);
	}

  	getModeratorsFromGID(gid: string) {
		return this.http.get("http://104.198.184.180:8080/api/moderators/gid/" + gid).map(result => this.result = result.json().data);
	}

  	getModeratorFromEmail(email: string) {
		return this.http.get("http://104.198.184.180:8080/api/moderators/email/" + email).map(result => this.result = result.json().data);
	}

  	getAllModerators() {
		return this.http.get("http://104.198.184.180:8080/api/moderators/all").map(result => this.result = result.json().data);
	}	

	insertModerator(moderator: any) {
		return this.hClient.post('http://104.198.184.180:8080/api/moderators/insert', moderator).subscribe();
	}		

	// Reviews

  	getReviewsFromUID(uid: string) {
		return this.http.get("http://104.198.184.180:8080/api/reviews/uid/" + uid).map(result => this.result = result.json().data);
	}

  	getReviewsFromUsername(username: string) {
		return this.http.get("http://104.198.184.180:8080/api/reviews/username/" + username).map(result => this.result = result.json().data);
	}

  	getReviewsFromGID(gid: string) {
		return this.http.get("http://104.198.184.180:8080/api/reviews/gid/" + gid).map(result => this.result = result.json().data);
	}

  	getReviewsFromGameTitle(gTitle: string) {
		return this.http.get("http://104.198.184.180:8080/api/reviews/gameTitle/" + gTitle).map(result => this.result = result.json().data);
	}

  	getAllReviews() {
		return this.http.get("http://104.198.184.180:8080/api/reviews/all").map(result => this.result = result.json().data);
	}		

	insertReview(review: any) {
		return this.hClient.post('http://104.198.184.180:8080/api/reviews/insert', review).subscribe();
	}	

	// Purchases

  	getPurchasesFromUID(uid: string) {
		return this.http.get("http://104.198.184.180:8080/api/purchases/uid/" + uid).map(result => this.result = result.json().data);
	}

  	getPurchasesFromUsername(username: string) {
		return this.http.get("http://104.198.184.180:8080/api/purchases/username/" + username).map(result => this.result = result.json().data);
	}

  	getPurchasesFromGID(gid: string) {
		return this.http.get("http://104.198.184.180:8080/api/purchases/gid/" + gid).map(result => this.result = result.json().data);
	}

  	getPurchasesFromGameTitle(gTitle: string) {
		return this.http.get("http://104.198.184.180:8080/api/purchases/gameTitle/" + gTitle).map(result => this.result = result.json().data);
	}

  	getAllPurchases() {
		return this.http.get("http://104.198.184.180:8080/api/purchases/all").map(result => this.result = result.json().data);
	}	

	insertPurchase(purchase: any) {
		return this.hClient.post('http://104.198.184.180:8080/api/purchases/insert', purchase).subscribe();
	}		

	// Achievements

  	getAchievementsFromGID(gid: string) {
		return this.http.get("http://104.198.184.180:8080/api/achievements/gid/" + gid).map(result => this.result = result.json().data);
	}

  	getAchievementsFromGameTitle(gTitle: string) {
		return this.http.get("http://104.198.184.180:8080/api/achievements/gameTitle/" + gTitle).map(result => this.result = result.json().data);
	}

  	getAchievement(gid: string, number: string) {
		return this.http.get("http://104.198.184.180:8080/api/achievements/key/" + gid + "/" + number).map(result => this.result = result.json().data);
	}	

  	getAllAchievements() {
		return this.http.get("http://104.198.184.180:8080/api/achievements/all").map(result => this.result = result.json().data);
	}			

	insertAchievement(achievement: any) {
		return this.hClient.post('http://104.198.184.180:8080/api/achievements/insert', achievement).subscribe();
	}		
}
