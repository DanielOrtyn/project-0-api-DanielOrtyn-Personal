export class SpaceShip {
    shipId: number
    owner: number
    name: string
    weight: number
    speed: number
    description: string

    constructor(newShipId = 0, newOwner = 0, newName = ``,
        newWeight = 0, newSpeed = 0, newDescription = ``) {
        this.shipId = newShipId
        this.name = newName
        this.weight = newWeight
        this.speed = newSpeed
        this.description = newDescription
        this.owner = newOwner
    }
}