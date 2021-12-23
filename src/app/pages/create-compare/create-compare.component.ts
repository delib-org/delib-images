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

  constructor(private db:ImagesService) {
    this.images = []
   }

  ngOnInit(): void {
    this.images = this.db.listenToImages()
  }

}
