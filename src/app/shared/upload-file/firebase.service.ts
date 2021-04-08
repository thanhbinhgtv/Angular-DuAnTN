import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";

@Injectable()
export class FirebaseService {
  images: Observable<any[]>;

  constructor(private afs: AngularFirestore) {}

  getImages() {
    return this.afs.collection("images").valueChanges();
  }
}
