import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { 
  // BlogFileRepository,
  BlogMongoRepository 
} from './blog.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './blog.schema';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://onCloud:Pinbol0315@cluster0.63loqzc.mongodb.net/nest-js-board',
    ),
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
  ],
  controllers: [BlogController],
  providers: [
    BlogService, 
    // BlogFileRepository, 
    BlogMongoRepository],
})
export class AppModule {}
