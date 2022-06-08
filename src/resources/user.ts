import { Request, Response } from "express";
import User from '../../models/user';

//Response
export type SignupLoginResponse = Response<{
    message: string,
    token?: string,
    user?: User
}>

export type forgotPasswordAndOTPResponse = Response<{
    message: string,
    otpCode?: string | number,
}>


//Request
export type SignupRequest = Request<{}, {}, {
    email: string,
    phone: string,
    password: string,
    firstName: string,
    lastName: string, 
}>

export type LoginRequest = Request<{}, {}, {
    email: string,
    password: string,
}>

export type forgotPasswordOTPRequest = Request<{}, {}, {
    email: string,
}>

export type forgotPasswordRequest = Request<{}, {}, {
    email: string,
    otpCode?: string | number,
    password: string,
}>