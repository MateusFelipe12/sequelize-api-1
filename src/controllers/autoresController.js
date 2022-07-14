//responsavel por executar o que tiver que ser executado
//as funcoes de lidar com o banco de dados
//os cruds - GetAll, GetById, Persistir, Delete
import Autor from "../models/Autor";

const getAutores = async (req, res) => {
  try {
    let { id } = req.params;
    
    
    // if(id != id.replace(/\D/g, '')){
    //     return res.status(400).send({
    //         message: `Informe um id contendo somente numeros`
    //       })
    //     }
    // garante que o id só vai ter NUMEROS;
    id = id ? id.replace(/\D/g, '') : null; 
    
    if(!id){
      let autores = await Autor.findAll();

      return res.status(200).send({
        msg: `Autores importados de nosso banco de dados`,
        data: {autores}
      })
    }

    let autor = await Autor.findOne( {
      where: {
        id: id
      }
    } )
    if(!autor){
      return res.status(400).send({
        message: `Nao existe um autor com o id ${id}`
      })
    }
    return res.status(200).send({
      message:`Autor id ${id}`,
      data: {autor}
    })
    
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }

}

const persistir = async (req, res) => {
  try {
    let {id} = req.params;
    const { nome, email } = req.body;
    //id = id ? id.replace(/\D/g, '') : null;
    
    if(!nome || !email){
      return res.status(400).send({
        message: `Informe Nome e email do autor`
      })
    } 

    if(!id){
      let existe = await Autor.findOne({
        where: {
          email
        }
      })
      if(existe){
        return res.status(400).send({
          message: `ja existe um autor cadastrado com esse email`
        })
      }
      let autor = await Autor.create({
        nome: nome,
        email: email
      })
      return res.status(201).send({
        message: `Novo autor cadastrado com sucesso`,
        data: { autor }
      })
    }
    
    console.log("AQUI");
    let existe = await Autor.findOne({
      where: {
        id
      }
    });
    if(!existe){
      return res.status(400).send({
        message:`Nao existe um autor com o id ${id} para ser atualizado`
      })
    }
    let fields = [];
    Object.keys(req.params).forEach(campo => campo !== 'id' && fields.push(`${campo} = '${req.params[campo]}'`));
    console.log(fields);
    return res.status(200).send({fields})
    fields = fields.join(', ');
    
    return res.status(201).send({
      message: `autor atualizado com sucesso`
    })
    
  } catch (error) {
    return res.status(500).send({
      message: error.message
    })
  }
}


export default {
  getAutores,
  persistir
};