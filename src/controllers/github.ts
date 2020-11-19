import { Request, Response, NextFunction } from 'express';
import { axiosJson, setAuthToken } from '../config/axios';
import asyncHandler from 'express-async-handler';
import {
  AuthRequest,
  AuthResponse,
  TransferRequest,
  TransferResponse,
  Issue,
  GetReposResponse,
  Repo,
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

export const getRepos = asyncHandler(
  async (req: Request, res: Response<GetReposResponse>, next: NextFunction) => {
    const { reposURL, reposCount } = req.query;

    if (!reposURL || !reposCount) {
      return next(
        new ErrorResponse(
          'Please specify reposURL and reposCount in query params',
          400
        )
      );
    }

    const reposPerPage = 100;
    const sortBy = 'created_at';

    const baseURL = `${reposURL}?per_page=${reposPerPage}&sort=${sortBy}`;

    const parsedReposCount = parseInt(reposCount as string);

    if (parsedReposCount <= reposPerPage) {
      const { data } = await axiosJson.get<Repo[]>(baseURL);

      return res.status(200).json({
        success: true,
        message: `Repos successfully fetched from ${reposURL}`,
        data,
        count: data.length,
      });
    }

    const pagesCount = Math.ceil(parsedReposCount / reposPerPage);
    const pages = Array.from({ length: pagesCount }, (v, k) => k + 1);

    const promiseArr = pages.map(async (page) =>
      axiosJson.get<Repo[]>(`${baseURL}&page=${page}`)
    );

    const data: Repo[] = [];

    const responseArr = await Promise.all(promiseArr);
    responseArr.forEach((resp) => data.push(...resp.data));

    return res.status(200).json({
      success: true,
      message: `Repos successfully fetched from ${reposURL}`,
      data,
      count: data.length,
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
