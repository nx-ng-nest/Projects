import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';

import { NavigationService } from '@projects/ui';

import { WebsiteForms } from './website-forms';

@Component({
  selector: 'projects-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
  navItems: { label: string; id: string; href: string }[] = [
    { label: 'Home', id: 'home', href: '#home' },
    { label: 'About', id: 'About', href: '#About' },
    { label: 'Contact', id: 'Contact', href: '#Contact' },
    { label: 'Prices', id: 'Prices', href: '#Prices' },
  ];

  loginForm = WebsiteForms.LOGIN_FORM_FIELDS;

  constructor(
    private readonly http: HttpClient,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {}
}
