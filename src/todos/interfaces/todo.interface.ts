import { Document } from 'mongoose';
export interface TodoDocument extends Document {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}
export interface ITodo {
  title: string;
  description: string;
  completed: boolean;
}
