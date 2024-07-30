const DB=[];

function saveDB(user){
    const oldDBsize = DB.length+1;
    DB.push(user);
    console.log(`save ${user.name} to DB`);
    return new Promise((resolve, reject) => {
        if (DB.length > oldDBsize) resolve(user);
        else reject(new Error("saveDB failed"));
    });
}

function sendEmail(user){
    console.log(`send email to ${user.name}`);
    return new Promise((resolve) => {
        resolve(user);
    });
}

function getResult(user){
    return new Promise((resolve) => {
        resolve(`register ${user.name} success`);
    }
); 
}

function registerByPromise(user){
    const result = saveDB(user).then(sendEmail).then(getResult).catch(error => new Error(error));
    console.log(result);
    return result;
}

const myUser = {email: "asdf@asd.com", password: "1234", name: "asdf"};
allResult = Promise.all([saveDB(myUser), sendEmail(myUser), getResult(myUser)]);
const reslut = registerByPromise(myUser);
// reslut.then(console.log)
allResult.then(console.log);