var files = [];

export default({
  addFileToFiles(items){
    [].forEach.call(items, function (item) {
      files.push(item);
    });
  },
  addFile(item){
    files.push(item);
  },
  getFiles(){
    return files;
  }
})