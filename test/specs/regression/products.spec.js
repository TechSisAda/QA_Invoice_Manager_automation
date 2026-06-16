import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import ProductsPage from '../../pageobjects/products.page.js'
import { bentenProduct, bentenService } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION — Products & Services
//
// Pre-condition: At least one product (Cement Bag) and one service (Consulting
// Service) have been created. For a brand-new empty instance, run
// test/specs/e2e/products-setup.e2e.js FIRST, then run this suite.
// ─────────────────────────────────────────────────────────────────────────────

describe('REGRESSION — Products & Services', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await ProductsPage.open()
        await ProductsPage.waitForListLoaded()
    })

    // ── Page Structure ─────────────────────────────────────────────────────────

    it('REG-PROD-001 | Products & Services page loads with correct title', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Products/i)
    })

    it('REG-PROD-002 | Breadcrumb shows "Manage" title', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.breadcrumbTitle).toHaveText(/Manage/i)
    })

    it('REG-PROD-003 | Breadcrumb subtitle shows "Products & Services"', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.breadcrumbSubtitle).toHaveText(/Products/i)
    })

    it('REG-PROD-004 | Back to Dashboard link is present and links to dashboard', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.backToDashboardLink).toBeDisplayed()
        const href = await ProductsPage.backToDashboardLink.getAttribute('href')
        expect(href).toContain('dashboard')
    })

    it('REG-PROD-005 | New Item button is visible and enabled', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.newItemBtn).toBeDisplayed()
        await expect(ProductsPage.newItemBtn).not.toBeDisabled()
    })

    it('REG-PROD-006 | New Item button label is correct', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.newItemBtn).toHaveText(/New Item/i)
    })

    // ── KPI Summary Cards ──────────────────────────────────────────────────────

    it('REG-PROD-007 | Total Products KPI card is displayed', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.totalProductsCard).toBeDisplayed()
        await expect(ProductsPage.totalProductsCard).toHaveText(/Total Products/i)
    })

    it('REG-PROD-008 | Total Products count is a positive number', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        const count = await ProductsPage.totalProductsCount.getText()
        expect(parseInt(count, 10)).toBeGreaterThan(0)
    })

    it('REG-PROD-009 | Total Services KPI card is displayed', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.totalServicesCard).toBeDisplayed()
        await expect(ProductsPage.totalServicesCard).toHaveText(/Total Services/i)
    })

    it('REG-PROD-010 | Total Services count is a positive number', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        const count = await ProductsPage.totalServicesCount.getText()
        expect(parseInt(count, 10)).toBeGreaterThan(0)
    })

    // ── Search and Filter Controls ─────────────────────────────────────────────

    it('REG-PROD-011 | Search input is present with correct placeholder', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.searchInput).toBeDisplayed()
        const placeholder = await ProductsPage.searchInput.getAttribute('placeholder')
        expect(placeholder).toMatch(/Search Inventory/i)
    })

    it('REG-PROD-012 | Search button is present and enabled', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.searchBtn).toBeDisplayed()
        await expect(ProductsPage.searchBtn).not.toBeDisabled()
    })

    it('REG-PROD-013 | "All" filter button is present', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.filterAllBtn).toBeDisplayed()
    })

    it('REG-PROD-014 | "Products" filter button is present', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.filterProductsBtn).toBeDisplayed()
    })

    it('REG-PROD-015 | "Services" filter button is present', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.filterServicesBtn).toBeDisplayed()
    })

    it('REG-PROD-016 | Pagination limit button shows default of 20 items', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.paginationLimitBtn).toBeDisplayed()
        const label = await ProductsPage.paginationLimitBtn.getText()
        expect(label).toContain('20')
    })

    // ── Card View Results ──────────────────────────────────────────────────────

    it('REG-PROD-017 | Card view container is present on page', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.cardViewContainer).toBeExisting()
    })

    it('REG-PROD-018 | Card view shows at least one item (pre-condition: seeded items exist)', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).not.toContain('No results found')
        expect(listText.trim().length).toBeGreaterThan(0)
    })

    it('REG-PROD-019 | "Cement Bag" product appears in the card view', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)
    })

    it('REG-PROD-020 | "Consulting Service" appears in the card view', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenService.title)
    })

    it('REG-PROD-021 | Listed items have edit buttons', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.firstEditBtn).toBeExisting()
    })

    it('REG-PROD-022 | Listed items have delete buttons', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await expect(ProductsPage.firstDeleteBtn).toBeExisting()
    })

    // ── Search Functionality ───────────────────────────────────────────────────

    it('REG-PROD-023 | Searching by "Cement Bag" returns the product', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.searchInput.setValue(bentenProduct.title)
        await ProductsPage.searchBtn.click()
        await ProductsPage.waitForListLoaded()
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)
    })

    it('REG-PROD-024 | Searching by a non-existent term shows "No results found"', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await ProductsPage.searchInput.setValue('ZZZNOMATCH9999')
        await ProductsPage.searchBtn.click()
        await ProductsPage.waitForListLoaded()
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain('No results found')
    })

    it('REG-PROD-025 | Clearing search and clicking All restores full list', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.searchInput.setValue('')
        await ProductsPage.filterAllBtn.click()
        await ProductsPage.waitForListLoaded()
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)
    })

    // ── Filter Buttons ─────────────────────────────────────────────────────────

    it('REG-PROD-026 | "Products" filter shows only product items (contains Cement Bag)', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.filterProductsBtn.click()
        await ProductsPage.waitForListLoaded()
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)
    })

    it('REG-PROD-027 | "Services" filter shows only service items (contains Consulting Service)', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.filterServicesBtn.click()
        await ProductsPage.waitForListLoaded()
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenService.title)
    })

    it('REG-PROD-028 | "All" filter after Services restores both products and services', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.filterAllBtn.click()
        await ProductsPage.waitForListLoaded()
        const listText = await ProductsPage.cardViewContainer.getText()
        expect(listText).toContain(bentenProduct.title)
        expect(listText).toContain(bentenService.title)
    })

    // ── Create Modal (New Item) ────────────────────────────────────────────────

    it('REG-PROD-029 | Clicking New Item opens the create modal with title "New Item"', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await ProductsPage.openNewModal()
        await expect(ProductsPage.modal).toBeDisplayed()
        await expect(ProductsPage.modalTitle).toHaveText(/New Item/i)
    })

    it('REG-PROD-030 | Title and Code inputs are present and empty on new modal', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        expect(await ProductsPage.titleInput.getValue()).toBe('')
        expect(await ProductsPage.codeInput.getValue()).toBe('')
    })

    it('REG-PROD-031 | Unit Price and Quantity inputs are present and empty on new modal', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        expect(await ProductsPage.unitPriceInput.getValue()).toBe('')
        expect(await ProductsPage.quantityInput.getValue()).toBe('')
    })

    it('REG-PROD-032 | Unit select has a default empty "Select" option', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        const val = await ProductsPage.quantityUomSelect.getValue()
        expect(val).toBe('')
    })

    it('REG-PROD-033 | Product radio is selected by default on new modal', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        const checked = await ProductsPage.productRadio.isSelected()
        expect(checked).toBe(true)
    })

    it('REG-PROD-034 | Tax applicable checkbox is unchecked by default', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        const checked = await ProductsPage.taxCheckbox.isSelected()
        expect(checked).toBe(false)
    })

    it('REG-PROD-035 | Generate Code button is present and enabled', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.generateCodeBtn).toBeDisplayed()
        await expect(ProductsPage.generateCodeBtn).not.toBeDisabled()
    })

    it('REG-PROD-036 | Save button is present and enabled on new modal', async () => {
        addFeature('Products & Services'); addSeverity('blocker')
        await expect(ProductsPage.saveModalBtn).toBeDisplayed()
        await expect(ProductsPage.saveModalBtn).not.toBeDisabled()
    })

    it('REG-PROD-037 | Error div is hidden when modal first opens', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.modalErrorDiv).not.toBeDisplayed()
    })

    it('REG-PROD-038 | Closing modal without saving dismisses it', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.closeModal()
        await expect(ProductsPage.modal).not.toBeDisplayed()
    })

    // ── Edit Modal ─────────────────────────────────────────────────────────────

    it('REG-PROD-039 | Clicking edit on the first item opens the modal in edit mode', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.firstEditBtn.click()
        await ProductsPage.modal.waitForDisplayed({ timeout: 5000 })
        // Edit mode shows a swal loading dialog which closes when data loads
        await browser.waitUntil(
            async () => (await ProductsPage.modalTitle.getText()).match(/Edit Item/i),
            { timeout: 15000, interval: 500 }
        )
        await expect(ProductsPage.modal).toBeDisplayed()
    })

    it('REG-PROD-040 | Edit modal title reads "Edit Item"', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.modalTitle).toHaveText(/Edit Item/i)
    })

    it('REG-PROD-041 | Edit modal pre-populates Title with a non-empty value', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        const title = await ProductsPage.titleInput.getValue()
        expect(title.trim().length).toBeGreaterThan(0)
    })

    it('REG-PROD-042 | Edit modal pre-populates Code with a non-empty value', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        const code = await ProductsPage.codeInput.getValue()
        expect(code.trim().length).toBeGreaterThan(0)
    })

    it('REG-PROD-043 | Edit modal pre-populates Unit Price with a positive number', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        const price = await ProductsPage.unitPriceInput.getValue()
        expect(parseFloat(price)).toBeGreaterThan(0)
    })

    it('REG-PROD-044 | Closing edit modal without saving dismisses it', async () => {
        addFeature('Products & Services'); addSeverity('critical')
        await ProductsPage.closeModal()
        await expect(ProductsPage.modal).not.toBeDisplayed()
    })

    // ── Info Panel ─────────────────────────────────────────────────────────────

    it('REG-PROD-045 | Info panel is present with "More Information" heading', async () => {
        addFeature('Products & Services'); addSeverity('normal')
        await expect(ProductsPage.infoPanelCard).toBeDisplayed()
        await expect(ProductsPage.infoPanelCard).toHaveText(/More Information/i)
    })
})
