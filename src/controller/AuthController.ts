import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@models/User';
import RegexService from '@services/regex';

type LoginQuery = {
    email: string
    password: string
}

type SignUp = {
    email: string
    password: string
}

const AuthController = {
    signIn: async (query: LoginQuery) => {
        const { email, password } = query;
        const isEmail = RegexService.isEmail(email);
        if(!isEmail) throw Error('EMAIL_ERROR_FORMAT');
        const user = await User.findOne({ email: email });
        if(!user) {
            throw new Error('USER_DOES_NOT_EXIST')
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual) {
            throw new Error('PASSWORD_IS_INCORRECT')
        }
        const token = jwt.sign(
            {
                userId: user.id, 
                email: email
            }, 
            process.env.JWT_SECRET || 'supersecret',
            {
                expiresIn: '12h'
            }
        );
        return { userId: user.id, token: token, tokenExpiration: 12}
    },
    signUp: async (params: SignUp) => {
        const { email, password } = params;
        const isEmail = RegexService.isEmail(email);
        if(!isEmail) throw Error('EMAIL_ERROR_FORMAT');
        
        return User.findOne({ email }).then(user => {
            if(user) {
                throw new Error('USER_EXISTS_ALREADY')
            }
            return bcrypt.hash(password, 12);
        })
        .then(hashedPassword => {
            const newUser = new User({
                email,
                password: hashedPassword
            });
            return newUser.save();
        })
        .then(result => {
            return {...result._doc, password: '', id: result._id}
        })
        .catch(err => {
            throw err;
        });
    }
};

export default AuthController;