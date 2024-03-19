import { MailerOptions } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

const fromUser = process.env.EMAIL_USER;
const passport = process.env.EMAIL_TOKEN;

const EMAILCONFIG: MailerOptions = {
  transport: {
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: fromUser,
      pass: passport,
    },
  },
  template: {
    dir: 'src/core/email/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
  defaults: { from: `"No Reply" <${fromUser}>` },
};

export default EMAILCONFIG;
