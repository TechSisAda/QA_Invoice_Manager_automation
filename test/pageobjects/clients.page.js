const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

// Card-view component prefix used in all dynamic element IDs
const CDV = 'cdv_6a33ddebae090-Hasob_BizEngine_Models_Client'

class ClientsPage {

    // ── Breadcrumb ─────────────────────────────────────────────────────────────
    get breadcrumbTitle()       { return $('.breadcrumb-title') }
    get breadcrumbSubtitle()    { return $('.text-danger.d-none.d-md-flex') }
    get backToDashboardLink()   { return $('a[href*="dashboard"]') }

    // ── Page header action ────────────────────────────────────────────────────
    get newClientBtn()          { return $('#btn-new-mdl-client-modal') }

    // ── List / Card view ──────────────────────────────────────────────────────
    get searchInput()           { return $(`#${CDV}-txt-search`) }
    get searchBtn()             { return $(`#${CDV}-btn-search`) }
    get filterAllBtn()          { return $(`.${CDV}-grp[data-val="All"]`) }
    get cardViewContainer()     { return $(`#${CDV}-div-card-view`) }
    get listSpinner()           { return $(`#spinner-${CDV}`) }
    get pagination()            { return $(`#${CDV}-pagination`) }
    get paginationLimitBtn()    { return $(`#btn-${CDV}-pagination`) }

    // ── Filter modal ──────────────────────────────────────────────────────────
    get filterBtn()             { return $(`.${CDV}-btn-filter`) }
    get filterModal()           { return $(`#mdl-${CDV}-filter-modal`) }
    get stateFilterSelect()     { return $(`#sel-filter-${CDV}-address_state`) }
    get applyFilterBtn()        { return $(`#btn-save-mdl-${CDV}-filter-modal`) }
    get resetFilterBtn()        { return $(`#btn-reset-mdl-${CDV}-filter-modal`) }

    // Row-level action buttons (rendered inside the dynamically loaded card HTML)
    get firstViewBtn()          { return $('.btn-show-mdl-client-modal') }
    get firstEditBtn()          { return $('.btn-edit-mdl-client-modal') }
    get firstDeleteBtn()        { return $('.btn-delete-mdl-client-modal') }
    viewBtnFor(id)              { return $(`.btn-show-mdl-client-modal[data-val="${id}"]`) }
    editBtnFor(id)              { return $(`.btn-edit-mdl-client-modal[data-val="${id}"]`) }
    deleteBtnFor(id)            { return $(`.btn-delete-mdl-client-modal[data-val="${id}"]`) }

    // ── Create / Edit / View modal ────────────────────────────────────────────
    get modal()                 { return $('#mdl-client-modal') }
    get modalTitle()            { return $('#lbl-client-modal-title') }
    get modalErrorDiv()         { return $('#div-client-modal-error') }
    get modalSpinner()          { return $('#spinner-clients') }
    get hiddenPrimaryId()       { return $('#txt-client-primary-id') }
    get saveModalBtn()          { return $('#btn-save-mdl-client-modal') }
    get closeModalBtn()         { return $('#mdl-client-modal button.btn-close') }

    // Edit-mode form fields (#div-edit-txt-client-primary-id)
    get nameInput()             { return $('#client_name') }
    get shortNameInput()        { return $('#short_name') }
    get emailInput()            { return $('#client_email') }
    get websiteInput()          { return $('#website') }
    get firsTaxIdInput()        { return $('#firs_tax_id') }
    get cacRcNumberInput()      { return $('#cac_rc_number') }
    get addressStreetInput()    { return $('#address_street') }
    get telephoneInput()        { return $('#telephone') }
    get addressTownInput()      { return $('#address_town') }
    get addressStateSelect()    { return $('#address_state') }
    get lgaCodeSelect()         { return $('#firs_lga_code') }
    get postalCodeInput()       { return $('#firs_postal_code') }

    // View-mode spans (#div-show-txt-client-primary-id)
    get viewEmail()             { return $('#spn_client_email') }
    get viewWebsite()           { return $('#spn_client_website') }
    get viewTelephone()         { return $('#spn_client_telephone') }
    get viewAddressStreet()     { return $('#spn_client_address_street') }
    get viewAddressTown()       { return $('#spn_client_address_town') }
    get viewAddressState()      { return $('#spn_client_address_state') }

    // ── Info panel ────────────────────────────────────────────────────────────
    get infoPanelCard()         { return $('.card.radius-5.border-top.border-primary') }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE + '/be/clients')
        await this.newClientBtn.waitForDisplayed({ timeout: 15000 })
    }

    async waitForListLoaded() {
        await browser.waitUntil(
            async () => !(await this.listSpinner.isDisplayed()),
            { timeout: 15000, interval: 300 }
        )
    }

    async openNewModal() {
        await this.newClientBtn.click()
        await this.modal.waitForDisplayed({ timeout: 5000 })
        await browser.waitUntil(
            async () => !(await this.modalSpinner.isDisplayed()),
            { timeout: 5000 }
        )
    }

    async closeModal() {
        await this.closeModalBtn.click()
        await this.modal.waitForDisplayed({ reverse: true, timeout: 5000 })
    }

    async createClient({ name, shortName, email, website, firsTaxId, cacRcNumber,
                         addressStreet, telephone, addressTown, addressState, lgaCode, postalCode }) {
        await this.openNewModal()

        await this.nameInput.setValue(name)
        await this.shortNameInput.setValue(shortName)
        await this.emailInput.setValue(email)
        if (website) await this.websiteInput.setValue(website)
        await this.firsTaxIdInput.setValue(firsTaxId)
        await this.cacRcNumberInput.setValue(cacRcNumber)
        if (addressStreet) await this.addressStreetInput.setValue(addressStreet)
        if (telephone)     await this.telephoneInput.setValue(telephone)
        if (addressTown)   await this.addressTownInput.setValue(addressTown)
        if (addressState) {
            await this.addressStateSelect.selectByAttribute('value', addressState)
            // LGA list populates dynamically after state change
            await browser.pause(500)
        }
        if (lgaCode) {
            await this.lgaCodeSelect.selectByVisibleText(lgaCode)
        }
        if (postalCode) await this.postalCodeInput.setValue(postalCode)

        await this.saveModalBtn.click()
        // Save triggers a swal dialog then reloads on success
        await this.newClientBtn.waitForDisplayed({ timeout: 20000 })
        await this.waitForListLoaded()
    }

    async confirmSwal() {
        const confirmBtn = await $('.sweet-alert button.confirm')
        await confirmBtn.waitForDisplayed({ timeout: 5000 })
        await confirmBtn.click()
    }

    async deleteFirstClient() {
        await this.firstDeleteBtn.click()
        await this.confirmSwal()
        // Second swal ("Deleted successfully") — confirm it too then page reloads
        await this.confirmSwal()
        await this.newClientBtn.waitForDisplayed({ timeout: 20000 })
        await this.waitForListLoaded()
    }
}

export default new ClientsPage()
