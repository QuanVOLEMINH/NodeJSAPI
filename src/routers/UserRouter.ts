import { Router, Request, Response, NextFunction } from 'express';
import * as fetch from 'node-fetch';
import User from '../models/User';


export class UserRouter {
    public router: Router;
    constructor() {
        this.router = Router();
        this.routes();
    }

    public async all(req: Request, res: Response) {
        let response = await User.find();
        return res.status(200).send(response);
    }

    public async one(req: Request, res: Response, next: NextFunction) {
        try {
            let user: any = await User.findById(req.params.userId);
            if (!user) {
                return res.status(404).send();
            } else {
                return res.status(200).send(user);
            }
        } catch (err) {
            next(err);
        };
    }

    public async addUser(req: Request, res: Response) {
        const user = new User({
            "name": req.body.name,
            "email": req.body.email,
            "age": req.body.age
        });

        await user.save();
        return res.status(204).send();
    }

    public async patchUser(req: Request, res: Response, next: NextFunction) {
        try {
            
            let user: any = await User.findById(req.params.userId);

            if (!user) {
                return res.status(404).send();
            } else {

                if (req.body.name) {
                    user.name = req.body.name;
                }

                if (req.body.email) {
                    user.email = req.body.email;
                }

                if (req.body.age) {
                    user.age = req.body.age;
                }

                await user.save();
                return res.status(204).send();
            }
        }
        catch (err) {
            next(err);
        }
    }

    public async getLocation(req: Request, res: Response, next: NextFunction) {
        let userIPAdress = req.connection.remoteAddress;

        const response = await fetch("http://ip-api.com/json" + (userIPAdress == "::1" ? '' : `/${userIPAdress}`));
        const data = await response.json();

        return data;
    }

    public routes(): void {
        this.router.get('/', this.all);
        // this.router.get('/:userId', this.one);
        // this.router.post('/', this.addUser);
        this.router.patch('/:userId', this.patchUser);
    }
}

const userRoutes: UserRouter = new UserRouter();
userRoutes.routes();
const userRouter: Router = userRoutes.router;

export default userRouter;