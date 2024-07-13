import { useContext } from 'react';

import { AuthContext } from '@/contexts/auth-context';

import type { AuthContextInterface } from '../common/types';

export const useAuth = (): AuthContextInterface => useContext(AuthContext);
