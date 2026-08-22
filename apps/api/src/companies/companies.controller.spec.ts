import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';

describe('CompaniesController', () => {
    let companiesController: CompaniesController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CompaniesController],
            providers: [CompaniesService],
        }).compile();

        companiesController = app.get<CompaniesController>(CompaniesController);
    });

    describe('/companies', () => {
        it('should return "Here be companies"', () => {
            expect(companiesController.getCompanies()).toBe('Here be companies');
        });
    });
});
