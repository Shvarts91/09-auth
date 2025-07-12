import Link from 'next/link';
import css from './Profile.module.css';

import { Metadata } from 'next';
import { getServerMe } from '@/lib/api/serverApi';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'profile page',
};

const Profile = async () => {
  const user = await getServerMe();

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt={user.username ?? ''}
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;
