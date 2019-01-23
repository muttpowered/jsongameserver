/* tslint:disable */
export class LoginRequest {
    customId?: string;
}

export class LoginResponse {
    isNew: boolean;
    userId: number;
    token: string;
    expiresAt: number;
}

export abstract class IMutation {
    abstract login(input?: LoginRequest): LoginResponse | Promise<LoginResponse>;
}

export abstract class IQuery {
    abstract user(id: number): User | Promise<User>;

    abstract temp__(): boolean | Promise<boolean>;
}

export class User {
    id: number;
    name: string;
    gameData?: JSON;
}

export type JSON = any;
