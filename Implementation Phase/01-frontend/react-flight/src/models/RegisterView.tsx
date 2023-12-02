class RegisterView {
    username: string;
    password: string;
    fname: string;
    lname: string;
    address: string;
    card: boolean;

    constructor(username: string, password: string, Fname: string, Lname: string, address: string, card: boolean) {
        this.username = username;
        this.password = password;
        this.fname = Fname;
        this.lname = Lname;
        this.address = address;
        this.card = card;
    }
}

export default RegisterView;