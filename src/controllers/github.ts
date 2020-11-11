import { Request, Response } from 'express';
import axios from 'axios';

interface RequestBody {
  code: string;
}

interface ResponseBody {
  success: boolean;
  message: string;
  token?: string;
}

export const authenticate = async (
  req: Request<{}, {}, RequestBody>,
  res: Response<ResponseBody>
) => {
  const { code } = req.body;

  if (!code) {
    return res.json({
      success: false,
      message: 'Error: no code',
    });
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

  return res.status(200).json({
    success: true,
    message: 'Github authentication success!',
    token: githubResponse.data.access_token,
  });
};
