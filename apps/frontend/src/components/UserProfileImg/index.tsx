import { useState, type ReactNode } from "react";
import styles from "./UserProfileImg.module.css";

const SIZE_CLASS = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
} as const;

const TONE_CLASS = {
  primary: styles.tonePrimary,
  pink: styles.tonePink,
  purple: styles.tonePurple,
  orange: styles.toneOrange,
} as const;

type Size = keyof typeof SIZE_CLASS;
type Tone = keyof typeof TONE_CLASS;

interface UserProfileImgProps {
  name?: string | null;
  imageUrl?: string | null;
  size?: Size;
  tone?: Tone;
  alt?: string;
  badge?: ReactNode;
}

const getMemberInitial = (name?: string | null) => {
  const trimmed = name?.trim();
  return trimmed ? trimmed.charAt(0) : "?";
};

function UserProfileImg({
  name,
  imageUrl,
  size = "md",
  tone = "primary",
  alt,
  badge,
}: UserProfileImgProps) {
  const className = [styles.root, SIZE_CLASS[size], TONE_CLASS[tone]].join(" ");
  const resolvedAlt = alt ?? (name?.trim() ? `${name}のアイコン` : "ユーザーのアイコン");
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null);
  const hasImageError = imageUrl ? failedImageUrl === imageUrl : false;

  return (
    <span className={className} data-user-profile-img>
      {imageUrl && !hasImageError ? (
        <img
          src={imageUrl}
          alt={resolvedAlt}
          onError={() => {
            setFailedImageUrl(imageUrl);
          }}
        />
      ) : (
        getMemberInitial(name)
      )}
      {badge}
    </span>
  );
}

export default UserProfileImg;
