export interface UserRegisterPayload {
    name: string,
    email: string,
    password: string,
    profileImage?:string
    bio?: string
}
export interface ILoginUserPayload {
    email: string,
    password: string
}