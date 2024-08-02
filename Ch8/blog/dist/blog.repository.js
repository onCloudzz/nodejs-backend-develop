"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogFileRepository = void 0;
const promises_1 = require("fs/promises");
class BlogFileRepository {
    constructor() {
        this.FILE_NAME = './src/blog.data.json';
    }
    async getAllPost() {
        const datas = await (0, promises_1.readFile)(this.FILE_NAME, 'utf-8');
        const posts = JSON.parse(datas);
        return posts;
    }
    async createPost(postDto) {
        const posts = await this.getAllPost();
        const id = posts.length + 1;
        const createPost = { id: id.toString(), ...postDto, createDt: new Date() };
        posts.push(createPost);
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(posts));
    }
    async getPost(id) {
        const posts = await this.getAllPost();
        const post = posts.find((post) => post.id === id);
        return post;
    }
    async deletePost(id) {
        const posts = await this.getAllPost();
        const filteredPosts = posts.filter((post) => post.id !== id);
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(filteredPosts));
    }
    async updatePost(id, postDto) {
        const posts = await this.getAllPost();
        let index = posts.findIndex((post) => post.id === id);
        const updatePost = { id, ...postDto, updateDt: new Date() };
        posts[index] = updatePost;
        await (0, promises_1.writeFile)(this.FILE_NAME, JSON.stringify(posts));
    }
}
exports.BlogFileRepository = BlogFileRepository;
//# sourceMappingURL=blog.repository.js.map