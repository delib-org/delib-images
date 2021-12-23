import { Injectable } from '@angular/core';
import { Image } from '../model/image';
import { Firestore, collectionData, collection} from '@angular/fire/firestore';
import { firebaseAppFactory } from '@angular/fire/app/app.module';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserImagesService {

 
  userImages: Array<Image> = [];
  items2:any = [];
  options: {
    headers?: HttpHeaders | {[header: string]: string | string[]},
    observe?: 'body' | 'events' | 'response',
    params?: HttpParams|{[param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>},
    reportProgress?: boolean,
    responseType?: 'arraybuffer'|'blob'|'json'|'text',
    withCredentials?: boolean,
  } = {}

  constructor(private http:HttpClient,private db:Firestore) {
    
    
    
  }
  

  getImages(){

    const imagesUrl:string = 'http://localhost:3000/images'
    return this.http.get<Image[]>(imagesUrl)
  }
}
