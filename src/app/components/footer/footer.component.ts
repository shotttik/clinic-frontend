import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  infoMenu = [
    'ჩვენ შესახებ',
    'პარტნიორები',
    'ექიმებისთვის',
    'კლინიკებისთვის',
    'აფთიაქებისთვის',
  ];
  forPatientsMenu = ['ექიმები', 'კლინიკები', 'ანოტაციები', 'ბლოგი', 'მედია'];

  contactMenu = [
    'სამუშაო დღეები : ორშ - პარ',
    'სამუშაო დრო : 9:00 - 17:00',
    'იაკობ ნიკოლაძე №10',
    '032 2 100 100',
  ];
  followMenu = ['Facebook', 'Instagram', 'Youtube'];
  constructor() {}
  ngOnInit(): void {}
}
