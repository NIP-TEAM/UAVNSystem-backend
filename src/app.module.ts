import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaneModule } from './core/plane/plane.module';
import { AuthModule } from './core/auth/auth.module';
import { TenantsController } from './core/tenants/tenants.controller';
import { TenantsService } from './core/tenants/tenants.service';
import { TenantsModule } from './core/tenants/tenants.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToolsService } from './utils/tools.service';
import { AuthService } from './core/auth/auth.service';
import { UserService } from './core/user/user.service';
import { EmailModule } from './core/email/email.module';
import { MailerModule } from '@nestjs-modules/mailer';
import EMAIL from './core/email/config';

@Module({
  controllers: [AppController, TenantsController],
  providers: [
    AppService,
    TenantsService,
    ToolsService,
    AuthService,
    UserService,
  ],
  imports: [
    PlaneModule,
    AuthModule,
    TenantsModule,
    PrismaModule,
    EmailModule,
    MailerModule.forRoot(EMAIL),
  ],
})
export class AppModule {}
