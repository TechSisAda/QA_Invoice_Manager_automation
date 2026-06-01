class POSPage {
    get catalogGrid()     { return $('.product-catalog-grid') }
    get searchBar()       { return $('[data-testid="pos-search"]') }
    get basketArea()      { return $('[data-testid="invoice-items"]') }
    get subtotalDisplay() { return $('[data-testid="pos-subtotal"]') }
    get grandTotalDisplay(){ return $('[data-testid="pos-grand-total"]') }
    get checkoutBtn()     { return $('[data-testid="pos-next"]') }
    get loadInvoiceSelect(){ return $('[data-testid="load-local-invoice"]') }

    async open() {
        await browser.url('/pos')
        await this.catalogGrid.waitForDisplayed()
    }

    async getProductTile(index) {
        const tiles = await $$('[data-testid="product-tile"]')
        const tile = tiles[index]
        return {
            sku:   tile.$('[data-testid="tile-sku"]'),
            price: tile.$('[data-testid="tile-price"]'),
            label: tile.$('[data-testid="tile-label"]')
        }
    }

    async getVisibleTiles() {
        return $$('[data-testid="product-tile"]')
    }

    async search(query) {
        await this.searchBar.setValue(query)
        await browser.pause(400)
    }

    async addToBasket(productName) {
        const tile = await $(`[data-testid="product-tile"][data-name="${productName}"]`)
        await tile.click()
    }

    basketItem(productName) {
        return $(`[data-testid="basket-item"][data-name="${productName}"]`)
    }

    async setQuantity(productName, qty) {
        const item = await this.basketItem(productName)
        const qtyInput = await item.$('[data-testid="item-qty"]')
        await qtyInput.clearValue()
        await qtyInput.setValue(qty)
    }

    async getSubtotal() {
        return this.subtotalDisplay.getText()
    }

    async getSubtotalNumeric() {
        const text = await this.subtotalDisplay.getText()
        return parseFloat(text.replace(/[^0-9.]/g, ''))
    }

    async getGrandTotalNumeric() {
        const text = await this.grandTotalDisplay.getText()
        return parseFloat(text.replace(/[^0-9.]/g, ''))
    }

    async getUnitPrice(productName) {
        const tile = await $(`[data-testid="product-tile"][data-name="${productName}"]`)
        const text = await tile.$('[data-testid="tile-price"]').getText()
        return parseFloat(text.replace(/[^0-9.]/g, ''))
    }

    async loadLocalInvoice(draftId) {
        await this.loadInvoiceSelect.selectByAttribute('value', draftId)
    }

    async proceedToCheckout() {
        await this.checkoutBtn.click()
    }
}

export default new POSPage()
