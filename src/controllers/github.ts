import { Request, Response, NextFunction } from 'express';
import { axiosJson, setAuthToken } from '../config/axios';
import asyncHandler from 'express-async-handler';
import {
  AuthRequest,
  AuthResponse,
  TransferRequest,
  TransferResponse,
  Issue,
} from './types';
import { ErrorResponse } from '../utils/ErrorResponse';

export const authenticate = asyncHandler(
  async (
    req: Request<{}, {}, AuthRequest>,
    res: Response<AuthResponse>,
    next: NextFunction
  ) => {
    const { code } = req.body;
    console.log(code);

    if (!code) {
      return next(
        new ErrorResponse('No github authentication code provided', 400)
      );
    }

    const githubResponse = await axiosJson.post<{ access_token: string }>(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code,
      }
    );

    const token: string = githubResponse.data.access_token;

    if (!token) {
      return next(new ErrorResponse('Github authentication failed', 403));
    }

    setAuthToken(token);

    return res.status(200).json({
      success: true,
      message: 'Github authentication success!',
      token: githubResponse.data.access_token,
    });
  }
);

export const transferIssues = asyncHandler(
  async (
    req: Request<{}, {}, TransferRequest>,
    res: Response<TransferResponse>,
    next: NextFunction
  ) => {
    const { baseRepoURL, targetRepoURL } = req.body;

    const baseRepoName = baseRepoURL.split('/')[5];
    const targetRepoName = targetRepoURL.split('/')[5];

    const { data: issuesToTransfer } = await axiosJson.get<Issue[]>(
      baseRepoURL
    );

    if (issuesToTransfer.length === 0) {
      return next(
        new ErrorResponse(
          `There are no issues to transfer from ${baseRepoName}`,
          400
        )
      );
    }

    const promiseArr = issuesToTransfer.map(async (issue) => {
      const { title, body } = issue;
      return axiosJson.post(targetRepoURL, { title, body });
    });

    await Promise.all(promiseArr);

    return res.status(200).json({
      success: true,
      message: `Issues successfully transfered from ${baseRepoName} to ${targetRepoName}`,
    });
  }
);
