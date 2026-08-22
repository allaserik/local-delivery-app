import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './companies/companies.service';
import { CompaniesModule } from './companies/companies.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CompaniesModule],
  controllers: [AppController, ],
  providers: [AppService, PrismaService, ],
})
export class AppModule { }
