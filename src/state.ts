import { User } from "./model/user";
import { SpaceShip } from "./model/SpaceShip";
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

export let spaceships: SpaceShip[] = [
    new SpaceShip(1, 2, `Enterprise`, 5000, 5000, `it\'s a ship`),
    new SpaceShip(2, 2, `Tesla`, 5000, 5000, `it\'s a ship`),
    new SpaceShip(3, 2, `SS Minow`, 5000, 5000, `it\'s a ship`),
    new SpaceShip(4, 2, `X-Wing`, 5000, 5000, `it\'s a ship`),
    new SpaceShip(5, 2, `Salmon Catcher`, 5000, 5000, `it\'s a ship`),
    new SpaceShip(6, 2, `Serrenity`, 5000, 5000, `it\'s a ship`),
    new SpaceShip(7, 2, `Yes`, 5000, 5000, `it\'s a ship`)
]
