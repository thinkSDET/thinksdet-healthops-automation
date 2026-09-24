import testData from '../test-data/organization-registration.json'
import { OrganizationData } from '../types/OrganizationData';
import { TestDataGenerator } from './TestDataGenerator';

export class OrganizationDataFactory {

    static validOrganization() : OrganizationData  {
        return {
            ...testData.validOrganization,
            organizationName: TestDataGenerator.generateOrganizationName(),
            workspaceCode: TestDataGenerator.generateWorkspaceCode(),
            adminEmail: TestDataGenerator.generateAdminEmail()
        };
    }
}