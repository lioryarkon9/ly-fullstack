import { QueryClient } from 'react-query';
import { cache } from 'react';

export const getQueryClient = cache(() => new QueryClient());
