class TINRegistrationPage {
    get businessInfoTab()        { return $('[data-testid="tab-business-info"]') }
    get finalPreviewTab()        { return $('[data-testid="tab-final-preview"]') }
    get bnField()                { return $('[data-testid="field-bn"]') }
    get rcField()                { return $('[data-testid="field-rc"]') }
    get firstNameField()         { return $('[data-testid="field-firstname"]') }
    get lastNameField()          { return $('[data-testid="field-lastname"]') }
    get ninField()               { return $('[data-testid="field-nin"]') }
    get ninError()               { return $('[data-testid="error-nin"]') }
    get stateDropdown()          { return $('[data-testid="select-state"]') }
    get cityDropdown()           { return $('[data-testid="select-city"]') }
    get lgaDropdown()            { return $('[data-testid="select-lga"]') }
    get businessTypeSelect()     { return $('[data-testid="business-type"]') }
    get saveAndContinueBtn()     { return $('[data-testid="save-continue"]') }
    get enablementSuccessBadge() { return $('[data-testid="enablement-success"]') }
    get consentCheckbox()        { return $('[data-testid="consent-checkbox"]') }
    get consentError()           { return $('[data-testid="error-consent"]') }
    get sectorDropdown()         { return $('[data-testid="select-sector"]') }
    get enablementSubmitBtn()    { return $('[data-testid="enablement-submit"]') }

    async open() {
        await browser.url('/register/tin')
        await this.businessInfoTab.waitForDisplayed()
    }

    async openEnablement() {
        await browser.url('/settings/firs-enablement')
    }

    async selectBusinessType(type) {
        await this.businessTypeSelect.selectByVisibleText(type)
    }

    async selectState(state) {
        await this.stateDropdown.selectByVisibleText(state)
        await browser.pause(500) // wait for city to populate
    }

    async selectCity(city) {
        await this.cityDropdown.selectByVisibleText(city)
        await browser.pause(500) // wait for LGA to populate
    }

    async fillPartialForm({ firstName, lastName }) {
        await this.firstNameField.setValue(firstName)
        await this.lastNameField.setValue(lastName)
    }

    async saveAndContinue() {
        await this.saveAndContinueBtn.click()
    }

    async submitWithoutNIN() {
        await $('[data-testid="tin-next"]').click()
    }

    async submitEnablementWithoutConsent() {
        await this.enablementSubmitBtn.click()
    }

    async getSectorOptions() {
        const options = await this.sectorDropdown.$$('option')
        return Promise.all(options.map(o => o.getText()))
    }

    async enableTIN({ tin, sector }) {
        await this.openEnablement()
        await $('[data-testid="field-firs-tin"]').setValue(tin)
        await this.sectorDropdown.selectByVisibleText(sector)
        await this.consentCheckbox.click()
        await this.enablementSubmitBtn.click()
        await this.enablementSuccessBadge.waitForDisplayed({ timeout: 15000 })
    }
}

export default new TINRegistrationPage()
