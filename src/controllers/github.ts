import { RequestHandler, Request, Response, NextFunction } from 'express';
import axios from 'axios';
import asyncHandler from 'express-async-handler';
import { ErrorResponse } from '../utils/ErrorResponse';

interface RequestBody {
  code: string;
}

interface ResponseBody {
  success: boolean;
  message: string;
  token?: string;
}

export const authenticate: RequestHandler = asyncHandler(
  async (
    req: Request<{}, {}, RequestBody>,
    res: Response<ResponseBody>,
    next: NextFunction
  ) => {
    const { code } = req.body;
    console.log(code);

    if (!code) {
      return next(
        new ErrorResponse('No github authentication code provided', 400)
      );
    }

    const githubResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const token: string = githubResponse.data.access_token;

    if (!token) {
      return next(new ErrorResponse('Github authentication failed', 403));
    }

    return res.status(200).json({
      success: true,
      message: 'Github authentication success!',
      token: githubResponse.data.access_token,
    });
  }
);
