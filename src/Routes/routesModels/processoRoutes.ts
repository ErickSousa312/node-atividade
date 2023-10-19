const router = require('express').Router()
import  BancoController from "../../Controllers/BancoController";
const Banco = new BancoController();
const { body, validationResult } = require('express-validator');

const simularFinanciamentoValidator = require('../../Validator/BancoValidator')


//Rotas Bancos
router.post('/',simularFinanciamentoValidator, Banco.postFinan);
router.get('/', Banco.get);
router.delete('/:id', Banco.delete);
router.put('/:id', Banco.update);

module.exports = router