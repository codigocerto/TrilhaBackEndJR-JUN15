export const jwtConstants = {
  secret: process.env.SECRET_KEY || 'batata',
  expiresToken: 60 * 60,
};
