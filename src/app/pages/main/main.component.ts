import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  images: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.images = firestore.collection('images').valueChanges();
  }

  ngOnInit(): void {
  }

  
}
