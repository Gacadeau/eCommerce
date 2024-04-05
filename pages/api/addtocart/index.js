import executeQuery from '../../Config/db';

export default async function handler(req,res){
    const{id_product,id_user,n_product,unit_price,photo,total,qte}=req.body;
    const results = await executeQuery('INSERT INTO cart(id_user,id_product,n_product,photo,unit_price,total,qte) VALUES(?,?,?,?,?,?,?)',[id_user,id_product,n_product,photo,unit_price,total,qte]) ;
    if(results){
        res.status(200).json({ success: true, message: 'Données insérées avec succès dans la table cart.' });
    }
}