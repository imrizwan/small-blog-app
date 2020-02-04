import { AuthController } from '../controllers/authController';
// import { CompanyAuthController } from '../controllers/companyController';
import * as passport from 'passport';

export class Routes {
    public authController: AuthController = new AuthController();
    // public companycontroller: CompanyAuthController = new CompanyAuthController();
    public routes(app): void {
        app.get('/api/test', (req, res) => res.json({ msg: 'It Works' }));
        app.post('/api/register', this.authController.addNewUser)
        app.post('/api/login', this.authController.loginUser)
        app.post('/api/createpost', passport.authenticate("jwt", { session: false }), this.authController.createPosts)
        app.get('/api/getallposts', passport.authenticate("jwt", { session: false }), this.authController.getAllPosts)
        app.get('/api/getmyposts', passport.authenticate("jwt", { session: false }), this.authController.getMyPosts)
        app.get('/api/deletemypost/:id', passport.authenticate("jwt", { session: false }), this.authController.deleteMyPost)
        app.get('/api/getalluser', passport.authenticate("jwt", { session: false }), this.authController.getAllUser)
        app.get('/api/removeuser/:id', passport.authenticate("jwt", { session: false }), this.authController.removeUser)
        app.get('/api/likepost/:id', passport.authenticate("jwt", { session: false }), this.authController.likePost)
        app.post('/api/adduserbyadmin', passport.authenticate("jwt", { session: false }), this.authController.addUserByAdmin)
        app.get('/api/current', passport.authenticate("jwt", { session: false }), this.authController.current)
    }
}