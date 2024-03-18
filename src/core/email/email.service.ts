import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import EMAIL from './config';

@Injectable()
export class EmailService {
  private transporter = null;
  constructor() {
    this.transporter = createTransport(EMAIL);
  }

  sendEmail(email: string, text: string, subject: string, html: unknown) {
    
  }
}
