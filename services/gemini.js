import { GoogleGenerativeAI } from "@google/generative-ai";
import 'dotenv/config';

const ai = new GoogleGenerativeAI(process.env.GEN_KEY);

const generarDescripcion = async (name, category) => {
    try {
        const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" }); 
        const prompt = `
        Genera una descripción atractiva y profesional para el siguiente producto de e-commerce.

        Producto: ${name}
        Categoría: ${category}

        Requisitos:
        - Entre 30-50 palabras
        - Destaca características técnicas relevantes
        - Usa un tono profesional pero atractivo
        - Menciona beneficios clave para el usuario
        - NO incluyas el precio en la descripción
        - Escribe en español
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const description = response.text().trim();
        return description;
    } catch (error) {
        console.error('Error al generar la descripción del producto:', error);
        throw new Error('Error al generar la descripción del producto');
    }
};

export { generarDescripcion };