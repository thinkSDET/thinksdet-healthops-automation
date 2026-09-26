export class TestDataGenerator {

    static generateOrganizationName(): string {
        return `City General Hospital ${Date.now()}`;
    }

    static generateWorkspaceCode(): string {
        return `city-general-${Date.now()}`;
    }

    static generateAdminEmail(): string {
        return `admin${Date.now()}@healthops.com`;
    }

    static generatePatientEmail():string{
        return `patinet${Date.now()}@healthops.com`
    }
}