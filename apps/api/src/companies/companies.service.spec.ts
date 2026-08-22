import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from '../prisma/prisma.service'
import { CompaniesService } from './companies.service'

describe('CompaniesService', () => {
    let service: CompaniesService
    const findMany = jest.fn()

    beforeEach(async () => {
        findMany.mockReset()

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompaniesService,
                {
                    provide: PrismaService,
                    useValue: {
                        company: { findMany },
                    },
                },
            ],
        }).compile()

        service = module.get(CompaniesService)
    })

    it('returns companies from Prisma', async () => {
        const companies: any[] = []
        findMany.mockResolvedValue(companies)

        await expect(service.getCompanies()).resolves.toEqual(companies)
        expect(findMany).toHaveBeenCalledWith()
    })
})