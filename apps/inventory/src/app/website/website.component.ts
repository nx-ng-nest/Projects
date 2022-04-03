import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
} from '@angular/core';

import { NGXLogger } from 'ngx-logger';
import {
  catchError,
  of,
} from 'rxjs';

import { Store } from '@ngrx/store';
import { NavigationService } from '@projects/ui';

import { WebsiteForms } from './website-forms';

@Component({
  selector: 'projects-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.scss'],
})
export class WebsiteComponent implements OnInit {
  loginForm = WebsiteForms.loginFormFields;

  constructor(
    private readonly http: HttpClient,
    private readonly navigationService: NavigationService,
    private store: Store,
    private readonly logger: NGXLogger
  ) {}

  ngOnInit(): void {
    this.store.subscribe((data) => this.logger.log(data));
  }

  login(form: Record<string, string>) {
    this.http
      .post('/api/auth/login', form)
      .pipe(
        catchError((err, caught) => {
          return of(err.status);
        })
      )
      .subscribe((result) => {
        if (result == 401) {
          alert('Unautorized');
          return;
        }
      });
  }
}
