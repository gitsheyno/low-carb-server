import { Router } from "express";

const router = Router();

router.get('/login',(req,res)=>{
    res.json({message : "hello from log in page"})
})

export default router