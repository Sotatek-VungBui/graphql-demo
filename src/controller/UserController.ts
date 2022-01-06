import User from '@models/User';

type UserQuery = {
    email?: string
}

const UserController = {
    getAllUsers: async (query?: UserQuery) => {
        return User.find({...query}).then(async (users) => {
            const mappingUser: any[] = [];
            if(users.length <= 0) {
                return [];
            }
            await users.map(item => {
                mappingUser.push({
                    id: item._id,
                    email: item.email,
                    password: ''
                })
            });
            return mappingUser;
        })
    },
    getUserById: async (id: String) => {
        return User.findById(id).then(user => {
            return { 
                ...user,
                email: user.email, 
                password: '', 
                id: user._id
            }
        }).catch(err => {
            throw new Error('USER_NOT_FOUND')
            throw err;
        })
    },
};

export default UserController;