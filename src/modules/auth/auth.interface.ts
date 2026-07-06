export interface UserRegisterPayload {
    name: string,
    email: string,
    password: string,
    profileImage?:string
    bio?: string
}