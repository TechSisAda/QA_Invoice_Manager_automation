import { addFeature, addSeverity } from '../../helpers/allureHelper.js'
import LoginPage from '../../pageobjects/login.page.js'
import SettingsPage from '../../pageobjects/settings.page.js'
import { bentenSettings } from '../../helpers/testData.js'
 
// ─────────────────────────────────────────────────────────────────────────────
// E2E: New Instance Setup — FIRS Configuration & Business Profile
//
// Pre-condition: A fresh business instance has been created (Subscribe Now flow)
//               and the user has logged in for the first time. ALL settings
//               fields will be empty.
//
// Flow:         Login → Manage Settings → fill Business Profile fields
//               → fill FIRS credential fields → verify each field saved.
//
// This E2E must pass before regression/settings.spec.js is run, because the
// regression tests assert that the credentials are already present.
//
// Each save triggers a full page reload (location.reload(true)) so each
// field edit is a self-contained open-modal → fill → save → reload cycle.
// ─────────────────────────────────────────────────────────────────────────────

describe('E2E — New Instance Setup: Business Profile & FIRS Configuration', () => {

    before(async () => {
        await LoginPage.open()
        await LoginPage.login(process.env.TEST_EMAIL, process.env.TEST_PASS)
        await SettingsPage.open()
    })

    // ── Settings Tab — Business Profile ───────────────────────────────────────

    it('E2E-SET-001 | Settings page opens after login showing empty or pre-filled fields', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await expect(SettingsPage.settingsPane).toBeDisplayed()
        await expect(SettingsPage.businessNameInput).toBeDisplayed()
    })

    it('E2E-SET-002 | Fill and save Registered Business Name', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('businessName', bentenSettings.businessName)
        await SettingsPage.open()
        const val = await SettingsPage.businessNameInput.getValue()
        expect(val).toBe(bentenSettings.businessName)
    })

    it('E2E-SET-003 | Fill and save Invoice Code Prefix', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('invoicePrefix', bentenSettings.invoicePrefix)
        await SettingsPage.open()
        const val = await SettingsPage.invoicePrefixInput.getValue()
        expect(val).toBe(bentenSettings.invoicePrefix)
    })

    it('E2E-SET-004 | Fill and save Business Address', async () => {
        addFeature('Instance Setup'); addSeverity('critical')
        await SettingsPage.editSetting('address', bentenSettings.address)
        await SettingsPage.open()
        const val = await SettingsPage.addressInput.getValue()
        expect(val).toBe(bentenSettings.address)
    })

    it('E2E-SET-005 | Fill and save City/Town', async () => {
        addFeature('Instance Setup'); addSeverity('critical')
        await SettingsPage.editSetting('city', bentenSettings.city)
        await SettingsPage.open()
        const val = await SettingsPage.cityInput.getValue()
        expect(val).toBe(bentenSettings.city)
    })

    it('E2E-SET-006 | Fill and save Email Address', async () => {
        addFeature('Instance Setup'); addSeverity('critical')
        await SettingsPage.editSetting('email', bentenSettings.email)
        await SettingsPage.open()
        const val = await SettingsPage.emailInput.getValue()
        expect(val).toBe(bentenSettings.email)
    })

    it('E2E-SET-007 | Fill and save Phone Number', async () => {
        addFeature('Instance Setup'); addSeverity('critical')
        await SettingsPage.editSetting('phone', bentenSettings.phone)
        await SettingsPage.open()
        const val = await SettingsPage.phoneInput.getValue()
        expect(val).toBe(bentenSettings.phone)
    })

    // ── FIRS Tab — Credentials ────────────────────────────────────────────────

    it('E2E-SET-008 | Switch to FIRS tab — all credential fields are visible', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.clickFIRSTab()
        await expect(SettingsPage.firsBaseUrlInput).toBeDisplayed()
        await expect(SettingsPage.firsKeyInput).toBeDisplayed()
        await expect(SettingsPage.firsSecretKeyInput).toBeDisplayed()
        await expect(SettingsPage.firsBusinessIdInput).toBeDisplayed()
        await expect(SettingsPage.firsIrnCodeInput).toBeDisplayed()
        await expect(SettingsPage.firsPublicKeyInput).toBeDisplayed()
        await expect(SettingsPage.firsCertKeyInput).toBeDisplayed()
    })

    it('E2E-SET-009 | Fill and save FIRS Base URL', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsBaseUrl', bentenSettings.firsBaseUrl)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsBaseUrlInput.getValue()
        expect(val).toBe(bentenSettings.firsBaseUrl)
    })

    it('E2E-SET-010 | Fill and save FIRS Key', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsKey', bentenSettings.firsKey)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsKey)
    })

    it('E2E-SET-011 | Fill and save FIRS Secret Key', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsSecretKey', bentenSettings.firsSecretKey)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsSecretKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsSecretKey)
    })

    it('E2E-SET-012 | Fill and save FIRS Business ID', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsBusinessId', bentenSettings.firsBusinessId)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsBusinessIdInput.getValue()
        expect(val).toBe(bentenSettings.firsBusinessId)
    })

    it('E2E-SET-013 | Fill and save FIRS IRN Format Code', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsIrnCode', bentenSettings.firsIrnCode)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsIrnCodeInput.getValue()
        expect(val).toBe(bentenSettings.firsIrnCode)
    })

    it('E2E-SET-014 | Fill and save FIRS Public Key', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsPublicKey', bentenSettings.firsPublicKey)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsPublicKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsPublicKey)
    })

    it('E2E-SET-015 | Fill and save FIRS Certificate Key', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.editSetting('firsCertKey', bentenSettings.firsCertKey)
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()
        const val = await SettingsPage.firsCertKeyInput.getValue()
        expect(val).toBe(bentenSettings.firsCertKey)
    })

    // ── Final verification — all credentials in place ─────────────────────────

    it('E2E-SET-016 | All FIRS credentials are saved and instance is ready to sign invoices', async () => {
        addFeature('Instance Setup'); addSeverity('blocker')
        await SettingsPage.open()
        await SettingsPage.clickFIRSTab()

        expect(await SettingsPage.firsBaseUrlInput.getValue()).toBe(bentenSettings.firsBaseUrl)
        expect(await SettingsPage.firsKeyInput.getValue()).toBe(bentenSettings.firsKey)
        expect(await SettingsPage.firsSecretKeyInput.getValue()).toBe(bentenSettings.firsSecretKey)
        expect(await SettingsPage.firsBusinessIdInput.getValue()).toBe(bentenSettings.firsBusinessId)
        expect(await SettingsPage.firsIrnCodeInput.getValue()).toBe(bentenSettings.firsIrnCode)
        expect(await SettingsPage.firsPublicKeyInput.getValue()).toBe(bentenSettings.firsPublicKey)
        expect(await SettingsPage.firsCertKeyInput.getValue()).toBe(bentenSettings.firsCertKey)
    })
})
