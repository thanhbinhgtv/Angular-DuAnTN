import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { finalize } from "rxjs/operators";
import { AngularFireStorage } from "angularfire2/storage";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { FirebaseService } from "./firebase.service";

@Component({
  selector: "upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.css"]
})
export class UploadFileComponent implements OnInit {
  @Input() folderName: string;
  @Output() urlFile = new EventEmitter();
  downloadURLs: Observable<string>[];
  selectedFile: File[] | null;
  images: Observable<any[]>;

  constructor(
    fb: FormBuilder,
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    // this.mostrarImagenes();
  }

  detectFiles(event) {
    this.selectedFile = event.target.files;
  }

  postImg(i: number, images: string){
    let file = this.selectedFile[i];
      const item = this.afs.collection(images).ref.doc();
      //đặt tên thư mục tại đây
      const filePath = this.folderName + `/${item.id}`;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef
              .getDownloadURL()
              .toPromise()
              .then(url => {
                this.downloadURLs.push(url);
                this.urlFile.emit(this.downloadURLs);

                item.set({
                  url: url,
                  id: item.id
                });
              })
              .catch(err => {
                console.log(err);
                this.selectedFile = null;
              });
          })
        )
        .subscribe(data =>{
          if(i< this.selectedFile.length){
            this.postImg(i+1, images);
          }else{
            console.log(this.downloadURLs);
            
          }
        });
  }

  uploadFile(images: string) {
    this.downloadURLs = [];

    this.postImg(0, images);

  }

  // removeFile(img) {
  //   const filePath = this.folderName + `/${img.id}`;
  //   this.storage.ref(filePath).delete();
  //   this.afs
  //     .collection("images")
  //     .doc(img.id)
  //     .delete();
  // }

  // mostrarImagenes() {
  //   this.images = this.firebaseService.getImages();
  // }
}
