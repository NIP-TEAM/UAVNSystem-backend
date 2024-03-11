import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlaneModule } from './core/plane/plane.module';
import { AuthModule } from './auth/auth.module';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { TenantsModule } from './tenants/tenants.module';
import { PrismaModule } from './prisma/prisma.module';
import { ToolsService } from './utils/tools.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './core/user/user.service';

@Module({
  controllers: [AppController, TenantsController],
  providers: [
    AppService,
    TenantsService,
    ToolsService,
    AuthService,
    UserService,
  ],
  imports: [PlaneModule, AuthModule, TenantsModule, PrismaModule],
})
export class AppModule {}
