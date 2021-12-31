import { Component, OnInit } from '@angular/core';
import { ImagesService } from 'src/app/services/images.service';
import { EMPTY, Observable } from 'rxjs';

@Component({
  selector: 'app-create-compare',
  templateUrl: './create-compare.component.html',
  styleUrls: ['./create-compare.component.scss'],
  providers: [ImagesService]
})
export class CreateCompareComponent implements OnInit {

  images:any;

  constructor(private imagesDB:ImagesService) {}

  ngOnInit(): void {
    this.imagesDB.getImages().subscribe((data:any)=>{
      console.log(data)
    })
  }

}
