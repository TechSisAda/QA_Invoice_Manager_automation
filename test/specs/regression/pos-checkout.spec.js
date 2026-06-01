import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import { testData } from '../../helpers/testData.js'
import LoginPage from '../../pageobjects/login.page.js'
import POSPage from '../../pageobjects/pos.page.js'

describe('REGRESSION — POS & Inventory Checkout', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await POSPage.open()
    })

    it('REG-POS-001 | Product catalog tiles display SKU codes and prices', async () => {
        addFeature('POS'); addSeverity('critical')
        const tile = await POSPage.getProductTile(0)
        await expect(tile.sku).toBeDisplayed()
        await expect(tile.price).toBeDisplayed()
    })

    it('REG-POS-002 | Search bar filters catalog by product name', async () => {
        addFeature('POS'); addSeverity('normal')
        await POSPage.search('Cement')
        const tiles = await POSPage.getVisibleTiles()
        for (const tile of tiles) {
            await expect(tile.$('[data-testid="tile-label"]')).toHaveTextContaining(/cement/i)
        }
    })

    it('REG-POS-003 | Clicking a product tile adds it to the invoice basket', async () => {
        addFeature('POS'); addSeverity('critical')
        await POSPage.addToBasket('Cement')
        await expect(POSPage.basketItem('Cement')).toBeDisplayed()
    })

    it('REG-POS-004 | Quantity controls update basket subtotal in real time', async () => {
        addFeature('POS'); addSeverity('critical')
        await POSPage.setQuantity('Cement', 3)
        const subtotal = await POSPage.getSubtotalNumeric()
        const unitPrice = await POSPage.getUnitPrice('Cement')
        expect(subtotal).toBeCloseTo(unitPrice * 3, 0)
    })

    it('REG-POS-005 | Grand total includes 7.5% VAT on top of subtotal', async () => {
        addFeature('POS'); addSeverity('blocker')
        const subtotal = await POSPage.getSubtotalNumeric()
        const grandTotal = await POSPage.getGrandTotalNumeric()
        expect(grandTotal).toBeCloseTo(subtotal * 1.075, 1)
    })

    it('REG-POS-006 | Load Local Invoice pulls up items from a saved draft', async () => {
        addFeature('POS'); addSeverity('normal')
        await POSPage.loadLocalInvoice(testData.draftInvoiceId)
        await expect(POSPage.basketItem(testData.draftItem)).toBeDisplayed()
    })
})
