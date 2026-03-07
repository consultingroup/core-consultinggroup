import { Injectable } from "@nestjs/common";
import { User } from "./user.model";
import { InjectModel } from "@nestjs/sequelize";

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User)
        private userRepository: typeof User,
    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userRepository.findAll();
    }
}