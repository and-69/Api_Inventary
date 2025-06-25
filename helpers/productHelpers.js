import Products from '../models/producto.js';

const productHelpers = {
    validarProducto: async (id) => {
        const producto = await Products.findById(id);
        if (!producto) {
            throw new Error('Producto no encontrado');
        }
    }
}

export { productHelpers };