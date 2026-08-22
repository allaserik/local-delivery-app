import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompaniesService {
    constructor(private readonly prisma: PrismaService) { }

    async getCompanies(): Promise<any[]> {
        return await this.prisma.company.findMany();
    }

    async createCompany(createCompanyDto: CreateCompanyDto) {
        return this.prisma.company.create({
            data: createCompanyDto,
        });
    }
}