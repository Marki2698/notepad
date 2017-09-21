const fs = require('fs');
const additional = require('./db_queries');
const folder_path = './files/';

/*function Create(value, name, clientFolder) {
    //console.log(name, clientFolder);
    let val = value || "";
    let path = folder_path + clientFolder + '/' + name;
    fs.open(path, 'w+', (err, fd) => {
        //console.log(path + " is path");
        if (err) {
            if (err.code == "EEXIST") {
                console.error(err.message);
                WriteData(value, path);
            }
            if (err.code == "EISDIR") {
                //let correct_path = folder_path + clientFolder + '/' + name;
                console.log("path is to folder.");
            }
            console.error(err);
        } else if (val !== "") {
            WriteData(val, path);
        } else {
            console.log("created in panel.");
        }
    });
    //console.log(path + " is correct path");
    return path;
}*/

function Create(name, clientFolder, value) {
    let response = {
        path: "",
        msg: ""
    };
    let path = folder_path + clientFolder + '/' + name;
    //console.log(path);
    return new Promise(function(resolve, reject) {
        fs.open(path, 'wx', (err, fd) => {
            if (err) {
                if (err.code == "EEXIST") {
                    console.log("file exists");
                    if (value == undefined) {
                        response.path = path;
                        response.msg = "file already exists";
                        resolve(response);
                    } else {
                        console.error(err.message + " it's okay.");
                        WriteData(value, path);
                    }
                } else {
                    reject(err);
                }
            } else if (value == undefined) {
                response.path = path;
                response.msg = "file : " + name + " created successfully!";
                resolve(response);
            } else {
                WriteData(value, path);
                response.path = path;
                response.msg = name;
                resolve(response);
            }
        });
    });
}

function WriteData(value, path) {
    let formated_value = `` + value + ``;
    fs.writeFile(path, formated_value, (err) => {
        if (err) console.error(err.message);
        console.log('recorded.');
    });
}

function RemoveFile(folder, file) {
    let path = `${folder_path}${folder}/${file}`;
    return new Promise(function(resolve, reject) {
        fs.unlink(path, (err) => {
            if (err) reject(err);
            resolve(`removed ${file}`);
        });
    });
}

function CreateDir(folder) {
    let path = './files/' + folder + '/';
    fs.mkdir(path, (err) => {
        if (err) {
            if (err.code == "EEXIST") console.log('directory exists');
        }
        console.log('created : ' + folder);
    });
}

function GetList(base_folder) {
    let path = './files/' + base_folder;
    let docs;
    return new Promise(function(resolve, reject) {
        fs.readdir(path, (err, files) => {
            if (err) {
                reject(err);
            } else {
                if (!files) {
                    console.log("directory not exist");
                } else {
                    resolve([files, path]);
                }
            }
        });
    });
}

function GetUserFile(filename, folder) {
    let path = `${folder_path}${folder}/${filename}`;
    return new Promise(function(resolve, reject) {
        fs.readFile(path, "utf-8", (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function RenameFile(old_name, new_name, folder) {
    let old_path = `${folder_path}${folder}/${old_name}`;
    let new_path = `${folder_path}${folder}/${new_name}`;
    return new Promise(function(resolve, reject) {
        fs.rename(old_path, new_path, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve("renamed successfully");
            }
        });
    });
}

exports.Create = Create;
exports.RemoveFile = RemoveFile;
exports.CreateDir = CreateDir;
exports.GetList = GetList;
exports.GetUserFile = GetUserFile;
exports.RenameFile = RenameFile;