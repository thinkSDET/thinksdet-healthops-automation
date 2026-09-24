import testData from '../test-data/organization-registration.json'
import { TestDataGenerator } from './TestDataGenerator';

export class OrganizationDataFactory {

    static validOrganization() {
        return {
            ...testData.validOrganization,
            organizationName: TestDataGenerator.generateOrganizationName(),
            workspaceCode: TestDataGenerator.generateWorkspaceCode(),
            adminEmail: TestDataGenerator.generateAdminEmail()
        };
    }
}