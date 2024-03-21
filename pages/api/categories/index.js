import db from "database/models";

export default function handler(req, res) {
    switch(req.method) {
        case 'GET':
            return categoriesList(req, res);

        default:
            res.status(400).json({error: true, message: 'Petición errónea'});
    }
  }

  const categoriesList = async (req, res) => {
    try {
        
        const categories = await db.ProductCategory.findAll({});
              
        return res.json(categories);
        
    } catch(error){
        return res.status(400).json(
            {
                error: true,
                message: `Ocurrio un error al procesar la petición: ${error.message}`
            }
        )
    }
  }



  