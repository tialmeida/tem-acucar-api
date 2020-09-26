require('dotenv').config();

export default async(req, res, next) => {
   const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).send({error: "token não enviado"});
    }

    const [, token] = authHeader.split(' ');

    if(token == process.env.SUPERADMIN_KEY){
        return next();
    }else{
        return res.status(401).send({error: "Apenas moderadores podem fazer isso"});
    }
}