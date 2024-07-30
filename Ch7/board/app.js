const express = require("express");
const handlebars = require("express-handlebars");
const { ObjectId } = require("mongodb");
const mongodbConnection = require("./configs/mongodb-connection");
const postService = require("./services/post-service");

const app = express();

let collection;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.engine("hbs", 
    handlebars.create({
        helpers: require("./configs/handlebars-helpers"),
        extname: "hbs",
    }).engine,
);
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");


app.get("/", async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const search = req.query.search || "";
    try {
        const [posts, paginator] = await postService.list(collection, page, search);
        res.render("home", { title: "테스트 게시판", search, paginator, posts });
    } catch (e) {
        console.error(e);
        res.render("home", { title: "테스트 게시판"});
    }
});

app.get("/write", (req, res) => {
    res.render("write", { title: "테스트 게시판", mode: "create" });
});

app.get("/modify/:id", async (req, res) => {
    const post = await postService.getPostById(collection, req.params.id);
    res.render("write", { title: "테스트 게시판", mode: "modify", post });
});

app.post("/modify/", async (req, res) => {
    const { id, title, writer, password, content } = req.body;

    const post = {
        title,
        writer,
        password,
        content,
        createDt: new Date().toISOString(),
    };

    const result = await postService.updatePost(collection, id, post);
    res.redirect(`/detail/${id}`);
});

app.delete("/delete", async (req, res) => {
    const { id, password } = req.body;
    console.log(id, password);
    try {
        const result = await collection.deleteOne({ _id: new ObjectId(id), password: password });

        if(result.deletedCount !== 1){
            console.log("삭제 실패");
            return res.json({isSuccess: false});
        }
        return res.json({isSuccess: true});
    } catch (e) {
        console.error(e);
        return res.json({isSuccess: false});
    }
});

app.post("/write-comment", async (req, res) => {
    const {id, name, password, comment} = req.body;
    const post = await postService.getPostById(collection,id);
    if(post.comments){
        post.comments.push({
            idx: post.comments.length + 1,
            name,
            comment,
            createDt: new Date().toISOString(),
        });
    }else{
        post.comments = [{
            idx: 1,
            name,
            password,
            comment,
            createDt: new Date().toISOString(),
        }];
    }
    postService.updatePost(collection, id, post);
    return res.redirect(`/detail/${id}`);
});

app.get("/detail/:id", async (req, res) => {
    console.log(req.params.id);
    const result = await postService.getDetailPost(collection, req.params.id);
    res.render("detail", {
        title: "테스트 게시판",
        post: result,
    });
});

app.post("/write", async (req, res) => {
    const post = req.body;

    const result = await postService.writePost(collection, post);

    res.redirect(`/detail/${result.insertedId}`);
});

app.post("/check-password", async (req, res) => {
    const { id, password } = req.body;
    const result = await postService.getPostByIdAndPassword(collection, id, password);
    console.log(result);
    console.log(password);
    if(!result){
        return res.status(404).json({ isExist: false });
    }else{
        return res.json({ isExist: true });
    }
});

app.delete("/delete-comment", async (req, res) => {
    const { id, idx, password } = req.body;
  
    // 게시글(post)의 comments 안에 있는 특정 댓글 데이터를 찾기
    const post = await collection.findOne(
      {
        _id: new ObjectId(id),
        comments: { $elemMatch: { idx: parseInt(idx), password } },
      },
      postService.projectionOption
    );
  
    // 데이터가 없으면 isSuccess : false를 주면서 종료
    if (!post) {
      return res.json({ isSuccess: false });
    }
  
    // 댓글 번호가 idx 이외인 것만 comments에 다시 할당 후 저장
    post.comments = post.comments.filter((comment) => comment.idx != idx);
    postService.updatePost(collection, id, post);
    return res.json({ isSuccess: true });
  });

app. listen(3000, async () => {
    console.log("Server is running on http://localhost:3000");

    const mongoClient = await mongodbConnection();
    
    collection = mongoClient.db().collection("post");
    console.log("Connected to MongoDB");
})

