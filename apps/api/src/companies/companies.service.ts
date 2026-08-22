import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompaniesService {
    constructor(private readonly prisma: PrismaService) { }

    async getCompanies(): Promise<any[]> {
        return await this.prisma.company.findMany();
    }
}