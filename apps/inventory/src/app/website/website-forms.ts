import {
  AbstractControl,
  FormControl,
  Validators,
} from '@angular/forms';

import { FormOptions } from '@projects/ui';

function matchValidator(s: RegExp, msg: string) {
  return (c: AbstractControl) => (s.test(c.value) ? null : { match: msg });
}

export class FormControls {
  static readonly username = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  static readonly password = new FormControl('', [
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
}

export class WebsiteForms {
  /**
   * lOGIN FORM FIELDS
   */
  static readonly loginFormFields: FormOptions = {
    name: 'Login',
    submitLabel: 'Log In',
    formFields: [
      {
        name: 'username',
        control: FormControls.username,
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
        name: 'password',
        control: FormControls.password,
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
    ],
  };
}
