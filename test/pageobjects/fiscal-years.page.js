const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

// The cdv_* prefix changes between deployments; anchor selectors to the stable model/id suffix.
const FISCAL_YEAR_CDV = 'Hasob_BizEngine_Models_FiscalYear'

class FiscalYearsPage {

    // ── Breadcrumb ─────────────────────────────────────────────────────────────
    get breadcrumbTitle()      { return $('.breadcrumb-title') }
    get breadcrumbSubtitle()   { return $('.text-danger.d-none.d-md-flex') }
    get backToDashboardLink()  { return $('a[href*="dashboard"]') }

    // ── Page header action ────────────────────────────────────────────────────
    get newFiscalYearBtn()     { return $('#btn-new-mdl-fiscalYear-modal') }

    // ── List / Card view ──────────────────────────────────────────────────────
    get searchInput()          { return $(`[id$="-${FISCAL_YEAR_CDV}-txt-search"]`) }
    get searchBtn()            { return $(`[id$="-${FISCAL_YEAR_CDV}-btn-search"]`) }
    get filterAllBtn()         { return $(`[class*="-${FISCAL_YEAR_CDV}-grp"][data-val="All"]`) }
    get filterOpenBtn()        { return $(`[class*="-${FISCAL_YEAR_CDV}-grp"][data-val="Open"]`) }
    get filterClosedBtn()      { return $(`[class*="-${FISCAL_YEAR_CDV}-grp"][data-val="Closed"]`) }
    get cardViewContainer()    { return $(`[id$="-${FISCAL_YEAR_CDV}-div-card-view"]`) }
    get listSpinner()          { return $(`[id^="spinner-cdv_"][id$="-${FISCAL_YEAR_CDV}"]`) }
    get pagination()           { return $(`[id$="-${FISCAL_YEAR_CDV}-pagination"]`) }
    get paginationLimitBtn()   { return $(`[id^="btn-cdv_"][id$="-${FISCAL_YEAR_CDV}-pagination"]`) }

    // Row-level action buttons (rendered inside the dynamically loaded card HTML)
    get firstEditBtn()         { return $('.btn-edit-mdl-fiscalYear-modal') }
    get firstDeleteBtn()       { return $('.btn-delete-mdl-fiscalYear-modal') }
    get firstViewBtn()         { return $('.btn-show-mdl-fiscalYear-modal') }
    editBtnFor(id)             { return $(`.btn-edit-mdl-fiscalYear-modal[data-val="${id}"]`) }
    deleteBtnFor(id)           { return $(`.btn-delete-mdl-fiscalYear-modal[data-val="${id}"]`) }
    viewBtnFor(id)             { return $(`.btn-show-mdl-fiscalYear-modal[data-val="${id}"]`) }

    // ── Create / Edit modal ───────────────────────────────────────────────────
    get modal()                { return $('#mdl-fiscalYear-modal') }
    get modalTitle()           { return $('#lbl-fiscalYear-modal-title') }
    get modalErrorDiv()        { return $('#div-fiscalYear-modal-error') }
    get nameInput()            { return $('#f_name') }
    get statusSelect()         { return $('#status') }
    get isCurrentSelect()      { return $('#is_current') }
    get startDateInput()       { return $('#start_date') }
    get endDateInput()         { return $('#end_date') }
    get saveModalBtn()         { return $('#btn-save-mdl-fiscalYear-modal') }
    get closeModalBtn()        { return $('#mdl-fiscalYear-modal button.btn-close') }
    get hiddenPrimaryId()      { return $('#txt-fiscalYear-primary-id') }
    get modalSpinner()         { return $('#spinner-fiscal_years') }

    // ── Info panel ────────────────────────────────────────────────────────────
    get infoPanelCard()        { return $('.card.radius-5.border-top.border-primary') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE + '/be/fiscalYears')
        await this.newFiscalYearBtn.waitForDisplayed({ timeout: 15000 })
    }

    async waitForListLoaded() {
        // Spinner shows while AJAX loads the card list, then hides
        await browser.waitUntil(
            async () => !(await this.listSpinner.isDisplayed()),
            { timeout: 15000, interval: 300 }
        )
        await this.cardViewContainer.waitForExist({ timeout: 15000 })
    }

    async openNewModal() {
        await this.newFiscalYearBtn.click()
        await this.modal.waitForDisplayed({ timeout: 5000 })
        // New-modal JS hides the spinner and enables Save immediately
        await browser.waitUntil(
            async () => !(await this.modalSpinner.isDisplayed()),
            { timeout: 5000 }
        )
    }

    async closeModal() {
        await this.closeModalBtn.click()
        await this.modal.waitForDisplayed({ reverse: true, timeout: 5000 })
    }

    async createFiscalYear({ name, status, isCurrent, startDate, endDate }) {
        await this.openNewModal()
        await this.nameInput.setValue(name)
        await this.statusSelect.selectByAttribute('value', status)
        await this.isCurrentSelect.selectByAttribute('value', isCurrent)
        await this.startDateInput.setValue(startDate)
        await this.endDateInput.setValue(endDate)
        await this.saveModalBtn.click()
        // After a successful save the page reloads (location.reload or location.replace)
        await this.newFiscalYearBtn.waitForDisplayed({ timeout: 20000 })
        await this.waitForListLoaded()
    }
}

export default new FiscalYearsPage()
