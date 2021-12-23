import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  

  constructor(private firestore: AngularFirestore) {
    
   }

   listenToImages(){
    return this.firestore.collection('images').valueChanges();
   }
}
