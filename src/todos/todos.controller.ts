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
  constructor(private readonly todoService: TodosService) {}
}
