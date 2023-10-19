import { Request, Response, response } from 'express';
import { body, validationResult,  ValidationChain } from 'express-validator';

const Banco = require('../models/Banco')

class BancoController {
  async postFinan(req: Request, res: Response): Promise<Response> {
    try {

      // Valide os dados
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("entrou3")
        return res.status(400).json({ errors: errors.array() });
      }
      console.log("n entrou")
      const { valor, bancoId, parcelas } = (req.body);

      const response  = await Banco.findOne({_id:bancoId})

      const taxaJuros = response.anual_interest_rate/100
      const valorRequerido = valor

      console.log(valorRequerido)

      const jurosSimples = valorRequerido * taxaJuros * parcelas;

      console.log(jurosSimples)

      const montanteTotal = valorRequerido + jurosSimples;

      const valorParcela = montanteTotal / parcelas;

      console.log(valorParcela)
      console.log(montanteTotal)

      if (!response) {
        return res.status(400).json({ msg: "Erro ao procurar o banco" });
      }

      return res.status(201).json({ 'Valor a ser pago': montanteTotal, 'Valor de cada parcela mensal': valorParcela });
      
    } catch (error) {
      return res.status(400).json({ msg: 'Erro ao criar o Bancos', error });
    }
  }

  async getByIdBanco(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await Banco.find({ _id: id });
      if (!response) {
        return res.status(404).json({ msg: 'Banco não encontrado' });
      }
      return res.status(200).json({ msg: 'Banco encontrado com sucesso', data: response });
    } catch (error) {
      return res.status(400).json({ msg: 'Erro ao buscar o Banco', error });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const response = await Banco.find();

      return res.status(200).json({ msg: 'Bancos encontrado com sucesso', data: response });
    } catch (error) {
      return res.status(400).json({ msg: 'Erro ao buscar o Bancos', error });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await Banco.findOneAndDelete({ _id: id });
      if (!response) {
        return res.status(400).json({ msg: "Erro ao deletar o Parecer Medico" });
      } else {
        return res.status(200).json({ msg: "Parecer Medico deletado com sucesso", data: response });
      }
    } catch (error) {
      return res.status(400).json({ msg: "Erro ao deletar o Parecer Medico", error });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const response = await Banco.findByIdAndUpdate(id, req.body, { new: true });
      if (!response) {
        return res.status(400).json({ msg: "Erro ao atualizar o Parecer Medico" });
      } else {
        return res.status(200).json({ msg: "Parecer Medico atualizado com sucesso", data: response });
      }
    } catch (error) {
      return res.status(400).json({ msg: "Erro ao atualizar o Parecer Medico", error });
    }
  }
}

export default BancoController;