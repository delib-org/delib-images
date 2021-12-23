import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserImagesService } from 'src/app/services/user-images.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  

  constructor(private _userImagesService:UserImagesService) { }

  ngOnInit(): void {
    this._userImagesService.getImages().subscribe((data:any)=>{
      console.log(data)
    })
  }

  
}
