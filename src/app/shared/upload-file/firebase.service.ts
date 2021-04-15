import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private http: HttpClient) {}

  uploadFiles(files): Observable<any>{
    return this.http.post(`http://localhost:8080/firebase/upload`, files);
  }
}
