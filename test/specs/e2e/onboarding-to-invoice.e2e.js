import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import { testData } from '../../helpers/testData.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'
import TINPage from '../../pageobjects/tin-registration.page.js'
import AdminPage from '../../pageobjects/admin.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: Full business onboarding → FIRS-signed invoice
//
// Pre-condition: A business instance already exists (benten.invoicemanager.ng).
// Flow:          Login → enable TIN → add client & product
//                → create invoice → FIRS sign → email client
//
// NOTE: The subscription registration step (Subscribe Now) is currently
// blocked by a server-side bug (JIRA blocker). This E2E starts from login
// into the existing benten instance instead.
// ─────────────────────────────────────────────────────────────────────────────

describe('E2E — Full Business Onboarding to FIRS-Signed Invoice', () => {

    it('E2E-001 | Login → enable TIN → add client & product → create invoice → FIRS sign → email client', async () => {
        addFeature('Full Journey'); addSeverity('blocker')

        // 1. Log in to the existing benten instance
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await DashboardPage.open()
        await expect(DashboardPage.welcomeBanner).toBeDisplayed()

        // 2. Enable FIRS TIN
        await TINPage.enableTIN({ tin: testData.validTIN, sector: 'IT' })
        await expect(TINPage.enablementSuccessBadge).toBeDisplayed()

        // 3. Add a client
        await AdminPage.addClient({ name: 'E2E Client Ltd', tin: testData.clientTIN })

        // 4. Add a product
        await AdminPage.addProduct({ name: 'SaaS License', price: 200000, taxable: true })

        // 5. Create invoice through wizard
        await InvoicePage.openWizard()
        await InvoicePage.fillStep1({ client: 'E2E Client Ltd', type: 'Commercial Invoice' })
        await InvoicePage.fillStep2({ product: 'SaaS License', qty: 1, unitPrice: 200000, taxable: true })
        await InvoicePage.fillStep3()
        await InvoicePage.finalizeAndSubmit()

        // 6. Assert FIRS signature artefacts
        await expect(InvoicePage.irnBadge).toBeDisplayed()
        await expect(InvoicePage.csidStamp).toBeDisplayed()
        await expect(InvoicePage.qrCode).toBeDisplayed()

        // 7. Send signed invoice to client by email
        await InvoicePage.sendToEmail('billing@e2eclient.com')
        await expect(InvoicePage.emailSentConfirmation).toBeDisplayed()
    })
})
