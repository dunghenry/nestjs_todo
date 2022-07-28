import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TodoDocument } from './interfaces/todo.interface';
import { TodoDto } from './todo.dto';
@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoDocument>) {}
  async getTodos(): Promise<TodoDto[]> {
    try {
      const todos = await this.todoModel.find({});
      if (!todos) {
        throw new HttpException('Not Found', 404);
      }
      return todos;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  async createTodo(newTodo: TodoDto): Promise<TodoDto> {
    const todo = await this.todoModel.findOne({ title: newTodo.title });
    if (todo) {
      throw new HttpException('Title already exists!', 400);
    }
    try {
      const { title, description } = newTodo;
      const todo = new this.todoModel({ title, description });
      await todo.save();
      return todo;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  async getTodoById(id: mongoose.Types.ObjectId): Promise<TodoDto> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Id in not valid!', 400);
    }
    try {
      const todo = await this.todoModel.findOne({ _id: id });
      if (!todo) {
        throw new HttpException('Not Found', 404);
      } else {
        return todo;
      }
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  async deleteTodoById(id: mongoose.Types.ObjectId): Promise<string> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Id in not valid!', 400);
    }
    try {
      const deletedTodo = await this.todoModel.deleteOne({ _id: id });
      if (deletedTodo.deletedCount === 0) {
        throw new HttpException('Not Found', 404);
      }
      return 'Deleted todo successfully!';
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
  async updateTodoById(
    id: mongoose.Types.ObjectId,
    updateTodo: TodoDto,
  ): Promise<TodoDto> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new HttpException('Id in not valid!', 400);
    }
    try {
      const todo = await this.todoModel.findById(id);
      if (!todo) {
        throw new HttpException('Not Found', 404);
      }
      const todoUpdate = await this.todoModel.findByIdAndUpdate(
        { _id: id },
        updateTodo,
        { new: true },
      );
      return todoUpdate;
    } catch (error) {
      if (error.response) {
        throw new HttpException(error.response, error.status);
      }
      throw new InternalServerErrorException();
    }
  }
}
