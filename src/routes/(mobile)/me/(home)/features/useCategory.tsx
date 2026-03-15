import {
  CircleUserRound,
  FileClockIcon,
  Settings2,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { type CellProps } from '@/components/Cell';
import { useUserStore } from '@/store/user';
import { authSelectors } from '@/store/user/selectors';

export const useCategory = (onOpenChangelogModal: () => void) => {
  const navigate = useNavigate();
  const { t } = useTranslation(['common', 'setting', 'auth']);
  const [isLoginWithAuth] = useUserStore((s) => [authSelectors.isLoginWithAuth(s)]);

  const profile: CellProps[] = [
    {
      icon: CircleUserRound,
      key: 'profile',
      label: t('userPanel.profile'),
      onClick: () => navigate('/me/profile'),
    },
  ];

  const settings: CellProps[] = [
    {
      icon: Settings2,
      key: 'setting',
      label: t('userPanel.setting'),
      onClick: () => navigate('/me/settings'),
    },
    {
      type: 'divider',
    },
  ];

  const helps: CellProps[] = [
    {
      icon: FileClockIcon,
      key: 'changelog',
      label: t('changelog'),
      onClick: onOpenChangelogModal,
    },
  ];

  const mainItems = [
    {
      type: 'divider',
    },
    ...(isLoginWithAuth ? profile : []),
    ...(isLoginWithAuth ? settings : []),
    ...helps,
  ].filter(Boolean) as CellProps[];

  return mainItems;
};
