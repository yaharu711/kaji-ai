import { Crown, User } from "lucide-react";
import type { AppSessionUser } from "@kaiji-ai/backend/contracts";
import ActionLink from "../ActionLink";
import UserProfileImg from "../UserProfileImg";
import styles from "./UserPopoverContent.module.css";

export interface GroupMember {
  id: string;
  name: string | null;
  image_url: string | null;
  is_owner: boolean;
  is_invited: boolean;
}

interface UserPopoverContentProps {
  groupName: string;
  currentUser: AppSessionUser;
  members: GroupMember[];
}

function UserPopoverContent({ groupName, currentUser, members }: UserPopoverContentProps) {
  return (
    <div className={styles.userPopoverContent}>
      <div className={styles.userPopoverProfile}>
        <div className={styles.userPopoverProfileMain}>
          <UserProfileImg
            name={currentUser.name}
            imageUrl={currentUser.image}
            size="lg"
            tone="primary"
          />
          <div className={styles.userPopoverText}>
            <p className={styles.userPopoverName}>{currentUser.name ?? "未設定"}</p>
            <div className={styles.userPopoverStatus}>
              <span className={styles.userPopoverStatusDot} />
              ログイン中
            </div>
          </div>
        </div>
        {currentUser.id ? (
          <ActionLink
            to={`/users/${currentUser.id}`}
            icon={<User size={18} />}
            pageName="プロフィール"
          />
        ) : null}
      </div>
      <div className={styles.userPopoverBody}>
        <p className={styles.userPopoverSection}>{`${groupName}のメンバー`}</p>
        <ul className={styles.userPopoverMembers}>
          {members.map((member) => {
            const isOwner = member.is_owner;
            return (
              <li
                key={member.id}
                className={[styles.userPopoverMember, isOwner ? styles.userPopoverMemberOwner : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <UserProfileImg
                  name={member.name}
                  imageUrl={member.image_url}
                  size="md"
                  tone="purple"
                  badge={
                    isOwner ? (
                      <span className={styles.userPopoverMemberCrown} aria-hidden="true">
                        <Crown size={12} />
                      </span>
                    ) : null
                  }
                />
                <div className={styles.userPopoverMemberInfo}>
                  <div className={styles.userPopoverMemberHeading}>
                    <span className={styles.userPopoverMemberName}>{member.name ?? "未設定"}</span>
                    {isOwner ? (
                      <span className={styles.userPopoverMemberRole}>オーナー</span>
                    ) : null}
                  </div>
                  {member.is_invited ? (
                    <div className={styles.userPopoverMemberStatus}>
                      <span className={styles.userPopoverMemberStatusDot} />
                      招待中
                    </div>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default UserPopoverContent;
