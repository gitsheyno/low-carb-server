import { hashPass,createJWT, comparePasswords } from "../modules/auth"
import prisma from "../db"
import { UserRequest } from "../modules/types"
/**
 * Create User
 */

export const createUser = async(req,res)=>{

    const inComingUser : UserRequest = req.body

    const user = await prisma.user.create({
        data : {
            username : inComingUser.username ,
            password : await hashPass(inComingUser.password)
        }
    })

    const token = createJWT(user)
    res.json({data:{username : user.username} ,token })
}

export const loginUser = async(req,res)=>{
    const inComingUser : UserRequest = req.body

    const user = await prisma.user.findUnique({
        where : {
            username : inComingUser.username,
        }
    })
    const isValid = await comparePasswords(inComingUser.password, user.password);
}