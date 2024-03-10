import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './core/user/user.module';
import { PlaneModule } from './core/plane/plane.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [UserModule, PlaneModule],
})
export class AppModule {}
