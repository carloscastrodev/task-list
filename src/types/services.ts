import { AxiosError } from 'axios';

export type ServiceError = AxiosError<{ message: string }>;
