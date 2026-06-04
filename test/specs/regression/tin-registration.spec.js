import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import TINPage from '../../pageobjects/tin-registration.page.js'

describe('REGRESSION — TIN Registration & FIRS Enablement', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('REG-TIN-001 | TIN registration form renders Business Info and Final Preview tabs', async () => {
        addFeature('TIN Registration'); addSeverity('critical')
        await TINPage.open()
        await expect(TINPage.businessInfoTab).toBeDisplayed()
        await expect(TINPage.finalPreviewTab).toBeDisplayed()
    })

    it('REG-TIN-002 | BN field shows for Business Name type; RC field shows for Private Limited', async () => {
        addFeature('TIN Registration'); addSeverity('normal')
        await TINPage.selectBusinessType('Business Name')
        await expect(TINPage.bnField).toBeDisplayed()
        await expect(TINPage.rcField).not.toBeDisplayed()
        await TINPage.selectBusinessType('Private Limited')
        await expect(TINPage.rcField).toBeDisplayed()
        await expect(TINPage.bnField).not.toBeDisplayed()
    })

    it('REG-TIN-003 | Form blocks submission when NIN field is empty', async () => {
        addFeature('TIN Registration'); addSeverity('critical')
        await TINPage.submitWithoutNIN()
        await expect(TINPage.ninError).toHaveText(/required/i)
    })

    it('REG-TIN-004 | LGA dropdown populates after State and City are selected', async () => {
        addFeature('TIN Registration'); addSeverity('normal')
        await TINPage.selectState('Lagos')
        await TINPage.selectCity('Ikeja')
        await expect(TINPage.lgaDropdown).not.toBeDisabled()
        const options = await TINPage.lgaDropdown.$$('option')
        expect(options.length).toBeGreaterThan(0)
    })

    it('REG-TIN-005 | Save and Continue persists entered data on return', async () => {
        addFeature('TIN Registration'); addSeverity('normal')
        await TINPage.fillPartialForm({ firstName: 'John', lastName: 'Doe' })
        await TINPage.saveAndContinue()
        await browser.url('/dashboard')
        await TINPage.open()
        await expect(TINPage.firstNameField).toHaveValue('John')
    })

    it('REG-TIN-006 | FIRS Enablement blocks submission without T&C consent', async () => {
        addFeature('FIRS TIN Enablement'); addSeverity('critical')
        await TINPage.openEnablement()
        await TINPage.submitEnablementWithoutConsent()
        await expect(TINPage.consentError).toBeDisplayed()
    })

    it('REG-TIN-007 | Business sector dropdown includes expected industry categories', async () => {
        addFeature('FIRS TIN Enablement'); addSeverity('normal')
        await TINPage.openEnablement()
        const sectors = await TINPage.getSectorOptions()
        expect(sectors).toContain('Agriculture')
        expect(sectors).toContain('IT')
        expect(sectors).toContain('Retail')
        expect(sectors).toContain('Healthcare')
    })
})
