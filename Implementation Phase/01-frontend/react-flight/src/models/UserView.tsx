class UserView {
    userID: number;
    username: string;
    password: string;
    roleID: number;
    card: boolean;
    fname: string;
    lname: string;
    address: string;

    constructor(userID: number, username: string, password: string, roleID: number, card: boolean,
                Fname: string, Lname: string, address: string) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.roleID = roleID;
        this.card = card;
        this.fname = Fname;
        this.lname = Lname;
        this.address = address;
    }
}

export default UserView;