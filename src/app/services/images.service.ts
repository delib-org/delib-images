import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  // options:{observe: 'body', responseType: 'json'}

  constructor(private http: HttpClient) {}

  getImages() {
    const allImagesUrl = 'http://localhost:3000/images';
    return this.http.get(allImagesUrl)
  }
}
