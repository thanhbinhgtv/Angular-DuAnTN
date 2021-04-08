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
    private fs: FirebaseService
  ) {}

  ngOnInit() {
    console.log(this.folderName);
    this.mostrarImagenes();
  }

  detectFiles(event) {
    this.selectedFile = event.target.files;
  }

  uploadFile(images: string) {
    this.downloadURLs = [];
    this.urlFile.emit(this.downloadURLs);

    console.log(this.downloadURLs);
    for (let i = 0; i < this.selectedFile.length; i++) {
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
        .subscribe();
    }
  }

  removeFile(img) {
    const filePath = this.folderName + `/${img.id}`;
    this.storage.ref(filePath).delete();
    this.afs
      .collection("images")
      .doc(img.id)
      .delete();
  }

  mostrarImagenes() {
    this.images = this.fs.getImages();
  }
}
