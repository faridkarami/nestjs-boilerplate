import { Injectable } from '@nestjs/common';

export interface IAuthResponse {
  token: string;
}

@Injectable()
export class AuthResponseService {
  async get(token: string): Promise<IAuthResponse> {
    return {
      token,
    };
  }
}
