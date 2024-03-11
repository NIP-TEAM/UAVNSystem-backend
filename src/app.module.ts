import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './core/user/user.module';
import { PlaneModule } from './core/plane/plane.module';
import { AuthModule } from './auth/auth.module';
import { TenantsController } from './tenants/tenants.controller';
import { TenantsService } from './tenants/tenants.service';
import { TenantsModule } from './tenants/tenants.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [AppController, TenantsController],
  providers: [AppService, TenantsService],
  imports: [UserModule, PlaneModule, AuthModule, TenantsModule, PrismaModule],
})
export class AppModule {}
