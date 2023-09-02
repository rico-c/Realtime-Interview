import axios from 'axios';
import {judgeHost} from './api';

axios.defaults.withCredentials = false;

export const axiosJudge0Instance = axios.create({
  baseURL: judgeHost,
  headers: {
    'X-RapidAPI-Key': 'ec093d45demsh37d407e2ab0a137p1864f1jsndf875c3b4fd1',
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
  }
})