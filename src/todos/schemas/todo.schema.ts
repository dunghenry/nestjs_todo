import { ITodo } from './../interfaces/todo.interface';
import { Schema } from 'mongoose';
export const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);
