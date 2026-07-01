const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

// Card-view component prefix used in all dynamic element IDs
const PRODUCTS_CDV = 'Hasob_BizEngine_Models_InventoryItem'

class ProductsPage {

    // ── Breadcrumb ─────────────────────────────────────────────────────────────
    get breadcrumbTitle()       { return $('.breadcrumb-title') }
    get breadcrumbSubtitle()    { return $('.text-danger.d-none.d-md-flex') }
    get backToDashboardLink()   { return $('a[href*="dashboard"]') }

    // ── Page header action ────────────────────────────────────────────────────
    get newItemBtn()            { return $('#btn-new-mdl-inventoryItem-modal') }

    // ── KPI summary cards ─────────────────────────────────────────────────────
    get totalProductsCard()     { return $('.card.radius-10.border-start.border-primary') }
    get totalServicesCard()     { return $('.card.radius-10.border-start.border-tiffany') }
    get totalProductsCount()    { return $('.text-success h4.mb-0') }
    get totalServicesCount()    { return $('.text-pink h4.mb-0') }

    // ── List / Card view ──────────────────────────────────────────────────────
    get searchInput()           { return $(`[id$="-${PRODUCTS_CDV}-txt-search"]`) }
    get searchBtn()             { return $(`[id$="-${PRODUCTS_CDV}-btn-search"]`) }
    get filterAllBtn()          { return $(`[class*="-${PRODUCTS_CDV}-grp"][data-val="All"]`) }
    get filterProductsBtn()     { return $(`[class*="-${PRODUCTS_CDV}-grp"][data-val="Products"]`) }
    get filterServicesBtn()     { return $(`[class*="-${PRODUCTS_CDV}-grp"][data-val="Services"]`) }
    get cardViewContainer()     { return $(`[id$="-${PRODUCTS_CDV}-div-card-view"]`) }
    get listSpinner()           { return $(`[id^="spinner-cdv"][id$="-${PRODUCTS_CDV}"]`) }
    get pagination()            { return $(`[id$="-${PRODUCTS_CDV}-pagination"]`) }
    get paginationLimitBtn()    { return $(`[id^="btn-cdv_"][id$="-${PRODUCTS_CDV}-pagination"]`) }

    // Row-level action buttons (rendered inside the dynamically loaded card HTML)
    get firstEditBtn()          { return $('.btn-edit-mdl-inventoryItem-modal') }
    get firstDeleteBtn()        { return $('.btn-delete-mdl-inventoryItem-modal') }
    editBtnFor(id)              { return $(`.btn-edit-mdl-inventoryItem-modal[data-val="${id}"]`) }
    deleteBtnFor(id)            { return $(`.btn-delete-mdl-inventoryItem-modal[data-val="${id}"]`) }

    // ── Create / Edit modal ───────────────────────────────────────────────────
    get modal()                 { return $('#mdl-inventoryItem-modal') }
    get modalTitle()            { return $('#mdl-inventoryItem-modal #lbl-inventoryItem-modal-title') }
    get modalErrorDiv()         { return $('#div-inventoryItem-modal-error') }

    // Form fields
    get titleInput()            { return $('#title') }
    get codeInput()             { return $('#code') }
    get generateCodeBtn()       { return $('#generate-new-code') }
    get descriptionTextarea()   { return $('#description') }
    get unitPriceInput()        { return $('#initial_amount') }
    get quantityInput()         { return $('#quantity') }
    get quantityUomSelect()     { return $('#quantity_uom') }
    get taxCheckbox()           { return $('#cost_includes_vat') }
    get productRadio()          { return $('#is_product_item') }
    get serviceRadio()          { return $('#is_service_item') }
    get imagePreview()          { return $('#item_image_preview') }

    // Modal controls
    get saveModalBtn()          { return $('#btn-save-mdl-inventoryItem-modal') }
    get closeModalBtn()         { return $('#mdl-inventoryItem-modal button.btn-close') }
    get hiddenPrimaryId()       { return $('#txt-inventoryItem-primary-id') }
    get modalSpinner()          { return $('#spinner-inventory_items') }

    // ── Image preview modal ───────────────────────────────────────────────────
    get imageModal()            { return $('#mdl-img-modal') }
    get imageDisplay()          { return $('#img_display') }

    // ── Info panel ────────────────────────────────────────────────────────────
    get infoPanelCard()         { return $('.card.radius-5.border-top.border-primary') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE + '/be/inventoryItems')
        await this.newItemBtn.waitForDisplayed({ timeout: 15000 })
    }

    async waitForListLoaded() {
        await browser.waitUntil(
            async () => !(await this.listSpinner.isDisplayed()),
            { timeout: 15000, interval: 300 }
        )
    }

    async openNewModal() {
        await this.newItemBtn.waitForClickable({ timeout: 10000 })
        await this.newItemBtn.click()
        await this.modal.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => !(await this.modalSpinner.isDisplayed()),
            { timeout: 5000 }
        )
    }

    async searchForItem(query) {
        await this.searchInput.clearValue()
        await this.searchInput.setValue(query)
        await this.searchBtn.click()
        await browser.pause(800)
        await this.waitForListLoaded()
    }

    async closeModal() {
        await this.closeModalBtn.click()
        await this.modal.waitForDisplayed({ reverse: true, timeout: 5000 })
    }

    async createItem({ title, code, description, unitPrice, quantity, quantityUom, taxApplicable, itemType }) {
        await this.openNewModal()

        await this.titleInput.setValue(title)
        await this.codeInput.setValue(code)
        if (description) {
            await this.descriptionTextarea.setValue(description)
        }
        await this.unitPriceInput.setValue(unitPrice)
        await this.quantityInput.setValue(quantity)
        await this.quantityUomSelect.selectByAttribute('value', quantityUom)

        if (taxApplicable) {
            const checked = await this.taxCheckbox.isSelected()
            if (!checked) await this.taxCheckbox.click()
        }

        if (itemType === 'service_item') {
            await this.serviceRadio.click()
        } else {
            await this.productRadio.click()
        }

        await this.saveModalBtn.click()
        await this.confirmSwal()
        await this.newItemBtn.waitForDisplayed({ timeout: 20000 })
        await this.waitForListLoaded()
    }

    async confirmSwal() {
        const confirmBtn = await $('.sweet-alert button.confirm')
        await confirmBtn.waitForDisplayed({ timeout: 5000 })
        await confirmBtn.click()
    }

    async deleteFirstItem() {
        await this.firstDeleteBtn.click()
        await this.confirmSwal()
        // Second swal ("Deleted successfully") — confirm it too then page reloads
        await this.confirmSwal()
        await this.newItemBtn.waitForDisplayed({ timeout: 20000 })
        await this.waitForListLoaded()
    }
}

export default new ProductsPage()
