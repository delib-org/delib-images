import { Component } from '@angular/core';
import {UserImagesService} from './services/user-images.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'delib-images';
  

  constructor(fb:UserImagesService){

  }

 
}
