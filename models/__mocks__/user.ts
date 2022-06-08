import users from "../../src/tests/models_data/users";

const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();
const UserMock = dbMock.define('user', {});

UserMock.$queueResult([
  UserMock.build(users)
],{ wasCreated: true });

UserMock.$queryInterface.$useHandler(function(query:string, queryOptions:any, done:any) {
	if(query === "findOne"){
		if(queryOptions[0].where.id || queryOptions[0].where.email || queryOptions[0].where.phone || queryOptions[0].where.otpCode){
			return Promise.resolve(UserMock.build(users[0]));
		}else{
			return Promise.resolve(null);
		}
	}
});

export default UserMock;