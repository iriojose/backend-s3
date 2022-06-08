import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
    tableName: "Users"
})

class Users extends Model<Users> {
    @Column(DataType.STRING)
    email: String;
  
    @Column(DataType.STRING)
    password: String;
  
    @Column(DataType.STRING)
    phone: String;
  
    @Column(DataType.STRING)
    firstName: String;
  
    @Column(DataType.STRING)
    lastName: String;    

    @Column(DataType.STRING)
    otpCode: Number | null;   
};
  
  export default Users;