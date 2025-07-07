import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";

import { authOptions } from "@/lib/auth-options";

type CombineRequest = Request & NextApiRequest;
type CombineResponse = Response & NextApiResponse;

const handler = async (req: CombineRequest, res: CombineResponse) => {
  // For debugging purposes
  // const host = req.headers.get('x-forwarded-host')
  // const proto = req.headers.get('x-forwarded-proto')

  // const canonicalUrl = `${proto}://${host}${basePath}/api/auth`

  return await NextAuth(req, res, authOptions);
};

// const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };
