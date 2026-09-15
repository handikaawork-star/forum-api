import AuthenticationTokenManager from '../../../Applications/security/AuthenticationTokenManager.js';
import AuthenticationError from '../../../Commons/exceptions/AuthenticationError.js';

const authenticate = (container) => async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new AuthenticationError('Missing authentication');
    }

    const token = authorization.slice('Bearer '.length);
    const authenticationTokenManager = container.getInstance(AuthenticationTokenManager.name);

    await authenticationTokenManager.verifyAccessToken(token);
    const { id, username } = await authenticationTokenManager.decodePayload(token);

    req.auth = { id, username };
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
