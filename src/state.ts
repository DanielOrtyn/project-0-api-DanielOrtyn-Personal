import { User } from "./model/user";
import { Role } from "./model/Role";

export let roles: Role[] = [
    new Role(`Admin`),
    new Role(`Associate`)
]


export let users: User[] = [
    new User(1, `DanielOrtyn`, `pass`, `Daniel`, `Ortyn`, `danielortyn@comcast.net`, roles[0]),
    new User(2, `BestJake`, `pass`, `Jake`, `First`, `aFakeEmail@gmail.com`, roles[1]),
    new User(3, `MiddleJake`, `pass`, `Jake`, `Second`, `aFakeEmail@gmail.com`, roles[1]),
    new User(4, `WorstJake`, `pass`, `Jake`, `Third`, `aFakeEmail@gmail.com`, roles[1]),
]
