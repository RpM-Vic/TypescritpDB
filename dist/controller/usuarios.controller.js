"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
//user.controller.ts
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    usuario_1.default.findAll()
        .then(data => {
        console.log("data:", data);
        res.status(200).json({
            message: "get usuarios",
            data
        });
    })
        .catch((err) => {
        console.error('Error fetching usuarios:', err);
        res.status(500).json({
            message: "Error fetching usuarios",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre } = req.params;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { nombre } });
        if (usuario) {
            res.status(200).json({
                message: "get usuario",
                nombre,
                usuario
            });
        }
        else {
            res.status(404).json({
                message: "Usuario not found",
                nombre
            });
        }
    }
    catch (err) {
        console.error('Error fetching usuario:', err);
        res.status(500).json({
            message: "Error fetching usuario",
            error: err
        });
    }
});
exports.getUsuario = getUsuario;
const postUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    res.status(200).json({
        message: "post usuario",
        body
    });
});
exports.postUsuario = postUsuario;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    res.status(200).json({
        message: "put usuario",
        body,
        id
    });
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    res.status(200).json({
        message: "delete usuario",
        id
    });
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map