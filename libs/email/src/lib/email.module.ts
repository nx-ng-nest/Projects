import { join } from 'path';

import {
  MAILER_OPTIONS,
  MailerModule,
  MailerOptions,
  MailerService,
} from '@nestjs-modules/mailer';
import {
  HandlebarsAdapter,
} from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';

const options: MailerOptions = {
  transport: {
    name: 'mail.authdare.com',
    host: 'mail.authdare.com',
    port: 465,
    secure: true,
    sendMail: true,
    auth: {
      user: 'support@authdare.com',
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  defaults: {
    from: '"Authdare" <support@authdare.com>',
  },
  template: {
    dir: join(__dirname, 'assets', 'templates') + '/',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: false,
    },
  },
};
@Module({
  imports: [MailerModule.forRoot(options)],
  providers: [
    {
      provide: MAILER_OPTIONS,
      useValue: options,
    },
    MailerService,
  ],
  exports: [MailerService, MAILER_OPTIONS],
})
export class EmailModule {}
