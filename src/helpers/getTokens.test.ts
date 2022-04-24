import { Request } from 'express';
import getTokens from './getTokens';

describe('getTokens', () => {
  it('should return an object with accessToken and refreshToken', () => {
    const req = <Request><unknown>{
      headers: {
        authorization: 'Bearer 1234567890',
        'x-refresh-token': '0987654321',
      },
    };
    const result = getTokens(req);
    expect(result).toEqual({
      accessToken: '1234567890',
      refreshToken: '0987654321',
    });
  });
});
