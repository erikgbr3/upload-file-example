import db from './index';

export const checkUserEmailPassword = async ( _username, password ) => {

    const user = await db.User.findOne({ where: { username: _username, active: true }});

    if (!user) {
        return null;
    }

    if (!user.isValidPassword(password)) {
        return null;
    }

    const {
        id,
        name,
        username,
        email,
        role,
    } = user;

    return {
        id,
        name,
        username,
        email,
        role,
    }
}