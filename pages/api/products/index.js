import db from "database/models";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            return productsList(req, res);

        case 'PUT':
            return editProduct(req, res);

        case 'DELETE':
            return productDelete(req, res);

        case 'POST':
            return filterProducts(req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const productsList = async (req, res) => {
    try {
        const { categoryId } = req.query;

        let products = [];
        if (categoryId) {
            products = await db.Product.findAll({
                where: {
                        categoryId,  
                },
                include: ['category'],
            });
        } else {
            products = await db.Product.findAll({
                include: ['category'],
            });
        }

        return res.json(products);
    } catch(error){
        console.log(error);
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`
            }
        )
    }
  }

  
  const filterProducts = async (req, res) => {
    try {
        const {description}  = req.query;

        const {query}   = req.query;

        const {Op} = require('sequelize');

        let products = [];
        if(description) {
            products = await db.Product.findAll({
                where: {
                    [Op.or]: [{
                        description,
                        name: {//[Op.like]: 'tra%'
                            [Op.like]: query
                }}
                ]
                },
                include: [category],
            });  
        } else {
            products = await db.Product.findAll({
                include: ['category'],
            });
        }  
        return res.json(products);
    } catch(error){
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`
            }
        )
    }
  }

  const editProduct = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the user by ID
        await db.Product.update({...req.body}, {
            where: {
                id:id
            }
        })
        res.json({
            message: 'El producto fue actualizado'
        });

    } catch(error){
        console.log(error);
        let errors = [];
        if(error.errors){
            errors = error.errors.map((item) => ({
                error: item.message,
                field: item.path,
            }));
        }
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`
            }
        )
    }
  }

  const productDelete = async (req, res) => {
    try {
        const { id } = req.query;

        const product = await db.Product.findByPk(id);
        if (!product) {
            return res.status(404).json({error: true, message: 'Producto no encontrado'});
        }

        await product.destroy();

        return res.json({success: true, message: 'Producto eliminado exitosamente'});
    } catch(error){
        console.log(error);
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`
            }
        )
    }
}

