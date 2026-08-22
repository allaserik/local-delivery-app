import { Test, TestingModule } from '@nestjs/testing'
import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'

describe('CompaniesController', () => {
    let controller: CompaniesController
    const getCompanies = jest.fn()

    beforeEach(async () => {
        getCompanies.mockReset()

        const module: TestingModule = await Test.createTestingModule({
            controllers: [CompaniesController],
            providers: [
                {
                    provide: CompaniesService,
                    useValue: { getCompanies },
                },
            ],
        }).compile()

        controller = module.get(CompaniesController)
    })

    it('returns the companies from the service', async () => {
        const companies: any[] = [];
        getCompanies.mockResolvedValue(companies)

        await expect(controller.getCompanies()).resolves.toEqual(companies)
        expect(getCompanies).toHaveBeenCalledTimes(1)
    })
})