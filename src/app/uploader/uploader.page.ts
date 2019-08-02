import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { database } from 'firebase';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.page.html',
  styleUrls: ['./uploader.page.scss'],
})
export class UploaderPage implements OnInit {

  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  fileChange(event){
    const files = event.target.files
    console.log(files)

    const data = new FormData()
    data.append('file', files[0])
    data.append('UPLOADCARE_STORE','1')
    data.append('UPLOADCARE_PUB_KEY','28688731ce1b4c777ded')

    this.http.post('https://upload.uploadcare.com/base', data)
    .subscribe(event => {
      console.log(event)
    })
  }


}
