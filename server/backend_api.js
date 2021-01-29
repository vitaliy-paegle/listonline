const fs = require('fs');

const backendApi = {
    readFile: function (address) {
        return  new Promise((res,rej) => {fs.readFile(address, (err, data) => {err ? rej(err) : res(data)})})
        .then((data) => {return {successful: true, content: data.toString()}})
        .catch((err) => {return {successful: false, error: err}})
    },
    makeDir: function (address) {
        return  new Promise((res,rej) => {fs.mkdir(address, (err) => {err ? rej(err) : res()})})
        .then(() => {return {successful: true}})
        .catch((err) => {console.log(err); return {successful: false, error: err}})
    },
    removeDir: function (address) {
        return  new Promise((res,rej) => {fs.rmdir(address, (err) => {err ? rej(err) : res()})})
        .then(() => {return {successful: true}})
        .catch((err) => {return {successful: false, error: err}})
    },
    writeFile: function(address, content) {        
        return  new Promise((res,rej) => {fs.writeFile(address, content, (err) => {err ? rej(err) : res()})})
        .then(() => {return {successful: true}})
        .catch((err) => {return {successful: false, error: err}})
    },
    removeFile: function(address) {        
        return  new Promise((res,rej) => {fs.unlink(address, (err) => {err ? rej(err) : res()})})
        .then(() => {return {successful: true}})
        .catch((err) => {return {successful: false, error: err}})
    }
}
module.exports = backendApi