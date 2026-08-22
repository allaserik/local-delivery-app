import { Controller, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Get()
  async getCompanies(): Promise<any[]> {
    return await this.companiesService.getCompanies();
  }
}
