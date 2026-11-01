import bcrypt from "bcryptjs";
import jwt, {
  type JwtPayload,
  type SignOptions,
} from "jsonwebtoken";

import {
  createUser,
  findUserByEmail,
  findUserById,
  toPublicUser,
  type PublicUser,
} from "./databaseService";

const SALT_ROUNDS = 12;

export interface AuthenticatedUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
}

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length < 32) {
    throw new Error(
      "JWT_SECRET must contain at least 32 characters."
    );
  }

  return secret;
}

export async function registerUser(
  name: string,
  email: string,
  password: string
): Promise<PublicUser> {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedName.length < 2 || normalizedName.length > 80) {
    throw new Error("Name must contain between 2 and 80 characters.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Please provide a valid email address.");
  }

  if (password.length < 8 || password.length > 72) {
    throw new Error(
      "Password must contain between 8 and 72 characters."
    );
  }

  if (findUserByEmail(normalizedEmail)) {
    throw new Error("An account with this email already exists.");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  // Public registration can only create standard users.
  return createUser(
    normalizedName,
    normalizedEmail,
    passwordHash,
    "user"
  );
}

export async function loginUser(
  email: string,
  password: string
): Promise<PublicUser | null> {
  const user = findUserByEmail(email.trim().toLowerCase());

  if (!user) {
    return null;
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password_hash
  );

  if (!passwordMatches) {
    return null;
  }

  return toPublicUser(user);
}

export function generateAuthToken(
  user: AuthenticatedUser
): string {
  const expiresIn = (
    process.env.JWT_EXPIRES_IN || "1d"
  ) as SignOptions["expiresIn"];

  return jwt.sign(
    {
      sub: String(user.id),
      role: user.role,
    },
    getJwtSecret(),
    { expiresIn }
  );
}

export function verifyAuthToken(
  token: string
): AuthenticatedUser {
  const decoded = jwt.verify(
    token,
    getJwtSecret()
  ) as JwtPayload;

  if (
    typeof decoded.sub !== "string" ||
    !/^\d+$/.test(decoded.sub)
  ) {
    throw new Error("Invalid authentication token.");
  }

  const user = findUserById(Number(decoded.sub));

  if (!user) {
    throw new Error("User account no longer exists.");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}