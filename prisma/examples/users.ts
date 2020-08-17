type Role = "admin" | "member";

interface User {
    username: string;
    password: string;
    role: Role;
}

export default [
    {
        username: "admin",
        password: "admin",
        role: "admin"
    },
    {
        username: "lepepe",
        password: "pepe",
        role: "member"
    }
] as readonly User[];
