class UserView {
    userID: number;
    username: string;
    password: string;
    roleID: number;
    member: boolean;
    Fname: string;
    Lname: string;

    constructor(userID: number, username: string, password: string, roleID: number, member: boolean, Fname: string, Lname: string) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.roleID = roleID;
        this.member = member;
        this.Fname = Fname;
        this.Lname = Lname;
    }
}

export default UserView;