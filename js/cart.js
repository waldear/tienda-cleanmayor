/**
 * @file cart.js
 * @description Secure cart management with local persistence.
 */

const Cart = {
    items: JSON.parse(localStorage.getItem('cart')) || {},
    pricelist: 'minorista',

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },

    add(name, delta) {
        this.items[name] = Math.max(0, (this.items[name] || 0) + delta);
        if (this.items[name] === 0) delete this.items[name];
        this.save();
    },

    clear() {
        this.items = {};
        this.save();
    },

    getTotal(products) {
        let total = 0;
        let count = 0;
        Object.keys(this.items).forEach(name => {
            const p = products.find(prod => prod.name === name);
            if (p) {
                const price = this.pricelist === 'minorista' ? p.priceMinorista : p.priceMayorista;
                total += this.items[name] * price;
                count += this.items[name];
            }
        });
        return { total, count };
    },

    setPricelist(mode) {
        this.pricelist = mode;
        this.save();
    }
};
