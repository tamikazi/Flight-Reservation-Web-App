class LoginResponseView {
    userId: number;
    role: string;

    constructor(userId: number, role: string) {
        this.userId = userId;
        this.role = role;
    }
}

export default LoginResponseView;