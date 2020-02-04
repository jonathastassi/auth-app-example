import { User } from './user';

export interface AuthInfo {
    authenticate: boolean;
    user: User;
    token: string;
}
