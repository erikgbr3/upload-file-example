import db from "database/models";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            return showProduct(req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const showProduct = async (req, res) => {
    try {
        console.log(req.query);
       const product = await db.Product.findOne({
            where: {id: req.query.slug}
        });

       if(!product) {
        return res.status(400).json({
            message: 'El producto no existe',
        });
       }

       const gallery = await db.Document.findAll({
        where: {
            documentable: 'product',
            documentableId: req.query.slug,
        }
       });

        return res.json({ ...product.dataValues, gallery});
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

  
 