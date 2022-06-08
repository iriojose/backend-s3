import files from "../../src/tests/models_data/files";

const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const FilesMock = dbMock.define('file', {});

FilesMock.$queueResult([
  FilesMock.build(files)
],{ wasCreated: true });

FilesMock.$queryInterface.$useHandler(function(query:string, queryOptions:any, done:any) {
	if(query === "findOne"){
		if(queryOptions[0].where.id){
			return Promise.resolve(FilesMock.build(files[0]));
		}else{
			return Promise.resolve(null);
		}
	} else if(query === "findAll") {
        return Promise.resolve(FilesMock.build(files));
    }
});

export default FilesMock;