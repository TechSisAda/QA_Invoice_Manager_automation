import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import POSPage from '../../pageobjects/pos.page.js'
import InvoicePage from '../../pageobjects/invoice.page.js'

describe('E2E — POS Checkout to FIRS-Signed Invoice', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
    })

    it('E2E-002 | Select POS products → adjust quantities → checkout → invoice is FIRS signed', async () => {
        addFeature('POS + FIRS'); addSeverity('critical')

        await POSPage.open()

        await POSPage.addToBasket('Cement Bag')
        await POSPage.setQuantity('Cement Bag', 10)

        await POSPage.addToBasket('Iron Rod')
        await POSPage.setQuantity('Iron Rod', 5)

        const grandTotal = await POSPage.getGrandTotalNumeric()
        expect(grandTotal).toBeGreaterThan(0)

        await POSPage.proceedToCheckout()
        await InvoicePage.finalizeAndSubmit()

        await expect(InvoicePage.irnBadge).toBeDisplayed()
        await expect(InvoicePage.statusBadge).toHaveText('Signed')
    })
})
