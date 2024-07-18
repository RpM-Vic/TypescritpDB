
//user.controller.ts
import Usuario  from "../models/usuario";


import { Request, Response } from "express";

export const getUsuarios = async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll();
        console.log("usuarios:", usuarios);
        res.status(200).json({
            message: "get usuarios",
            usuarios
        });
    } catch (err) {
        console.error('Error fetching usuarios:', err);
        res.status(500).json({
            message: "Error fetching usuarios",
            error: err instanceof Error ? err.message : 'Unknown error'
        });
    }
};




export const getUsuario = async (req: Request, res: Response) => {
    const { nombre } = req.params;

    try {
        const usuario = await Usuario.findOne({ where: { nombre } });

        if (usuario) {
            res.status(200).json({
                message: "get usuario",
                nombre,
                usuario
            });
        } else {
            res.status(404).json({
                message: "Usuario not found",
                nombre
            });
        }
    } catch (err) {
        console.error('Error fetching usuario:', err);
        res.status(500).json({
            message: "Error fetching usuario",
            error: err
        });
    }
};

export const postUsuario=async(req:Request,res:Response)=>{
    const {body}= req;

    res.status(200).json({
        message:"post usuario",
        body
    })
}

export const putUsuario=async(req:Request,res:Response)=>{
    const {id}= req.params;
    const {body}= req;

    res.status(200).json({
        message:"put usuario",
        body,
        id
    })
}

export const deleteUsuario=async(req:Request,res:Response)=>{
    const {id}= req.params;

    res.status(200).json({
        message:"delete usuario",
        id
    })
}