import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import AdminPage from '../../pageobjects/admin.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('REGRESSION — Account & Setup', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('REG-AS-001 | Business profile can be saved with all required fields', async () => {
        addFeature('Account & Setup'); addSeverity('critical')
        await AdminPage.openBusinessProfile()
        await AdminPage.fillBusinessProfile({
            companyName: 'Test Corp Ltd',
            tin: '12345678-0001',
            vat: 'VAT123'
        })
        await AdminPage.save()
        await expect(AdminPage.successToast).toHaveText(/saved/i)
    })

    it('REG-AS-002 | Admin can invite a new user with Viewer role', async () => {
        addFeature('Account & Setup'); addSeverity('normal')
        await AdminPage.openUserManagement()
        await AdminPage.inviteUser('viewer@testcorp.com', 'Viewer')
        await expect(AdminPage.userTable).toHaveTextContaining('viewer@testcorp.com')
    })

    it('REG-AS-003 | Viewer role cannot access invoice submission controls', async () => {
        addFeature('Account & Setup'); addSeverity('critical')
        await LoginPage.loginAs('viewer@testcorp.com')
        await InvoicePage.openInvoiceList()
        await expect(InvoicePage.submitToFIRSButton).not.toBeDisplayed()
    })

    it('REG-AS-004 | Second business entity can be added to the account', async () => {
        addFeature('Account & Setup'); addSeverity('normal')
        await LoginPage.loginAs(process.env.TEST_EMAIL)
        await AdminPage.addCompanyEntity({ name: 'Subsidiary Ltd', tin: '98765432-0001' })
        await expect(AdminPage.companySelector).toHaveTextContaining('Subsidiary Ltd')
    })
})
