import testData from '../test-data/organization-registration.json'
import registerTestData from '../test-data/public-registration.json'
import { OrganizationData } from '../types/OrganizationData';
import { RegistrationData } from '../types/RegistrationData';
import { TestDataGenerator } from './TestDataGenerator';

export class TestDataFactory {

    static validOrganization() : OrganizationData  {
        return {
            ...testData.validOrganization,
            organizationName: TestDataGenerator.generateOrganizationName(),
            workspaceCode: TestDataGenerator.generateWorkspaceCode(),
            adminEmail: TestDataGenerator.generateAdminEmail()
        };
    }

    static patientRegstration() : RegistrationData{
        return {
            ...registerTestData.patientRegistration,
            emailAddress : TestDataGenerator.generatePatientEmail()
        }

    }
}