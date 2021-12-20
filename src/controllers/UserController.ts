import { Request, Response } from "express";
import { User } from "../entity/User";

export class UserController {

    static friendlist(req: Request, res: Response) {
        
    }

    static read = async (req: Request, res: Response) => {
        const { id } = req.params
        const { me } = res.locals.payload

        try {
            if (id) {
                const user = await User.findById(id).populate('friends')
                res.send(user.friends)
            } else {
                const user = await User.findById(me)
                if(!user) return res.status(401).send([])
                const arr = [...user.friends, user._id]

                const users = await User.find({
                    _id: { $nin: arr }
                })

                res.send(users)
            }
        } catch (e) {
            console.log(e)
            res.status(400).send(e)
        }
    }

    static delete = async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            if (id) {
                const user = await User.deleteOne({ _id: id })
                if (user.deletedCount === 0) {
                    return res.send({ message: `User doesn't exists` })
                }
                res.send({ message: `User: ${id} deleted` })
            } else {
                await User.deleteMany()
                res.send({ message: `All user have been deleted` })
            }
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: `Wild error appeared` })
        }
    }
}