import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export default {
  transport: {
    alias: 'UAVN admin',
    host: 'smtp.163.com',
    port: 465,
    secure: true,
    auth: {
      user: 'z2530056984@qq.com',
      pass: 'TZSRWOQCUXJGXYNF',
    },
    defaults: {
      from: '"No Reply" <noreply@example.com>',
    },
    template: {
      // 指定 Handlebars 模板引擎
      dir: __dirname + 'src/core/email/templates',
      adapter: new HandlebarsAdapter(), // 使用 HandlebarsAdapter
      options: {
        // Handlebars 配置选项
        strict: true,
      },
    },
  },
};
