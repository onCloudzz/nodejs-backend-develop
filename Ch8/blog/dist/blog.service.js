"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogService = void 0;
class BlogService {
    constructor() {
        this.posts = [];
    }
    getAllPost() {
        return this.posts;
    }
    createPost(postDto) {
        const id = this.posts.length + 1;
        this.posts.push({
            id: id.toString(),
            ...postDto,
            createDt: new Date(),
        });
    }
    getPost(id) {
        const post = this.posts.find((post) => {
            return post.id === id;
        });
        console.log(post);
        return post;
    }
    deletePost(id) {
        const filteredPosts = this.posts.filter((post) => post.id !== id);
        this.posts = [...filteredPosts];
    }
    updatePost(id, postDto) {
        let updateIndex = this.posts.findIndex((post) => post.id === id);
        const updatePost = { id, ...postDto, updateDt: new Date() };
        this.posts[updateIndex] = updatePost;
        return updatePost;
    }
}
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map