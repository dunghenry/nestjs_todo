import { Document } from 'mongoose';
export interface TodoDocument extends Document {
  readonly title: string;
  readonly description: string;
  readonly completed: boolean;
}
