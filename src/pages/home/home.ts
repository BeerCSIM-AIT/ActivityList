import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { ActivityPage } from '../activity/activity';
import { NewactivityPage } from '../newactivity/newactivity';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addedToDoList: any[] = [];
  tempTodos: any = "";
  todoPage = NewactivityPage;
  constructor(public navCtrl: NavController, public storage:Storage) {
    this.storage.get('todoDetails').then((val)=>{
      this.addedToDoList=val;
    });
  }
  testObj = {
    "title":"",
    "description":""
  };

  ngOnInit():void{
    this.storage.get('todoDetails').then((val)=>{
      this.addedToDoList = val;
    });
  }

  ionViewWillEnter(){
    this.storage.get('todoDetails').then((val)=>{
      this.addedToDoList=val;
    });
  }

  gotoAddTodo(){
    this.navCtrl.push(NewactivityPage);
  }

  removeItem(todo){
    let index = this.addedToDoList.indexOf(todo);
    if(index>-1){
      this.addedToDoList.splice(index,1);
      this.storage.set('todoDetails', this.addedToDoList);
    }
  }

}
