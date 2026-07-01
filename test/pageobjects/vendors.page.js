const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

// The cdv_* prefix changes between deployments; anchor selectors to the stable model/id suffix.
const VENDOR_CDV = 'Hasob_BizEngine_Models_Vendor'

class VendorsPage {

    // ── Breadcrumb ─────────────────────────────────────────────────────────────
    get breadcrumbTitle()       { return $('.breadcrumb-title') }
    get breadcrumbSubtitle()    { return $('.text-danger.d-none.d-md-flex') }
    get backToDashboardLink()   { return $('a[href*="dashboard"]') }

    // ── Page header action ────────────────────────────────────────────────────
    get newVendorBtn()          { return $('#btn-new-mdl-vendor-modal') }

    // ── List / Card view ──────────────────────────────────────────────────────
    get searchInput()           { return $(`[id$="-${VENDOR_CDV}-txt-search"]`) }
    get searchBtn()             { return $(`[id$="-${VENDOR_CDV}-btn-search"]`) }
    get cardViewContainer()     { return $(`[id$="-${VENDOR_CDV}-div-card-view"]`) }
    get listSpinner()           { return $(`[id^="spinner-cdv_"][id$="-${VENDOR_CDV}"]`) }
    get pagination()            { return $(`[id$="-${VENDOR_CDV}-pagination"]`) }
    get paginationLimitBtn()    { return $(`[id^="btn-cdv_"][id$="-${VENDOR_CDV}-pagination"]`) }

    // ── Filter modal ──────────────────────────────────────────────────────────
    get filterBtn()             { return $(`[class*="-${VENDOR_CDV}-btn-filter"]`) }
    get filterModal()           { return $(`[id^="mdl-cdv_"][id$="-${VENDOR_CDV}-filter-modal"]`) }
    get stateFilterSelect()     { return $(`[id^="sel-filter-cdv_"][id$="-${VENDOR_CDV}-address_state"]`) }
    get dateFilterStart()       { return $(`[id^="rng-start-date-filter-cdv_"][id$="-${VENDOR_CDV}-Date_Onboarded"]`) }
    get dateFilterEnd()         { return $(`[id^="rng-end-date-filter-cdv_"][id$="-${VENDOR_CDV}-Date_Onboarded"]`) }
    get applyFilterBtn()        { return $(`[id^="btn-save-mdl-cdv_"][id$="-${VENDOR_CDV}-filter-modal"]`) }
    get resetFilterBtn()        { return $(`[id^="btn-reset-mdl-cdv_"][id$="-${VENDOR_CDV}-filter-modal"]`) }

    // Row-level action buttons — Vendor CDV renders edit and delete only (no view button)
    get firstEditBtn()          { return $('.btn-edit-mdl-vendor-modal') }
    get firstDeleteBtn()        { return $('.btn-delete-mdl-vendor-modal') }
    editBtnFor(id)              { return $(`.btn-edit-mdl-vendor-modal[data-val="${id}"]`) }
    deleteBtnFor(id)            { return $(`.btn-delete-mdl-vendor-modal[data-val="${id}"]`) }

    // ── Create / Edit / View modal ────────────────────────────────────────────
    get modal()                 { return $('#mdl-vendor-modal') }
    get modalTitle()            { return $('#lbl-vendor-modal-title') }
    get modalTitlePrefix()      { return $('#modal-title-prefix') }
    get modalErrorDiv()         { return $('#div-vendor-modal-error') }
    // spinner-vendors lives inside the Save button — shown during async save/load
    get modalSpinner()          { return $('#spinner-vendors') }
    get hiddenPrimaryId()       { return $('#txt-vendor-primary-id') }
    get saveModalBtn()          { return $('#btn-save-mdl-vendor-modal') }
    get closeModalBtn()         { return $('#mdl-vendor-modal button.btn-close') }

    // Edit-mode form fields (#div-edit-txt-vendor-primary-id)
    get nameInput()             { return $('#name') }
    get emailInput()            { return $('#email') }
    get rcNumberInput()         { return $('#rc_number') }
    get telephoneInput()        { return $('#telephone') }
    get firsTinInput()          { return $('#firs_vat_number') }
    get irrNumberInput()        { return $('#irr_number') }
    get websiteInput()          { return $('#website') }
    get addressStreetInput()    { return $('#address_street') }
    get addressTownInput()      { return $('#address_town') }
    get addressStateSelect()    { return $('#address_state') }
    get lgaCodeSelect()         { return $('#firs_lga_code') }
    get postalCodeInput()       { return $('#firs_postal_code') }

    // View-mode spans (#div-show-txt-vendor-primary-id)
    get viewEmail()             { return $('#spn_vendor_email') }
    get viewWebsite()           { return $('#spn_vendor_website') }
    get viewTelephone()         { return $('#spn_vendor_telephone') }
    get viewAddressStreet()     { return $('#spn_vendor_address_street') }
    get viewAddressTown()       { return $('#spn_vendor_address_town') }
    get viewAddressState()      { return $('#spn_vendor_address_state') }

    // ── Info panel ────────────────────────────────────────────────────────────
    get infoPanelCard()         { return $('.card.radius-5.border-top.border-primary') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE + '/be/vendors')
        await this.newVendorBtn.waitForDisplayed({ timeout: 15000 })
    }

    async waitForListLoaded() {
        await browser.waitUntil(
            async () => !(await this.listSpinner.isDisplayed()),
            { timeout: 15000, interval: 300 }
        )
        await this.cardViewContainer.waitForExist({ timeout: 15000 })
        // The CDV spinner stops before the card HTML is injected into the DOM;
        // a short pause lets the DOM update propagate before callers assert on cards.
        await browser.pause(600)
    }

    async openNewModal() {
        // Wait for any overlay (sweet-alert, modal backdrop) to clear before clicking
        await this.newVendorBtn.waitForClickable({ timeout: 10000 })
        await this.newVendorBtn.click()
        // Wait for Bootstrap .show class — fires AFTER the 300ms fade-in animation
        // completes, not when the element first appears. Without this, setValue()
        // starts typing mid-animation and characters are swallowed.
        await browser.waitUntil(
            async () => (await this.modal.getAttribute('class') || '').includes('show'),
            { timeout: 5000, interval: 100 }
        )
        await browser.waitUntil(
            async () => !(await this.modalSpinner.isDisplayed()),
            { timeout: 5000 }
        )
    }

    async closeModal() {
        await this.closeModalBtn.click()
        await this.modal.waitForDisplayed({ reverse: true, timeout: 5000 })
    }

    async createVendor({ name, email, rcNumber, telephone, firsTin, irrNumber,
                         website, addressStreet, addressTown, addressState, lgaCode, postalCode }) {
        await this.openNewModal()

        await this.nameInput.setValue(name)
        await this.emailInput.setValue(email)
        await this.rcNumberInput.setValue(rcNumber)
        await this.telephoneInput.setValue(telephone)
        await this.firsTinInput.setValue(firsTin)

        if (irrNumber) await this.irrNumberInput.setValue(irrNumber)
        if (website)   await this.websiteInput.setValue(website)
        if (addressStreet) await this.addressStreetInput.setValue(addressStreet)
        if (addressTown)   await this.addressTownInput.setValue(addressTown)
        if (addressState) {
            await this.addressStateSelect.selectByAttribute('value', addressState)
            // LGA list populates dynamically via .address_state change handler;
            // wait 1s (not 500ms) — the state AJAX briefly overlays the modal
            await browser.pause(1000)
        }
        if (lgaCode) {
            // Scroll the select into view before selecting to avoid click-intercepted
            await this.lgaCodeSelect.scrollIntoView()
            await this.lgaCodeSelect.waitForClickable({ timeout: 5000 })
            await this.lgaCodeSelect.selectByVisibleText(lgaCode)
        }
        if (postalCode) await this.postalCodeInput.setValue(postalCode)

        await this.saveModalBtn.click()
        // Vendor save shows a SweetAlert that must be confirmed
        await this.confirmSwal()
        // Vendor save refreshes the CDV in-place (no full page reload).
        // Do an explicit reload so the CDV is fully initialised before callers
        // try to interact with buttons or the search input.
        await browser.url(INSTANCE + '/be/vendors')
        await this.newVendorBtn.waitForDisplayed({ timeout: 20000 })
        await this.waitForListLoaded()
    }

    async getLgaOptionTexts() {
        return browser.execute((select) => {
            return Array.from(select.options).map(option => option.textContent.trim())
        }, await this.lgaCodeSelect)
    }

    async confirmSwal() {
        const confirmBtn = await $('.sweet-alert button.confirm')
        await confirmBtn.waitForDisplayed({ timeout: 5000 })
        await confirmBtn.click()
    }
}

export default new VendorsPage()
