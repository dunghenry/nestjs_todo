import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Post,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodoDto } from './todo.dto';
import mongoose from 'mongoose';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}
  @Get()
  async getTodos() {
    return await this.todosService.getTodos();
  }
  @Post()
  async createTodo(@Body() newTodo: TodoDto) {
    return await this.todosService.createTodo(newTodo);
  }
  @Get(':id')
  async getTodoById(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.todosService.getTodoById(id);
  }
  @Delete(':id')
  async deleteTodoById(@Param('id') id: mongoose.Types.ObjectId) {
    return await this.todosService.deleteTodoById(id);
  }
  @Put(':id')
  async updateTodo(
    @Param('id') id: mongoose.Types.ObjectId,
    @Body() updateTodo: TodoDto,
  ) {
    return await this.todosService.updateTodoById(id, updateTodo);
  }
}
