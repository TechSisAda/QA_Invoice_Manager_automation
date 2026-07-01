const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'
 
// UUIDs for each setting's pencil-edit button (data-val attribute)
const SETTING_IDS = {
    businessName:    '5740b5e6-df3e-4d38-a406-b4c0ba15967a',
    state:           '6f11c45c-9c12-48ac-b48d-2598a7d46d55',
    tin:             '576f78e1-f468-432e-bc34-e6a645a8ba60',
    invoicePrefix:   '2a4cd11f-805a-42d5-82bd-1d6829ed80f4',
    address:         '9dbdd290-8b1a-4e85-8176-d306ccecac26',
    city:            '04328b3a-3c82-4245-bc34-025587977d43',
    lga:             '6cfa9d04-609b-4fe8-a5bd-2cdca1a0c426',
    email:           '9e1aacf3-744a-4a22-8f50-69173b50ea7e',
    phone:           'e0f9d182-b447-419a-be4d-d69d622df633',
    firsBaseUrl:     'c7be9d53-8c23-4f74-8721-95cb2ca2a9e0',
    firsKey:         '3e4cf33f-9c61-4d7d-8fd0-c026e556fafc',
    firsSecretKey:   '0f694ac5-04eb-4ae4-a569-38bb97eaa566',
    firsBusinessId:  'a3100b38-465f-4d67-9f3f-1ee4765a9891',
    firsIrnCode:     '1c40c6f3-5a4b-40ab-9345-15dd836a5cba',
    firsPublicKey:   '366d3e3b-71d1-4dc7-aaa5-b061718d1cca',
    firsCertKey:     '06086767-5d35-4766-8e21-7df2c2a14668',
}

class SettingsPage {

    // ── Breadcrumb ─────────────────────────────────────────────────────────────
    get breadcrumbTitle()       { return $('.breadcrumb-title') }
    get breadcrumbSubtitle()    { return $('.text-danger.d-none.d-md-flex') }
    get backToDashboardLink()   { return $('a[href*="dashboard"]') }

    // ── Tab Navigation ─────────────────────────────────────────────────────────
    get settingsTab()           { return $('a[href="#basic_profile"]') }
    get firsTab()               { return $('a[href="#firs_profile"]') }

    // ── Settings Tab — read-only field display inputs ──────────────────────────
    // Each is the input.form-control sibling of the pencil edit button.
    // Pattern: a[data-val] → button.btn-outline-secondary → div.input-group
    //          input.form-control lives in the same div.input-group

    get settingsPane()          { return $('#basic_profile') }
    get firsPane()              { return $('#firs_profile') }

    get businessNameInput()     { return this._fieldInput(SETTING_IDS.businessName) }
    get stateInput()            { return this._fieldInput(SETTING_IDS.state) }
    get tinInput()              { return this._fieldInput(SETTING_IDS.tin) }
    get invoicePrefixInput()    { return this._fieldInput(SETTING_IDS.invoicePrefix) }
    get addressInput()          { return this._fieldInput(SETTING_IDS.address) }
    get cityInput()             { return this._fieldInput(SETTING_IDS.city) }
    get lgaInput()              { return this._fieldInput(SETTING_IDS.lga) }
    get emailInput()            { return this._fieldInput(SETTING_IDS.email) }
    get phoneInput()            { return this._fieldInput(SETTING_IDS.phone) }

    // ── FIRS Tab — read-only field display inputs ──────────────────────────────
    get firsBaseUrlInput()      { return this._fieldInput(SETTING_IDS.firsBaseUrl) }
    get firsKeyInput()          { return this._fieldInput(SETTING_IDS.firsKey) }
    get firsSecretKeyInput()    { return this._fieldInput(SETTING_IDS.firsSecretKey) }
    get firsBusinessIdInput()   { return this._fieldInput(SETTING_IDS.firsBusinessId) }
    get firsIrnCodeInput()      { return this._fieldInput(SETTING_IDS.firsIrnCode) }
    get firsPublicKeyInput()    { return this._fieldInput(SETTING_IDS.firsPublicKey) }
    get firsCertKeyInput()      { return this._fieldInput(SETTING_IDS.firsCertKey) }

    // ── Edit pencil buttons ────────────────────────────────────────────────────
    editBtn(settingKey)  { return $(`.btn-edit-mdl-setting-modal[data-val="${SETTING_IDS[settingKey]}"]`) }

    // ── Edit Modal ─────────────────────────────────────────────────────────────
    get editModal()             { return $('#mdl-setting-modal') }
    get editModalTitle()        { return $('#mdl-setting-modal .modal-title') }
    get editModalErrorDiv()     { return $('#div-setting-modal-error') }
    get editModalKeyLabel()     { return $('#key') }
    get editModalTextInput()    { return $('#value-text') }
    get editModalTextarea()     { return $('#value-textarea') }
    get editModalCheckbox()     { return $('#value-cbx') }
    get editModalFileInput()    { return $('#value-file') }
    get editModalSelect()       { return $('#cbx_select') }
    get editModalColorInput()   { return $('#sel_color_palette') }
    get editModalSaveBtn()      { return $('#btn-save-mdl-setting-modal') }
    get editModalCloseBtn()     { return $('#mdl-setting-modal button.btn-close') }

    // ── Info Panel ─────────────────────────────────────────────────────────────
    get infoPanelCard()         { return $('.card.radius-5.border-top.border-primary') }

    // ── Internal helper ───────────────────────────────────────────────────────
    _fieldInput(uuid) {
        // Navigate from edit anchor up to div.input-group, then select input.form-control
        // a[data-val] → (..) button.btn-outline-secondary → (../.. = div.input-group) input.form-control
        return $(`.btn-edit-mdl-setting-modal[data-val="${uuid}"]`).$('../../input.form-control')
    }

    // ── Actions ───────────────────────────────────────────────────────────────

    async open() {
        await browser.url(INSTANCE + '/invoice-manager/firs-settings')
        await this.settingsPane.waitForDisplayed({ timeout: 15000 })
    }

    async clickSettingsTab() {
        await this.settingsTab.click()
        await this.settingsPane.waitForDisplayed()
    }

    async clickFIRSTab() {
        await this.firsTab.click()
        await this.firsPane.waitForDisplayed()
    }

    async openEditModal(settingKey) {
        await this.editBtn(settingKey).click()
        await this.editModal.waitForDisplayed({ timeout: 5000 })
    }

    async closeEditModal() {
        await this.editModalCloseBtn.click()
        await this.editModal.waitForDisplayed({ reverse: true, timeout: 5000 })
    }

    async getFieldValue(settingKey) {
        return this._fieldInput(SETTING_IDS[settingKey]).getValue()
    }

    async editSetting(settingKey, newValue) {
        await this.openEditModal(settingKey)
        await browser.waitUntil(
            async () => (await this.editModalTextInput.isDisplayed()) || (await this.editModalTextarea.isDisplayed()),
            { timeout: 5000 }
        )
        if (await this.editModalTextInput.isDisplayed()) {
            await this.editModalTextInput.clearValue()
            await this.editModalTextInput.setValue(newValue)
        } else {
            await this.editModalTextarea.clearValue()
            await this.editModalTextarea.setValue(newValue)
        }
        await this.editModalSaveBtn.click()
        await this.settingsPane.waitForDisplayed({ timeout: 15000 })
    }
}

export default new SettingsPage()
