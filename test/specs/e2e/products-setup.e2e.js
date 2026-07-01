import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import ProductsPage from '../../pageobjects/products.page.js'
import { bentenProduct, bentenService } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// E2E: New Instance Setup — Products & Services
//
// Pre-condition: A fresh instance with no inventory items, or used to seed the
//               first product and first service needed by invoice creation tests.
//
// Flow:         Login → Products & Services → create one Product (Cement Bag)
//               → create one Service (Consulting Service) → verify both appear.
//
// Run this BEFORE regression/products.spec.js. The regression suite asserts
// that at least one product and one service are listed.
// ─────────────────────────────────────────────────────────────────────────────

describe('E2E — New Instance Setup: Products & Services', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await ProductsPage.open()
        await ProductsPage.waitForListLoaded()
    })

    // ── Page loads ─────────────────────────────────────────────────────────────

    it('E2E-PROD-001 | Products & Services page opens after login', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Products/i)
    })

    it('E2E-PROD-002 | New Item button is present and enabled', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.newItemBtn).toBeDisplayed()
        await expect(ProductsPage.newItemBtn).not.toBeDisabled()
    })

    it('E2E-PROD-003 | KPI summary cards are visible', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.totalProductsCard).toBeDisplayed()
        await expect(ProductsPage.totalServicesCard).toBeDisplayed()
    })

    // ── Create modal structure ─────────────────────────────────────────────────

    it('E2E-PROD-004 | Clicking New Item opens the inventory item modal', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.openNewModal()
        await expect(ProductsPage.modal).toBeDisplayed()
    })

    it('E2E-PROD-005 | Modal is in create mode when opened via New Item button', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        // The title label retains its last-used state on seeded instances;
        // the definitive create-mode indicator is an empty hidden primary-id field.
        const primaryId = await ProductsPage.hiddenPrimaryId.getValue()
        expect(['', '0']).toContain(primaryId)
    })

    it('E2E-PROD-006 | Modal has Title, SKU/Code, Description, Unit Price, Quantity, and Unit fields', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.titleInput).toBeDisplayed()
        await expect(ProductsPage.codeInput).toBeDisplayed()
        await expect(ProductsPage.descriptionTextarea).toBeDisplayed()
        await expect(ProductsPage.unitPriceInput).toBeDisplayed()
        await expect(ProductsPage.quantityInput).toBeDisplayed()
        await expect(ProductsPage.quantityUomSelect).toBeDisplayed()
    })

    it('E2E-PROD-007 | Generate Code button is present in the modal', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.generateCodeBtn).toBeDisplayed()
    })

    it('E2E-PROD-008 | Tax applicable checkbox is present', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.taxCheckbox).toBeExisting()
    })

    it('E2E-PROD-009 | Product and Service radio buttons are present, Product selected by default', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.productRadio).toBeExisting()
        await expect(ProductsPage.serviceRadio).toBeExisting()
        const productChecked = await ProductsPage.productRadio.isSelected()
        expect(productChecked).toBe(true)
    })

    it('E2E-PROD-010 | Unit select has multiple unit options including "Nos", "Bags", "Hours"', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.quantityUomSelect.$('option[value="nos"]')).toBeExisting()
        await expect(ProductsPage.quantityUomSelect.$('option[value="bags"]')).toBeExisting()
        await expect(ProductsPage.quantityUomSelect.$('option[value="hours"]')).toBeExisting()
    })

    it('E2E-PROD-011 | Save button is present and enabled on new modal', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.saveModalBtn).toBeDisplayed()
        await expect(ProductsPage.saveModalBtn).not.toBeDisabled()
    })

    it('E2E-PROD-012 | Error div is hidden on fresh modal open', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('E2E-PROD-013 | Closing modal without saving dismisses it', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.closeModal()
        await expect(ProductsPage.modal).not.toBeDisplayed()
    })

    // ── Create a Product ───────────────────────────────────────────────────────

    it('E2E-PROD-014 | Can fill and save a new Product (Cement Bag)', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.createItem(bentenProduct)
        await expect(ProductsPage.newItemBtn).toBeDisplayed()
    })

    it('E2E-PROD-015 | "Cement Bag" product appears in the card view list', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.searchForItem(bentenProduct.title)
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)
    })

    // ── Create a Service ───────────────────────────────────────────────────────

    it('E2E-PROD-016 | Can fill and save a new Service (Consulting Service)', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.createItem(bentenService)
        await expect(ProductsPage.newItemBtn).toBeDisplayed()
    })

    it('E2E-PROD-017 | "Consulting Service" appears in the card view list', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.searchForItem(bentenService.title)
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenService.title)
    })

    it('E2E-PROD-018 | Instance now has at least one product and one service — ready for invoicing', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.searchForItem(bentenProduct.title)
        let listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)

        await ProductsPage.searchForItem(bentenService.title)
        listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenService.title)
    })
})
