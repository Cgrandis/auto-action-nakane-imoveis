// import jwt from 'jsonwebtoken';
// import { UserPayload } from './useUser';

// export function getUserFromToken(token?: string): UserPayload | null {
//   if (!token) return null;

//   try {
//     const payload = jwt.decode(token);
//     if (!payload || typeof payload !== 'object') return null;

//     const { nome, email, slug } = payload as UserPayload;

//     if (!nome || !email || !slug) return null;

//     return { nome, email, slug };
//   } catch {
//     return null;
//   }
// }
