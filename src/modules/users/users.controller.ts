import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    async getAllUsers() {
        return await this.usersService.findAllUsers();
    }
}