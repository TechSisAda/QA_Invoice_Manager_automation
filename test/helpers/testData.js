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
    // Business profile (Settings tab)
    businessName:   'Ben Ten Science Lab',
    state:          'Anambra',
    tin:            '100000001-0001',
    invoicePrefix:  'INV',
    address:        'Anambra Streets',
    city:           'Capital City',
    lga:            'Aguata',
    email:          'benten@mail.com',
    phone:          '08012345654',

    // FIRS configuration (FIRS tab) — test credentials for production server
    firsBaseUrl:    'https://eivc-k6z6d.ondigitalocean.app',
    firsKey:        'f1a1d3f5-9b26-4eba-a3f9-e469659ff7a4',
    firsSecretKey:  'oXjYCCALglF8EAXbcSzJB2S9th2yhFtmwCUxDhrACPqZd1jvXyoB5hhIJLGKM8iu4FFbgqnVzkMNDSqZxbm2ZF5fsJuOJEHxlrVz',
    firsBusinessId: '39a94704-8088-490f-b727-a428b01a0a9f',
    firsIrnCode:    'E3BC8088',
    firsPublicKey:  'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0KTUlJQklqQU5CZ2txaGtpRzl3MEJBUUVGQUFPQ0FROEFNSUlCQ2dLQ0FRRUFyU0xpdDRtb1RMbFdjd1A4eEp6RQp3ZTdkRHExdC9kMi9zcXdQTlNVandablFPbklabVh4TXY4QUQxemMxdUErZ3VCc2tpUGdoSXd6ekxWYXJoNk1KCndEdVUxSC95V2FPZE1PTnZOQy9OWERybXB5cE5WUDZyQnV3LzVjSERMdEtoZlJ0YkdFa1JSVVF4MVAxUUJ6REsKVVRpaTRJOXJld29zcVQ4V1dBOE8zRVd5ZHJ5TEg1K3JpVmRUNVBPeU1jcU95YUR2bGRqWG9ZdnBSTHlkcmtDQQpkUWpMdkw0bG00TVNxS05WdGVJR0Y4ZWk4M3Juck5wR3hKTVVGYVMwekt5TzBJZlY0alBCK3ZXN3I1TXdzTjRvCkRnWVR2ME85Q050N3JoNlEvYi9XR3Ewakl3WHJ3c3JIQXE4TXNyUVlGV0JIOHpmejMwOHRWMTlRM1hPTnEyWEMKMHdJREFRQUIKLS0tLS1FTkQgUFVCTElDIEtFWS0tLS0tCg==',
    firsCertKey:    'am9vOXAwYTlGdVExWFlBQmxNeGs1RGZyRmZYZjNYMDFpcG92VTFqZCtMRT0=',
}

export const bentenFiscalYear = {
    name:       'FY 2025',
    status:     'active',
    isCurrent:  '1',
    startDate:  '2025-01-01',
    endDate:    '2025-12-31',
}

export const bentenProduct = {
    title:        'Cement Bag',
    code:         'PROD-001',
    description:  'High quality cement bag, 50kg',
    unitPrice:    '5000',
    quantity:     '100',
    quantityUom:  'bags',
    taxApplicable: false,
    itemType:     'product_item',
}

export const bentenService = {
    title:        'Consulting Service',
    code:         'SVC-001',
    description:  'Professional consulting service',
    unitPrice:    '50000',
    quantity:     '1',
    quantityUom:  'hours',
    taxApplicable: true,
    itemType:     'service_item',
}

export const regProduct = {
    title:        'REG Test Widget',
    code:         'REG-001',
    description:  'Regression-only item — created and deleted by the suite',
    unitPrice:    '999',
    quantity:     '10',
    quantityUom:  'nos',
    taxApplicable: false,
    itemType:     'product_item',
}

export const regClient = {
    name:          'REG Test Corp',
    shortName:     'RegTest',
    email:         'reg-test@regtest.ng',
    firsTaxId:     '99999999-0001',
    cacRcNumber:   'RC-999999',
}

export const bentenClient = {
    name:          'Acme Nigeria Ltd',
    shortName:     'Acme',
    email:         'acme@acme.ng',
    website:       'https://acme.ng',
    firsTaxId:     '12345678-0001',
    cacRcNumber:   'RC-123456',
    addressStreet: '14 Industrial Layout',
    telephone:     '08012345678',
    addressTown:   'Onitsha',
    addressState:  'NG-AN',
    lgaCode:       'Onitsha North',
    postalCode:    '435101',
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
