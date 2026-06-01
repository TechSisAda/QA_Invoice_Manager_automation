export const testData = {
    validTIN:      '12345678-0001',
    clientTIN:     '87654321-0001',
    draftInvoiceId: 'draft-001',
    draftItem:      'Cement Bag',

    validInvoice: {
        client:     'Test Client Ltd',
        type:       'Commercial Invoice',
        product:    'Consulting',
        qty:        1,
        unitPrice:  100000,
        taxable:    true
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
