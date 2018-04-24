import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; 

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  username:string = "";
	message:string = "";
  subscribe;
  messages:object[] = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public db:AngularFireDatabase) {
  	this.username=this.navParams.get('username');
    this.subscribe = this.db.list('/chat').valueChanges().subscribe(data =>{
         this.messages = data;
      });
    }
  

  sendMessage(){
    this.db.list('/chat').push({
      username: this.username,
      message: this.message
    }).then( () => {
      this.message = "";
    });
  }

  ionViewWillLeave(){
    console.log("user jatoy");
     this.db.list('/chat').push({
      specialMessage:true,
      message: `${this.username} gela group madhun...`
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
    this.db.list('/chat').push({
      specialMessage:true,
      message: `${this.username} ala group madhe...`
    });
  }

}
