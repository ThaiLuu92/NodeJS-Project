import jwt from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET_ASSET_KEY = process.env.JWT_SECRET_ASSET_KEY;
const JWT_SECRET_REFRESH_KEY = process.env.JWT_SECRET_REFRESH_KEY;

// export function createJwtToken(data) {
//   const secretKey = JWT_SECRET_KEY;
//   const expiresIn = "1h";
//   const token = jwt.sign({ data }, secretKey, { expiresIn });
//   return token;
// }

export function verifyJwtToken(token, key) {
  try {
    const verifiedToken = jwt.verify(token, key);
    return verifiedToken;
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return null;
  }
}

export function createAssetToken(data) {
  const secretKey = JWT_SECRET_ASSET_KEY;
  const expiresIn = "24h";
  const assetToken = jwt.sign({ data }, secretKey, { expiresIn });
  return assetToken;
}

export function createRefreshToken(data) {
  const secretKey = JWT_SECRET_REFRESH_KEY;
  const expiresIn = "90d";
  const refreshToken = jwt.sign({ data }, secretKey, { expiresIn });
  return refreshToken;
}
