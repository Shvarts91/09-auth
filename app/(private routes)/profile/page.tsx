import Link from "next/link";
import css from "./Profile.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getServerMe } from "@/lib/api/serverApi";

export const metedata: Metadata = {
  title: "Profile",
  description: "profile page",
};

const Profile = async () => {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          {user.photoUrl && (
            <Image src={user.photoUrl} alt="Image" width={100} height={100} />
          )}
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.userName}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};
export default Profile;
