import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  form: FormGroup | any;
  @Input() label = '';
  @Input() iconName = '';
  @Input() accept = '';
  @Input() name = '';
  @Output() fileValueEvent = new EventEmitter<File>();
  fileName: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.form = this.fb.group({
      file: new FormControl(null),
    });
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.fileName = file.name;
    this.fileValueEvent.emit(file);
  }
}
