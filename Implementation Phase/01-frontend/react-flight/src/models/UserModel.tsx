class UserModel {
    userID: number;
    username: string;
    password: string;
    role: string;
    member: number;

    constructor(userID: number, username: string, password: string, role: string, member: number) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.role = role;
        this.member = member;
    }
}

export default UserModel;