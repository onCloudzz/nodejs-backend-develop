const DB = [];

function register(user){
    return saveDB(user, function (user){
        return sendEmail(user, function (user){
            return getResult(user);
        });
    });
}

function saveDB(user, callback){
    DB.push(user);
    console.log(`save ${user.name}DB`);
    return callback(user);
}

function sendEmail(user, callback){
    console.log(`send email to ${user.name}`);
    return callback(user);
}

function getResult(user){
    return `register ${user.name} success`;
}

const result = register({email: "abcd@abc.com", password: "1234", name: "abcd"});
console.log(result);