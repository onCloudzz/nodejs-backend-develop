import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document;

@Schema()
export class Blog {
  @Prop()
  id: string;

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  name: String;

  @Prop()
  createDt: Date;

  @Prop()
  updateDt: Date;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
