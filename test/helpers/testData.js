const INSTANCE = process.env.INSTANCE_URL || 'https://benten.invoicemanager.ng'

export const urls = {
    // Main site (invoicemanager.ng)
    home:           '/',
    register:       '/plm/subscriptions',
    smeStarterForm: '/plm/subscriptions/67a91caf-a7d2-4530-97ef-b6bf8327f4bb',
    linkTIN:        'https://www.invoicemanager.ng/ivm/link-tin',
    complianceBase: process.env.COMPLIANCE_URL || 'https://compliance.invoicemanager.ng',

    // Business instance (benten.invoicemanager.ng)
    instanceBase:          INSTANCE,
    instanceLogin:         `${INSTANCE}/login`,
    instanceForgot:        `${INSTANCE}/password/reset`,
    instanceDashboard:     `${INSTANCE}/dashboard`,
    instanceNewInvoice:    `${INSTANCE}/invoice-manager/start-invoice-creation`,
    instancePOS:           `${INSTANCE}/invoice-manager/start-invoice-checkout`,
    instanceSalesInvoices: `${INSTANCE}/invoice-manager/sales`,
    instanceAllInvoices:   `${INSTANCE}/invoice-manager/invoices`,
    instanceProducts:      `${INSTANCE}/be/inventoryItems`,
    instanceClients:       `${INSTANCE}/be/clients`,
    instanceVendors:       `${INSTANCE}/be/vendors`,
    instanceUsers:         `${INSTANCE}/invoice-manager/manage-users`,
    instanceFiscalYears:   `${INSTANCE}/be/fiscalYears`,
    instanceFIRSSettings:  `${INSTANCE}/invoice-manager/firs-settings`,
    instanceInvoiceDesign: `${INSTANCE}/invoice-manager/manage-design`,
    instanceProfile:       `${INSTANCE}/fc/profile`,
}

export const bentenSettings = {
    businessName:   'Ben Ten Science Lab',
    state:          'Anambra',
    tin:            '100000001-0001',
    invoicePrefix:  'INV',
    address:        'Anambra Streets',
    city:           'Capital City',
    lga:            'Aguata',
    email:          'benten@mail.com',
    phone:          '008012345654',
    firsIrnCode:    'E3BC8088',
    firsBaseUrl:    'https://eivc-k6z6d.ondigitalocean.app',
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
