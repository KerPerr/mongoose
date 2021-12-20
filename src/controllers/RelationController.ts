import { Request, Response } from "express";
import { Relation } from "../entity/Relation";
import { User } from "../entity/User";

export class RelationController {

    static list = async (req: Request, res: Response) => {
        const { me } = res.locals.payload

        try {
            const relations = await Relation.find({
                $or: [{ user: me }, { owner: me }]
            })
                .populate('owner').populate('user')

            const pending = relations.filter(r => r.status === 'PENDING')
            const friends = relations.filter(r => r.status === 'RESOLVE')

            return res.send({pending, friends})
        } catch (e) {
            console.log(e)
            return res.status(400).send(e.message)
        }
    }

    static create = async (req: Request, res: Response) => {
        const { me } = res.locals.payload
        const { id } = req.body

        if (me === id) return res.status(400).send({ message: 'Cannot ask youself' })

        try {
            const userA = await User.findById(me)
            const userB = await User.findById(id)

            const relation = await Relation.findOne({
                owner: userB._id,
                user: userA._id
            })

            if (!relation) {
                const friend = new Relation({
                    owner: me,
                    user: id
                })
                const result = await friend.save()
                return res.send(result)
            } else {
                userA.friends.push(userB)
                userB.friends.push(userA)
                await userA.save()
                await userB.save()

                relation.status = "RESOLVE"
                const result = await relation.save()
                return res.send(result)
            }

        } catch (e) {
            console.log(e)
            return res.status(400).send(e.message)
        }
    }

    static reponse = async (req: Request, res: Response) => {
        const { id } = req.params
        const { status } = req.body

        try {
            const relation = await Relation.findById(id)

            if (status === 'RESOLVE') {
                const userA = await User.findById(relation.owner)
                const userB = await User.findById(relation.user)
                userA.friends.push(userB)
                userB.friends.push(userA)
                await userA.save()
                await userB.save()
                relation.status = status
                const result = await relation.save()
                return res.send(result)
            }

            if (status === 'REJECT') {
                const result = await Relation.findByIdAndDelete({ _id: id })
                return res.send(result)
            }

        } catch (e) {
            console.log(e)
            return res.status(400).send(e.message)
        }
    }
}