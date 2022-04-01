import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  Directive,
  ElementRef,
  Input,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { NavigationService } from '@projects/ui';

import { FormFieldContext } from './form-templates.component';

function matchValidator(s: RegExp, msg: string) {
  return (c: AbstractControl) => (s.test(c.value) ? null : { match: msg });
}

@Directive({ selector: '[setAttributes]' })
export class SetAttributeDirective implements AfterViewInit, OnInit {
  @Input() setAttributes!: Record<string, any>;
  constructor(public elementRef: ElementRef<HTMLInputElement>) {}
  ngOnInit(): void {
    console.log(this.setAttributes);
  }
  ngAfterViewInit(): void {
    this.setAttributesNow();
  }

  setAttributesNow() {
    for (const a of Object.entries(this.setAttributes)) {
      (this.elementRef.nativeElement as HTMLInputElement).setAttribute(
        a[0],
        a[1]
      );
    }
  }
}

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
  usernameControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    matchValidator(/[A-Z]{1,}/, 'Password must contain an uppercase letter!'),
    matchValidator(/[a-z]{1,}/, 'Password must contain an lowercase letter!'),
    matchValidator(/[0-9]{1,}/, 'Password must contain a number!'),
    matchValidator(
      /[!@#$%^&*()_+-=/\\]{1,}/,
      'Password must contain a special character! (!@#$%^&*()_+-=/\\)'
    ),
  ]);

  loginForm = new FormGroup({
    username: this.usernameControl,
    password: this.passwordControl,
  });

  loginFields: FormFieldContext[] = [
    {
      control: this.usernameControl,
      label: 'Username',
      icon: 'person',
      attributes: {
        type: 'email',
        name: 'username',
        id: 'username',
        required: true,
      },
    },
    {
      control: this.passwordControl,
      label: 'Password',
      icon: 'password',
      attributes: {
        type: 'password',
        name: 'password',
        id: 'password',
        required: true,
        minLength: 6,
      },
    },
  ];
  constructor(
    private readonly http: HttpClient,
    private readonly navigationService: NavigationService
  ) {}

  ngOnInit(): void {}
  submit() {
    console.log(this.loginForm.value);
  }
}
