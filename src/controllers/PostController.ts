import { Request, Response } from "express";
import { Post } from "../entity/Post";
import { User } from "../entity/User";

export class PostController {

    static list = async (req: Request, res: Response) => {
        const { id } = req.params
        const { me } = res.locals.payload

        try {
            if (id) {
                const posts = await Post.find({author: id}).sort({'updatedAt': -1})
            } else {
                // const user = await User.findById(me)
                const posts = await Post.find({author: me}).sort({updatedAt: -1}).populate('owner')
                // const posts = user.friends.map(async f => {
                //     console.log(await User.findById(f))
                // })
                return res.send(posts)
            }
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: e.message })
        }
    }

    static create = async (req: Request, res: Response) => {
        const { me } = res.locals.payload

        try {
            const user = await User.findById(me)
            const post = new Post(req.body)
            post.owner = user._id

            user.posts.push(post)
            await user.save()

            const result = await post.save()
            return res.send(result)
        } catch (e) {
            console.log(e)
            res.status(400).send({ message: e.message })
        }
    }
}