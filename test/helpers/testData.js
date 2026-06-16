const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

export const urls = {
    // Main site (invoicemanager.ng)
    home:           '/',
    register:       '/plm/subscriptions',
    smeStarterForm: '/plm/subscriptions/67a91caf-a7d2-4530-97ef-b6bf8327f4bb',
    linkTIN:        'https://www.invoicemanager.ng/ivm/link-tin',
    complianceBase: process.env.COMPLIANCE_URL || 'https://compliance.invoicemanager.ng',

    // Business instance (benten.invoicemanager.ng)
    instanceBase:   INSTANCE,
    instanceLogin:  `${INSTANCE}/login`,
    instanceForgot: `${INSTANCE}/password/reset`,
}

export const testData = {
    validTIN:       '12345678-0001',
    clientTIN:      '87654321-0001',
    draftInvoiceId: 'draft-001',
    draftItem:      'Cement Bag',

    validInvoice: {
        client:    'Test Client Ltd',
        type:      'Commercial Invoice',
        product:   'Consulting',
        qty:       1,
        unitPrice: 100000,
        taxable:   true
    },

    missingTINInvoice: {
        client:    null,
        type:      'Commercial Invoice',
        product:   'No TIN Service',
        qty:       1,
        unitPrice: 50000,
        taxable:   false
    },

    testUsers: {
        admin:  { email: process.env.TEST_EMAIL, password: process.env.TEST_PASS },
        viewer: { email: 'viewer@testcorp.com',  password: process.env.TEST_PASS }
    }
}
