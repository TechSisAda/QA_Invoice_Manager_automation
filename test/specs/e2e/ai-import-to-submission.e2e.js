import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'
import path from 'path'

describe('E2E — AI Import → Validate → FIRS Submit', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('E2E-003 | Upload scanned PDF → AI extracts data → validate → submit to FIRS', async () => {
        addFeature('AI Import + FIRS'); addSeverity('critical')

        await InvoicePage.openImport()

        // Upload a scanned invoice image/PDF
        await InvoicePage.uploadFile(path.resolve('./test/fixtures/scanned-invoice.pdf'))
        await InvoicePage.enterNLPDescription('Extract all line items and VAT breakdown')
        await InvoicePage.triggerExtraction()

        // Review extracted data
        await InvoicePage.proceedToValidation()
        const data = await InvoicePage.getExtractedData()
        expect(data[0].vendorName).toBeTruthy()
        expect(data[0].totalAmount).toBeGreaterThan(0)

        // Confirm and submit to FIRS
        await InvoicePage.confirmImport()
        await InvoicePage.finalizeAndSubmit()

        await expect(InvoicePage.irnBadge).toBeDisplayed()
    })
})
