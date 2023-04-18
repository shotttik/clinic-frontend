import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Doctor } from 'src/app/interfaces/Doctor';
import { Search } from 'src/app/interfaces/Search';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  @Output() searchResultEvent = new EventEmitter<Doctor[]>();
  phoneNumber = '032 2 100 100';
  address = 'იაკობ ნიკოლაძე №10';
  searchByName: string | null = null;
  searchBySpec: string | null = null;
  searchForm: Search | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  setMedSearchByName(value: string) {
    this.searchByName = value;
  }
  setMedSearchBySpec(value: string) {
    this.searchBySpec = value;
  }

  search() {
    if (!this.searchByName && !this.searchBySpec) {
      this.messageService.add({
        severity: 'info',
        summary: 'ინფორმაცია!',
        detail: 'ძებნისთვის ერთ-ერთი ველი მაინც უნდა იყოს შევსებული.',
      });
      return false;
    }
    this.searchForm = {
      byName: this.searchByName ? this.searchByName : null,
      byCategory: this.searchBySpec ? this.searchBySpec : null,
    };
    this.apiService.search(this.searchForm).subscribe({
      next: (resp: any) => {
        this.searchResultEvent.emit(resp);
        this.messageService.add({
          severity: 'success',
          summary: 'წარმატებული!',
          detail: `ნაპოვნია ${resp.length} ექიმი.`,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'შეცდომა!',
          detail: err.error,
        });
      },
    });
    return true;
  }
}
