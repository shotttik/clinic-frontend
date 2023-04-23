import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Category } from 'src/app/interfaces/Category';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent implements OnInit {
  createUserForm!: FormGroup;
  firstNameError = '';
  lastNameError = '';
  emailError = '';
  pidError = '';
  passwordError = '';
  categoryError = '';
  categories: Category[] = [];
  documentFile: File | undefined;
  imageFile: File | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
    private apiServices: ApiService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createUserForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lastName: new FormControl('', [Validators.required]),
      pid: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern('^[0-9]+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*\\W).+$'),
      ]),
      role: new FormControl(0, [Validators.required]),
      categoryId: new FormControl(null),
      document: new FormControl(null),
      image: new FormControl(null),
    });

    this.apiServices.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (err) => {
        err;
      },
    });
  }
  getRegisterType(): string {
    const routeParams = this.route.snapshot.paramMap;
    return String(routeParams.get('registerType'));
  }
  registerUser() {
    console.log(this.createUserForm.value);
    if (this.createUserForm?.invalid) {
      this.displayErrors();
      return;
    }
    if (this.getRegisterType() == 'doctor') {
      if (this.createUserForm.controls['categoryId'].value == null) {
        this.categoryError = 'ეს ველი აუცილებელია';
        return;
      } else {
        this.categoryError = '';
      }
      this.createUserForm.controls['role'].setValue(2);
      if (this.imageFile) {
        this.apiServices.uploadFile(this.imageFile).subscribe({
          next: (response: any) => {
            this.createUserForm!.controls['image'].setValue(response.dbPath);
          },
          error: (err) => console.log(err),
        });
      }
      if (this.documentFile) {
        this.apiServices.uploadFile(this.documentFile).subscribe({
          next: (response: any) => {
            this.createUserForm!.controls['document'].setValue(response.dbPath);
          },
          error: (err) => console.log(err),
        });
      }
      setTimeout(() => {
        this.apiServices.createDoctor(this.createUserForm!.value).subscribe({
          next: (response: any) => {
            this.messageService.add({
              severity: 'success',
              summary: 'წამატებული!',
              detail: 'მომხმარებელი წარმატებით დარეგისტრირდა.',
            });
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'ყურადღება!',
              detail: err.error,
            });
          },
        });
        return;
      }, 500);
    } else {
      if (this.getRegisterType() == 'admin') {
        this.createUserForm!.controls['role'].setValue(1);
      }
      console.log(this.createUserForm!.value);
      this.apiServices.createUser(this.createUserForm!.value).subscribe({
        next: (response: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'წამატებული!',
            detail: 'მომხმარებელი წარმატებით დარეგისტრირდა.',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'ყურადღება!',
            detail: err.error,
          });
        },
      });
    }
  }

  setFirstNameValue(value: any) {
    this.createUserForm!.controls['firstName'].setValue(value);
    this.firstNameError = '';
    return value;
  }
  setEmailValue(value: any) {
    this.createUserForm!.controls['email'].setValue(value);
    this.emailError = '';
    return value;
  }
  setPasswordValue(value: any) {
    this.createUserForm!.controls['password'].setValue(value);
    this.passwordError = '';
    return value;
  }
  setPidValue(value: any) {
    this.createUserForm!.controls['pid'].setValue(value);
    this.pidError = '';
    return value;
  }
  setLastNameValue(value: any) {
    this.createUserForm!.controls['lastName'].setValue(value);
    this.lastNameError = '';
    return value;
  }
  setSelectValue(value: number) {
    this.createUserForm!.controls['categoryId'].setValue(value);
    this.categoryError = '';
    return value;
  }
  setImageValue(value: any) {
    this.imageFile = value;
    return value;
  }
  setDocumentValue(value: any) {
    this.documentFile = value;
    return value;
  }
  displayErrors() {
    const errors = this.authService.getFormValidationErrors(
      this.createUserForm
    );
    errors.forEach((e) => {
      if (e.control == 'firstName') {
        if (e.error == 'required') {
          this.firstNameError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'minlength') {
          this.firstNameError = 'მინიმუმ 5 სიმბოლო';
        }
      }
      if (e.control == 'lastName') {
        if (e.error == 'required') {
          this.lastNameError = 'ეს ველი აუცილებელია';
        }
      }
      if (e.control == 'pid') {
        if (e.error == 'required') {
          this.pidError = 'ეს ველი აუცილებელია';
        }
        if (
          e.error == 'minlength' ||
          e.error == 'maxlength' ||
          e.error == 'pattern'
        ) {
          this.pidError = 'შედგებოდეს 11 რიცხვისგან';
        }
      }
      if (e.control == 'email') {
        if (e.error == 'required') {
          this.emailError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'email') {
          this.emailError = 'არასწორი იმეილის ფორმატი';
        }
      }
      if (e.control == 'password') {
        if (e.error == 'required') {
          this.passwordError = 'ეს ველი აუცილებელია';
        }
        if (e.error == 'minlength') {
          this.passwordError = 'უნდა შეიცავდეს 8 სიმბოლოს';
        }
        if (e.error == 'pattern') {
          this.passwordError =
            'უნდა შეიცავდეს რიცხვს, სიმბოლოს, დიდ/პატარა ასო';
        }
      }
      if (e.control == 'category') {
        if (e.error == 'required') {
          this.categoryError = 'ეს ველი აუცილებელია';
        }
      }
    });
  }
}
