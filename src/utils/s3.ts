import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
import axios from 'axios';

const BUCKET_NAME = process.env.BUCKET;
const KEY = process.env.KEY;
const SECRET = process.env.SECRET;

const s3bucket = new AWS.S3({
  accessKeyId: KEY,
  secretAccessKey: SECRET
});

const s3Service = () => {
	const uploadToS3 = async (fileData: any) => {
		try {
		  const params:any = {
			Bucket: BUCKET_NAME,
			Key: fileData.name,
			Body: fileData.data
		  };
		  
		  try {
			const res = await s3bucket.upload(params).promise();
	
			return { message: "File Uploaded with Successfull", data: res};
		  } catch (error) {
			console.log(error);
			return { message: "Unable to Upload the file"};
		  }
		} catch (error) {
			console.log(error);
			  return {message: "Unalbe to access this file"};
		}
	};

	const downloadToS3 = async(fileName:string) => {
		try {
			var options:any = {
				Bucket: BUCKET_NAME,
				Key: fileName
			};
	
			const file = s3bucket.getObject(options).createReadStream();
			return {success:true, file:file}
		}catch (error) {
		  return {success:false, message: "Unalbe to access this file"};
		}
	};

	const uploadFileToS3WithUrl = async(url:string, fileName:string) => {
		return await axios.get(url, { responseType: "arraybuffer", responseEncoding: "binary" }).then((response) => {
			const params = {
				ContentType: response.headers["content-type"],
				ContentLength: response.data.length.toString(), // or response.header["content-length"] if available for the type of file downloaded
				Bucket: BUCKET_NAME as string,
				Body: response.data,
				Key: fileName,
			};
	
		  return s3bucket.upload(params).promise();
		});
	}

	return {
		uploadFileToS3WithUrl,
		downloadToS3,
		uploadToS3
	}
}

export default s3Service;