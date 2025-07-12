import css from './EditProfilePage.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit Profile',
  description: 'Edit profile page',
};
const EditProfilePage = () => {
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <form className={css.profileInfo}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input id="username" type="text" className={css.input} />
          </div>

          <p>Email: user_email@example.com</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default EditProfilePage;
