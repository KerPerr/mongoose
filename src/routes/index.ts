import { Router } from "express";
import { checkToken } from "../middlewares/checkToken";
import AuthRoute from './AuthRoute'
import UserRoute from './UserRoute'
import PostRoute from './PostRoute'
import RelationRoute from './RelationRoute'

const root = Router()

root.use('/', AuthRoute)
root.use('/users', [checkToken], UserRoute)
root.use('/posts', [checkToken], PostRoute)
root.use('/relations', [checkToken], RelationRoute)

export default root