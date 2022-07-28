import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { TodoDocument } from './interfaces/todo.interface';
import { TodoDto } from './todo.dto';
@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<TodoDocument>) {}
}
