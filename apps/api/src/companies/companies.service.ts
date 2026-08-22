import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
    getCompanies(): string {
        return 'Here be companies';
    }
}