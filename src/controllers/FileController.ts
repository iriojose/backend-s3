import s3Service from '../utils/s3';
import searchImages from '../utils/unplas';
import File from '../../models/file';
import User from '../../models/user';
import Sequelize from "sequelize";
import {
    UploadFileAndUrlResponse, 
    DownloadFileResponse,
    DownloadFileRequest,
    GetAllRequest,
    GetAllResponse,
    SearchRequest,
    SearchResponse
} from '../resources/file';

const FileController = () => {
    const UploadFile = async(req:any, res:UploadFileAndUrlResponse) => {
        const files = req.files;
        const userId:any = req.header.Authorization

        try {
            const response = await s3Service().uploadToS3(files.file);

            if(response.data) {
                const data:any = {
                    fileName: response.data.Key,
                    url: response.data.Location,
                    userId: userId.id
                }

                let file: File = await File.create(data);
                return res.status(200).json({file});
            }
            
            return res.status(400).json({ message: "Bad request" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    const DownloadFile = async(req:DownloadFileRequest,res:DownloadFileResponse ) => {
        const { body } = req;

        try {
            const file: File | null = await File.findOne({
                where: {
                  id: body.id
                }
            });

            if(file !== null) {
                const response = await s3Service().downloadToS3(file.fileName as string)
                return res.status(200).json({data:file, file: response});
            }
            
            return res.status(404).json({message:"File not found"});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }

    }

    const UploadFileToS3WithUrl = async(req:any,res:UploadFileAndUrlResponse) => {
        const { body } = req;
        const userId:any = req.header.Authorization;

        try {
            const response = await s3Service().uploadFileToS3WithUrl(body.url,body.fileName);

            if(response) {
                const data:any = {
                    fileName: response.Key,
                    url: response.Location,
                    userId: userId.id
                }

                let file: File = await File.create(data);
                return res.status(200).json({file});
            }
            
            return res.status(400).json({ message: "Bad request" });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    const GetAllFiles = async(req:GetAllRequest,res:GetAllResponse) => {
        const { fileName } = req.query;

        try {
            let query:any = {}

            if(fileName) {
                query = {
                    fileName: {
                        [Sequelize.Op.like]: `%${fileName}%`
                    }
                }
            }

            let files: File[] = await File.findAll({
                where: query,
                include: [
                    {
                        model: User
                    }
                ]
            });

            return res.status(200).json({files});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    const SearchImageByUnplash = async(req:SearchRequest,res:SearchResponse) => {
        const { query } = req.query;
        try {
            if(query) {
                const response = await searchImages(query as string) ;
                return res.status(200).json({data:response});
            }
            
            return res.status(400).json({message:"query is required"});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    return {
        UploadFile,
        DownloadFile,
        UploadFileToS3WithUrl,
        GetAllFiles,
        SearchImageByUnplash
    }
}

export default FileController;