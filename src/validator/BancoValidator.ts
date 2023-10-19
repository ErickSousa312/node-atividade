import { body, ValidationChain } from 'express-validator';

const simularFinanciamentoValidator: ValidationChain[] = [
  body('valor').isNumeric().withMessage('O valor deve ser numérico.'),
  body('bancoId').isInt({ min: 1 }).withMessage('O ID do banco deve ser um número inteiro positivo.'),
  body('parcelas').isInt({ min: 1 }).withMessage('O número de parcelas deve ser um número inteiro positivo.'),
];

module.exports =simularFinanciamentoValidator ;
