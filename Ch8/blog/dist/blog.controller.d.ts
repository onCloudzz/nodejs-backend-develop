import { BlogService } from './blog.service';
export declare class BlogController {
    blogService: BlogService;
    constructor();
    getAllPost(): any[];
    createPost(postDto: any): string;
    getPost(id: string): any;
    deletePost(id: string): string;
    updatePost(id: string, postDto: any): {
        updateDt: Date;
        id: string;
        title: string;
        content: string;
        name: string;
        createDt: Date;
    };
}
