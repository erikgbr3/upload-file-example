import extToMimes from 'database/config/extToMimes';

import fs from "fs";

export default function handler(req, res) {
    switch(req.method) {
      case 'GET':
        return viewDocument(req, res);
  
      default:
        res.status(400).json({error: true, message: 'Petician erranoa'});
    }
}


const viewDocument = async (req, res) => {
    try {
        const fileName = req.query.file;
        const serverFilesPath = "/Users/erikg/Documents/imagenes/";
        const filePath = `${serverFilesPath}${fileName}`;

        if(!fs.existsSync(filePath)) {
            res.setHeader("Content-Type", "text/html");
            res.write("<h1>El archivo no existe</h1>");
            return res.status(404)
        }

        const ext = fileName.substring(fileName.lastIndexOf('.') + 1);
        res.setHeader("Content-Type", extToMimes[ext] || 'application/document');
        res.setHeader("Content-Disposition", "inline");

        const fileBuffer = fs.readFileSync(filePath);
        res.send(fileBuffer);
    } catch (error) {
        return res.status(400).json(
            {
              error: true,
              message: `Ocurria un error al leer el archivo: ${error.message}`
            }
        )
    }
}