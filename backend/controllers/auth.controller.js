export const signup = (req, res) => {
    try {
        const {fullName,username,password,confirmPassword,gender}= req.body;
    } catch (error) {
        
    }
}

export const login = (req, res) => {
    res.send('login forn');
}

export const logout = (req, res) => {
    res.send('logout forn');
}

