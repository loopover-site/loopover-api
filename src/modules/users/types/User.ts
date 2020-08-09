type Role = "admin" | "member";

export default interface User {
    id: number;
    username: string;
    password: string;
    role: Role;
}
