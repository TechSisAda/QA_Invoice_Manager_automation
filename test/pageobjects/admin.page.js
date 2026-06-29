const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

class AdminPage {
    get successToast()    { return $('[data-testid="toast-success"]') }
    get userTable()       { return $('[data-testid="user-table"]') }
    get companySelector() { return $('[data-testid="company-selector"]') }

    async openBusinessProfile() {
        await browser.url(INSTANCE + '/invoice-manager/firs-settings')
    }

    async fillBusinessProfile({ companyName, tin, vat, logo }) {
        await $('[data-testid="field-company-name"]').setValue(companyName)
        await $('[data-testid="field-tin"]').setValue(tin)
        await $('[data-testid="field-vat"]').setValue(vat)
        if (logo) await $('[data-testid="logo-upload"]').addValue(logo)
    }

    async save() {
        await $('[data-testid="profile-save"]').click()
        await this.successToast.waitForDisplayed()
    }

    async openUserManagement() {
         await browser.url(INSTANCE + '/invoice-manager/manage-users')
    }

    async inviteUser(email, role) {
        await $('[data-testid="invite-user-btn"]').click()
        await $('[data-testid="invite-email"]').setValue(email)
        await $('[data-testid="invite-role"]').selectByVisibleText(role)
        await $('[data-testid="invite-confirm"]').click()
        await this.userTable.waitForDisplayed()
    }

    async addCompanyEntity({ name, tin }) {
        await browser.url(INSTANCE + '/invoice-manager/firs-settings')
        await $('[data-testid="add-company-btn"]').click()
        await $('[data-testid="new-company-name"]').setValue(name)
        await $('[data-testid="new-company-tin"]').setValue(tin)
        await $('[data-testid="new-company-save"]').click()
    }

    async addClient({ name, tin }) {
        await browser.url(INSTANCE + '/be/clients')
        await $('[data-testid="client-name"]').setValue(name)
        await $('[data-testid="client-tin"]').setValue(tin)
        await $('[data-testid="client-save"]').click()
        await this.successToast.waitForDisplayed()
    }

    async addProduct({ name, price, taxable }) {
        await browser.url(INSTANCE + '/be/inventoryItems')
        await $('[data-testid="product-name"]').setValue(name)
        await $('[data-testid="product-price"]').setValue(price)
        if (taxable) await $('[data-testid="product-taxable"]').click()
        await $('[data-testid="product-save"]').click()
        await this.successToast.waitForDisplayed()
    }
}

export default new AdminPage()
