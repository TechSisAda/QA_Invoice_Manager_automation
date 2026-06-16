export const urls = {
    home:               '/',
    register:           '/plm/subscriptions',
    linkTIN:            `${process.env.BASE_URL?.replace('invoicemanager', 'www.invoicemanager')}/ivm/link-tin`,
    tinRegistration:    `${process.env.COMPLIANCE_URL || 'https://compliance.invoicemanager.ng'}/apply/application/fda7054a-924f-4967-84ac-6a79b1b6b20f`,
    complianceBase:     process.env.COMPLIANCE_URL || 'https://compliance.invoicemanager.ng',
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
