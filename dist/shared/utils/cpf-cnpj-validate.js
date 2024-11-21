"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCpfCnpjJoi = void 0;
const validateCpfCnpjJoi = (value, helpers) => {
    const cpfPattern = /^\d{11}$/;
    const cnpjPattern = /^\d{14}$/;
    if (!cpfPattern.test(value) && !cnpjPattern.test(value)) {
        console.log("value", value);
        return helpers.error("string.custom", {
            message: "CPF ou CNPJ deve ter 11 ou 14 dígitos",
        });
    }
    return value;
};
exports.validateCpfCnpjJoi = validateCpfCnpjJoi;
const validateCpf = (cpf) => {
    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
        return false;
    }
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10))) {
        return false;
    }
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11))) {
        return false;
    }
    return true;
};
const validateCnpj = (cnpj) => {
    if (cnpj.length !== 14 || !/^\d{14}$/.test(cnpj)) {
        return false;
    }
    let length = cnpj.length - 2;
    let numbers = cnpj.substring(0, length);
    const digits = cnpj.substring(length);
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) {
        return false;
    }
    length = length + 1;
    numbers = cnpj.substring(0, length);
    sum = 0;
    pos = length - 7;
    for (let i = length; i >= 1; i--) {
        sum += parseInt(numbers.charAt(length - i)) * pos--;
        if (pos < 2) {
            pos = 9;
        }
    }
    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(1))) {
        return false;
    }
    return true;
};
