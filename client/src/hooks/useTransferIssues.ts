import { axiosJson } from '../config/axios';
import { useMutation } from 'react-query';
import { TransferIssuesFormData } from '../types/transferIssues';

type Issue = {
  title: string;
  body: string;
};

export const useTransferIssues = async (data: TransferIssuesFormData) => {
  const res = await axiosJson.get(data.fromRepo);
  console.log(res.data);
  // title body
  res.data.forEach(async (issue: Issue) => {
    try {
      await axiosJson.post(data.toRepo, {
        title: issue.title,
        body: issue.body,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  });
};
