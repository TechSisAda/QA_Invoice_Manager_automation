import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import DashboardPage from '../../pageobjects/dashboard.page.js'
import SettingsPage from '../../pageobjects/settings.page.js'
import { bentenSettings } from '../../helpers/testData.js'

// ─────────────────────────────────────────────────────────────────────────────
// REGRESSION: Manage Settings
//
// Pre-condition: The instance has already been configured — all business profile
// and FIRS credential fields are filled. For a brand-new instance with empty
// fields, run test/specs/e2e/instance-setup.e2e.js FIRST to populate them,
// then run this suite to verify they are correctly persisted.
// ─────────────────────────────────────────────────────────────────────────────

describe('REGRESSION — Manage Settings (FIRS Configuration & Business Profile)', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await SettingsPage.open()
    })

    // ── Page Structure ─────────────────────────────────────────────────────────

    it('REG-SET-001 | Settings page loads with correct title', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(browser).toHaveTitle(/InvoiceManager/i)
        await expect(browser).toHaveTitle(/Settings/i)
    })

    it('REG-SET-002 | Breadcrumb shows "Manage" title', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.breadcrumbTitle).toHaveText(/Manage/i)
    })

    it('REG-SET-003 | Breadcrumb subtitle shows "Settings"', async () => {
        addFeature('Settings'); addSeverity('normal')
        await expect(SettingsPage.breadcrumbSubtitle).toHaveText(/Settings/i)
    })

    it('REG-SET-004 | Back to Dashboard link is present', async () => {
        addFeature('Settings'); addSeverity('normal')
        await expect(SettingsPage.backToDashboardLink).toBeDisplayed()
        const href = await SettingsPage.backToDashboardLink.getAttribute('href')
        expect(href).toContain('dashboard')
    })

    // ── Tab Navigation ─────────────────────────────────────────────────────────

    it('REG-SET-005 | "Settings" tab is visible and active by default', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.settingsTab).toBeDisplayed()
        const classes = await SettingsPage.settingsTab.getAttribute('class')
        expect(classes).toContain('active')
    })

    it('REG-SET-006 | "FIRS" tab is visible', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.firsTab).toBeDisplayed()
    })

    it('REG-SET-007 | Clicking FIRS tab activates the FIRS pane', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.clickFIRSTab()
        await expect(SettingsPage.firsPane).toBeDisplayed()
    })

    it('REG-SET-008 | Clicking Settings tab returns to the Settings pane', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.clickSettingsTab()
        await expect(SettingsPage.settingsPane).toBeDisplayed()
    })

    // ── Settings Tab — Business Profile Fields ─────────────────────────────────

    it('REG-SET-009 | Registered Business Name field is present and populated', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.businessNameInput).toBeDisplayed()
        const val = await SettingsPage.businessNameInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-010 | Business Name field is read-only', async () => {
        addFeature('Settings'); addSeverity('critical')
        const readOnly = await SettingsPage.businessNameInput.getAttribute('readonly')
        expect(readOnly).not.toBeNull()
    })

    it('REG-SET-011 | Business Name shows "Ben Ten Science Lab"', async () => {
        addFeature('Settings'); addSeverity('normal')
        const val = await SettingsPage.businessNameInput.getValue()
        expect(val).toContain('Ben Ten Science Lab')
    })

    it('REG-SET-012 | State field is present and populated', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.stateInput).toBeDisplayed()
        const val = await SettingsPage.stateInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-013 | FIRS TIN field is present and populated', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.tinInput).toBeDisplayed()
        const val = await SettingsPage.tinInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-014 | TIN is read-only (cannot be directly typed into)', async () => {
        addFeature('Settings'); addSeverity('critical')
        const readOnly = await SettingsPage.tinInput.getAttribute('readonly')
        expect(readOnly).not.toBeNull()
    })

    it('REG-SET-015 | Invoice Code Prefix field is present and shows "INV"', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.invoicePrefixInput).toBeDisplayed()
        const val = await SettingsPage.invoicePrefixInput.getValue()
        expect(val).toBe('INV')
    })

    it('REG-SET-016 | Business Address field is present and populated', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.addressInput).toBeDisplayed()
        const val = await SettingsPage.addressInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-017 | City/Town field is present and populated', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.cityInput).toBeDisplayed()
        const val = await SettingsPage.cityInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-018 | Local Govt Area field is present and populated', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.lgaInput).toBeDisplayed()
        const val = await SettingsPage.lgaInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-019 | Email Address field shows business email', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.emailInput).toBeDisplayed()
        const val = await SettingsPage.emailInput.getValue()
        expect(val).toContain('@')
    })

    it('REG-SET-020 | Phone Number field is present and populated', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.phoneInput).toBeDisplayed()
        const val = await SettingsPage.phoneInput.getValue()
        expect(val.trim().length).toBeGreaterThan(0)
    })

    // ── Edit Pencil Buttons ────────────────────────────────────────────────────

    it('REG-SET-021 | Every settings field has a pencil edit button', async () => {
        addFeature('Settings'); addSeverity('critical')
        for (const key of ['businessName', 'state', 'tin', 'invoicePrefix', 'address', 'city', 'lga', 'email', 'phone']) {
            await expect(SettingsPage.editBtn(key)).toBeExisting()
        }
    })

    // ── Edit Modal — Business Name ─────────────────────────────────────────────

    it('REG-SET-022 | Clicking pencil button opens the Setting edit modal', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.openEditModal('businessName')
        await expect(SettingsPage.editModal).toBeDisplayed()
    })

    it('REG-SET-023 | Edit modal title reads "Setting"', async () => {
        addFeature('Settings'); addSeverity('normal')
        await expect(SettingsPage.editModalTitle).toHaveText(/Setting/i)
    })

    it('REG-SET-024 | Edit modal shows the setting key label', async () => {
        addFeature('Settings'); addSeverity('normal')
        await expect(SettingsPage.editModalKeyLabel).toBeDisplayed()
        const label = await SettingsPage.editModalKeyLabel.getText()
        expect(label.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-025 | Edit modal text input is populated with the current value', async () => {
        addFeature('Settings'); addSeverity('critical')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal.trim().length).toBeGreaterThan(0)
    })

    it('REG-SET-026 | Edit modal Save button is present and enabled', async () => {
        addFeature('Settings'); addSeverity('critical')
        await expect(SettingsPage.editModalSaveBtn).toBeDisplayed()
        await expect(SettingsPage.editModalSaveBtn).not.toBeDisabled()
    })

    it('REG-SET-027 | Closing edit modal without saving dismisses the modal', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.closeEditModal()
        await expect(SettingsPage.editModal).not.toBeDisplayed()
    })

    // ── Edit Modal — Invoice Prefix ────────────────────────────────────────────

    it('REG-SET-028 | Invoice Prefix edit modal opens and shows current prefix value', async () => {
        addFeature('Settings'); addSeverity('normal')
        await SettingsPage.openEditModal('invoicePrefix')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal).toBe('INV')
        await SettingsPage.closeEditModal()
    })

    // ── Edit Modal — TIN ───────────────────────────────────────────────────────

    it('REG-SET-029 | TIN edit modal opens and shows current TIN value', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.openEditModal('tin')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal.trim().length).toBeGreaterThan(0)
        await SettingsPage.closeEditModal()
    })

    // ── FIRS Tab ───────────────────────────────────────────────────────────────

    it('REG-SET-030 | FIRS tab pane displays after clicking FIRS tab', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await SettingsPage.clickFIRSTab()
        await expect(SettingsPage.firsPane).toBeDisplayed()
    })

    it('REG-SET-031 | FIRS Base URL field shows the correct FIRS API endpoint', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsBaseUrlInput).toBeDisplayed()
        const val = await SettingsPage.firsBaseUrlInput.getValue()
        expect(val).toBe(bentenSettings.firsBaseUrl)
    })

    it('REG-SET-032 | FIRS Key field is filled with the correct test credential', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsKeyInput).toBeDisplayed()
        const val = await SettingsPage.firsKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsKey)
    })

    it('REG-SET-033 | FIRS Secret Key field is filled with the correct test credential', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsSecretKeyInput).toBeDisplayed()
        const val = await SettingsPage.firsSecretKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsSecretKey)
    })

    it('REG-SET-034 | FIRS Business ID field is filled with the correct test credential', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsBusinessIdInput).toBeDisplayed()
        const val = await SettingsPage.firsBusinessIdInput.getValue()
        expect(val).toBe(bentenSettings.firsBusinessId)
    })

    it('REG-SET-035 | FIRS IRN Format Code field shows the correct IRN code', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsIrnCodeInput).toBeDisplayed()
        const val = await SettingsPage.firsIrnCodeInput.getValue()
        expect(val).toBe(bentenSettings.firsIrnCode)
    })

    it('REG-SET-036 | FIRS Public Key field is filled with the correct base64-encoded key', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsPublicKeyInput).toBeDisplayed()
        const val = await SettingsPage.firsPublicKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsPublicKey)
    })

    it('REG-SET-037 | FIRS Certificate Key field is filled with the correct test credential', async () => {
        addFeature('Settings'); addSeverity('blocker')
        await expect(SettingsPage.firsCertKeyInput).toBeDisplayed()
        const val = await SettingsPage.firsCertKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsCertKey)
    })

    it('REG-SET-038 | All FIRS fields have pencil edit buttons', async () => {
        addFeature('Settings'); addSeverity('critical')
        for (const key of ['firsBaseUrl', 'firsKey', 'firsSecretKey', 'firsBusinessId', 'firsIrnCode', 'firsPublicKey', 'firsCertKey']) {
            await expect(SettingsPage.editBtn(key)).toBeExisting()
        }
    })

    it('REG-SET-039 | FIRS Base URL edit modal pre-populates with the stored Base URL', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.openEditModal('firsBaseUrl')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal).toBe(bentenSettings.firsBaseUrl)
        await SettingsPage.closeEditModal()
    })

    it('REG-SET-040 | FIRS IRN Code edit modal pre-populates with the stored IRN code', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.openEditModal('firsIrnCode')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal).toBe(bentenSettings.firsIrnCode)
        await SettingsPage.closeEditModal()
    })

    it('REG-SET-041 | FIRS Key edit modal pre-populates with the stored FIRS Key', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.openEditModal('firsKey')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal).toBe(bentenSettings.firsKey)
        await SettingsPage.closeEditModal()
    })

    it('REG-SET-042 | FIRS Business ID edit modal pre-populates with the stored Business ID', async () => {
        addFeature('Settings'); addSeverity('critical')
        await SettingsPage.openEditModal('firsBusinessId')
        await browser.waitUntil(
            async () => await SettingsPage.editModalTextInput.isDisplayed(),
            { timeout: 5000 }
        )
        const modalVal = await SettingsPage.editModalTextInput.getValue()
        expect(modalVal).toBe(bentenSettings.firsBusinessId)
        await SettingsPage.closeEditModal()
    })
})
