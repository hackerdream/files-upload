var files = [];

function findIndexOfFile(id) {
  var index = 0;
  for (var i = 0; i < files.length; i++) {
    if (files[i].id == id) {
      index = i;
    }
  }
  return index;
}

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
  },
  deleteFileByIndex(id){
    var index = findIndexOfFile(id);
    files.splice(index,1);
  }
})