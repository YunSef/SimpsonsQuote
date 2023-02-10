import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http'
interface MesCouilles {
  character:string,
  characterDirection:string,
  image:string,
  quote:string,
} 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'simpsonsChallenge';
  characters :MesCouilles[] = [];
  
  quote : MesCouilles[] = [];
  constructor(private http : HttpClient){}
  ngOnInit(){
    this.getData();
  }

  async getData () {
    for(let i = 0; i<6 ; i++){
    // let response =  await fetch('https://thesimpsonsquoteapi.glitch.me/quotes');
    // let character = await response.json()
    this.http.get<MesCouilles[]>('https://thesimpsonsquoteapi.glitch.me/quotes')
    .subscribe(character =>{
      this.characters.push(character[0]);
      this.filter();
    })
    
    
    }
     
  }
  async filter(){
    const charact = this.characters.map((el:MesCouilles) => el.character);
    this.characters = this.characters.filter(({character},index) => !charact.includes(character,index+1))

  }
  

  async getQuote(char: any){
    // let response2 = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${char.character}`)
    // let quote = await response2.json();
    this.http.get<MesCouilles[]>(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${char.character}`)
    .subscribe(quote => {
      this.quote.push(quote[0]);
    })
  }
}