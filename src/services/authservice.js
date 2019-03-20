// @flow
import { Sentry } from 'react-native-sentry';
import RNRnmentoringprogramAsyncStorage from 'react-native-rnmentoringprogram-async-storage';

const AUTH_URL =
  'http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token';

export const sendAuthRequest = async (
  username: string,
  password: string,
  retryAction: Function,
  handleRequestSuccess: () => void,
  handleRequestError: (Error, Function) => void,
) => {
  try {
    //const response = await mockGetToken();
    const response = await getToken(username, password);
    const responseIsOk = response.ok;
    if (!responseIsOk) {
      return handleRequestError(new Error('Response is not ok.'), retryAction);
    }
    const token = await response.json();
    console.log('token: ', token);
    await saveLoginInfo(token, username, password);
    handleRequestSuccess();
  } catch (e) {
    Sentry.captureException(e);
    handleRequestError(e, retryAction);
  }
};

const saveLoginInfo = async (
  token: string,
  username: string,
  password: string,
) => {
  try {
    await Promise.all([
      RNRnmentoringprogramAsyncStorage.setItem('token', token),
      RNRnmentoringprogramAsyncStorage.setItem('username', username),
      RNRnmentoringprogramAsyncStorage.setItem('password', password),
    ]);
  } catch (error) {
    Sentry.captureException(error);
    console.log("Error - token wasn't saved: ", error);
  }
};

export const mockGetToken = async (): GetTokenResponseType => {
  return Promise.resolve({ ok: true, json: () => Promise.resolve('token') });
};

export const getToken = (
  username: string,
  password: string,
): GetTokenResponseType => {
  return fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

type GetTokenResponseType = Promise<{|
  ok: boolean,
  json: () => Promise<string>,
|}>;
