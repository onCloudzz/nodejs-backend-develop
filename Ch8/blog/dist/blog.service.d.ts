import { PostDto } from './blog.model';
export declare class BlogService {
    posts: any[];
    getAllPost(): any[];
    createPost(postDto: PostDto): void;
    getPost(id: any): any;
    deletePost(id: any): void;
    updatePost(id: any, postDto: PostDto): {
        updateDt: Date;
        id: string;
        title: string;
        content: string;
        name: string;
        createDt: Date;
    };
}
