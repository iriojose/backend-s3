import { Request, Response } from "express";
import User from '../../models/user';
import File from '../../models/file';

//Response
export type UploadFileAndUrlResponse = Response<{
    message?: string,
    file?: File,
}>

export type DownloadFileResponse = Response<{
    message?: string,
    data?: File,
    file?: Object
}>

export type GetAllResponse = Response<{
    message?: string,
    files?: File[],
}>

export type SearchResponse = Response<{
    message?: string,
    data?: any
}>

//Request
export type DownloadFileRequest = Request<{}, {}, {
    id: string | number,
}>

export type GetAllRequest = Request<{}, {
    fileName?: string,
}>

export type SearchRequest = Request<{}, {
    query: string,
}>