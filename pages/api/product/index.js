import db from "database/models";

export default function handler(req, res){
    switch(req.method){
        case 'POST':
            return Addproduct (req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
}

const Addproduct = async (req, res) => {
    try {
        console.log(req.body);
        
        const products = await db.Product.create({...req.body});
        res.json({
            products,
            message: 'El producto fue registrado correctamente'
        });
    } catch (error) {
        console.log(error);
        let errors = [];
        if (error.errors) {
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.parh,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `ocurrio un error al procesar la petición: ${error.message}`,
                errors,
            }
        )
    }
}