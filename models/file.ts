import { Table, Column, Model, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript';
import User from './user';

@Table({
    tableName: "Files"
})

class Files extends Model<Files> {
    @Column(DataType.STRING)
    fileName: String;
  
    @Column(DataType.STRING)
    url: String;   

    @ForeignKey(() => User)
    @Column(DataType.INTEGER)
    userId: Number;

    @BelongsTo(() => User, "userId")
    User: User;
};
  
export default Files;