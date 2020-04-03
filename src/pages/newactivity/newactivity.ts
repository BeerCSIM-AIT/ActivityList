import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

/**
 * Generated class for the NewactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-newactivity',
  templateUrl: 'newactivity.html',
})
export class NewactivityPage {
  frmActivity:FormGroup;
  title:any;
  description:any;
  addedToDo:any[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage:Storage, public formBuilder: FormBuilder) {
    this.frmActivity = this.formBuilder.group({
      title:['',[Validators.required, Validators.minLength(3)]],
      description:['',Validators.required]
    });
    this.storage=storage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewactivityPage');
  }

  saveRecord(){
    if(this.frmActivity.valid){
      let todoObj={
        title:"",
        description:""
      };
      todoObj.title=this.title;
      todoObj.description=this.description;
      this.storage.get('todoDetails').then((val)=>{
        if(val){
          this.addedToDo=val;
          this.addedToDo.push(todoObj);
          this.storage.set('todoDetails',this.addedToDo);
        }
        else{
          this.addedToDo.push(todoObj);
          this.storage.set('todoDetails',this.addedToDo);
        }
  
        this.title="";
        this.description="";
        this.navCtrl.pop();
      });
    }
    
  }

}
