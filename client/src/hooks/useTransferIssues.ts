import { useMutation } from 'react-query';
import { axiosJson } from '../config/axios';
import { useAlertsState } from './useAlertsState';
import { TransferIssuesFormData } from '../types/transferIssues';

interface ReqError {
  response: {
    data: {
      code: number;
      error: string;
    };
  };
}

export const useTransferIssues = () => {
  const { setAlert } = useAlertsState();

  return useMutation(
    (values: TransferIssuesFormData) =>
      axiosJson.post('/github/transferissues', values),
    {
      onSuccess: (data) => setAlert(data.data.message, 'success'),
      onError: (error: ReqError) =>
        setAlert(error.response.data.error, 'error'),
    }
  );
};
