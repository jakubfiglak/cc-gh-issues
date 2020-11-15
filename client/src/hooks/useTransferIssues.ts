import { axiosJson } from '../config/axios';
import { useMutation } from 'react-query';
import { TransferIssuesFormData } from '../types/transferIssues';

export const useTransferIssues = async (data: TransferIssuesFormData) => {
  console.log(data);
};
