import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import { testData } from '../../helpers/testData.js'
import LoginPage from '../../pageobjects/login.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('REGRESSION — FIRS Integration & Validation', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('REG-FIRS-001 | Finalised invoice receives a non-empty IRN from FIRS', async () => {
        addFeature('FIRS Integration'); addSeverity('blocker')
        await InvoicePage.createAndSubmit(testData.validInvoice)
        await expect(InvoicePage.irnBadge).toBeDisplayed()
        await expect(InvoicePage.irnBadge).not.toHaveText('')
    })

    it('REG-FIRS-002 | CSID stamp is present on a validated invoice', async () => {
        addFeature('FIRS Integration'); addSeverity('critical')
        await InvoicePage.getValidatedInvoice()
        await expect(InvoicePage.csidStamp).toBeDisplayed()
    })

    it('REG-FIRS-003 | QR code is generated on a FIRS-signed invoice', async () => {
        addFeature('FIRS Integration'); addSeverity('critical')
        await InvoicePage.getSignedInvoice()
        await expect(InvoicePage.qrCode).toBeDisplayed()
        const src = await InvoicePage.qrCode.getAttribute('src')
        expect(src).toMatch(/^data:image/)
    })

    it('REG-FIRS-004 | Validation error panel shows a human-readable rejection reason', async () => {
        addFeature('FIRS Integration'); addSeverity('critical')
        await InvoicePage.submitInvalidInvoice(testData.missingTINInvoice)
        await expect(InvoicePage.validationErrorPanel).toHaveTextContaining(/TIN/i)
    })

    it('REG-FIRS-005 | Status sidebar shows steps: Received → FIRS → Acknowledged', async () => {
        addFeature('FIRS Integration'); addSeverity('normal')
        await InvoicePage.getSignedInvoice()
        const statuses = await InvoicePage.getStatusSteps()
        expect(statuses).toEqual(['Received', 'FIRS', 'Acknowledged'])
    })

    it('REG-FIRS-006 | FIRS-signed invoice can be exported as PDF', async () => {
        addFeature('FIRS Integration'); addSeverity('normal')
        await InvoicePage.getSignedInvoice()
        const download = await InvoicePage.exportAs('PDF')
        expect(download.filename).toMatch(/\.pdf$/i)
    })

    it('REG-FIRS-007 | FIRS-signed invoice can be exported as JSON', async () => {
        addFeature('FIRS Integration'); addSeverity('minor')
        await InvoicePage.getSignedInvoice()
        const download = await InvoicePage.exportAs('JSON')
        // Verify a JSON file was downloaded — content inspection requires a separate file read
        expect(download.filename).toMatch(/\.json$/i)
    })
})
