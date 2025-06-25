import Products from '../models/producto.js';
import { generarDescripcion } from '../services/gemini.js';
const peticiones={
    agregarProducto: async (req, res) => {
        const { name, price, quantity, category } = req.body;
        try {
            const producto = new Products({ name, price, quantity, category });
            
            const descripcion = await generarDescripcion(name, category);
            producto.description = descripcion;
            await producto.save();
            
            res.status(201).json({
                producto,
                msg: "Producto agregado correctamente"
            });
        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster",
                error: error.message
            });
        }
    }
}

export { peticiones };