import { Metadata } from 'next';
import EditProfileClient from './EditProfile.client';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit profile page',
};

const EditProfilePage = () => {
  return <EditProfileClient />;
};

export default EditProfilePage;
