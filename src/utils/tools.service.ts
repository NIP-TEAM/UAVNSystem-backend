import { Injectable } from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';

@Injectable()
export class ToolsService {
  async captche() {
    const captcha = svgCaptcha.create({
      size: 4,
      fontSize: 50,
    });
    const buffer = Buffer.from(captcha.data, 'utf-8');
    const base64String = buffer.toString('base64');
    return {
      captcha_image: base64String,
      captcha_key: captcha.text,
      image_decode: 'base64',
      image_type: 'image/svg+xml',
    };
  }
}
