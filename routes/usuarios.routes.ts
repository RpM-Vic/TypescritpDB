
import {Router} from 'express';
import {
    getUsuario, 
    postUsuario, 
    putUsuario ,
    deleteUsuario,
    getUsuarios
    } from '../controller/usuarios.controller';



const router = Router();
router.get('/all', getUsuarios)
router.get('/:nombre', getUsuario)
router.post('/', postUsuario)
router.put('/:id', putUsuario)
router.delete('/:id',deleteUsuario)



export default router;