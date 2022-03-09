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
    host: 'mail.authdare.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  },
  defaults: {
    from: '"Authdare" <security@authdare.com>',
  },

  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
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
