import React from 'react';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import {
  Button,
  Typography,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { QueryStatus } from 'react-query';
import { RepoSelect } from '../components/RepoSelect';
import { Loader } from '../components/Loader';
import { useAuthenticatedUser } from '../hooks/useAuthenticatedUser';
import { useRepos } from '../hooks/useRepos';
import { useTransferIssues } from '../hooks/useTransferIssues';
import { TransferIssuesFormData } from '../types/transferIssues';

const initialValues: TransferIssuesFormData = {
  baseRepoURL: '',
  targetRepoURL: '',
};

const validationSchema: yup.ObjectSchema<TransferIssuesFormData> = yup
  .object({
    baseRepoURL: yup.string().required('Please select a base repo'),
    targetRepoURL: yup
      .string()
      .notOneOf(
        [yup.ref('baseRepoURL')],
        'Cannot transfer issues to the same repo, please select another repo'
      )
      .required('Please select a target repo'),
  })
  .defined();

export const TransferIssues = () => {
  const classes = useStyles();
  const user = useAuthenticatedUser();

  const { data, status } = useRepos(user.repos_url, user.public_repos);
  const [transferIssues] = useTransferIssues();
  const { Loading, Error } = QueryStatus;

  if (status === Loading) {
    return <Loader />;
  }

  if (status === Error) {
    return (
      <Typography variant="body1" color="error">
        Sorry, something went wrong when fetching repos
      </Typography>
    );
  }

  return (
    <>
      <Typography variant="h5" align="center">
        Transfer issues
      </Typography>
      {data && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => transferIssues(values)}
        >
          {({ handleSubmit, isSubmitting, resetForm }) => (
            <Form className={classes.container} onSubmit={handleSubmit}>
              <RepoSelect name="baseRepoURL" label="Base repo" repos={data} />
              <RepoSelect
                name="targetRepoURL"
                label="Target repo"
                repos={data}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Transfer Issues
              </Button>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: `${theme.spacing(2)}px`,
      width: '100%',
      maxWidth: 500,
    },
  })
);
