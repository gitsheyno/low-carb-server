import { Router } from "express";

const router = Router();

router.get('/login',(req,res)=>{
    res.json({message : "hello from log in page"})
})

router.post('/login',(req,res)=>{


    // console.log(`data received with : ${req.body.username}`)
    console.log(`data received with : ${JSON.stringify(req.body)}`)

    res.status(200)
    res.json({message : "hello from next log in page" , user : req.body.username})
})

export default router