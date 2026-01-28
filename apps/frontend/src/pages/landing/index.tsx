import { Link } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Heart,
  MessageCircle,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";

import styles from "./landing.module.css";

const concepts: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Heart,
    title: "感謝の可視化",
    description: "誰が、いつ、どの家事をやったのかを可視化。感謝の気持ちを伝えやすくします。",
  },
  {
    icon: Users,
    title: "みんなで協力",
    description:
      "数値化せず、実際に家事を討伐した人もそれに感謝した人も見える化。みんなで家事に取り組めます。",
  },
  {
    icon: Sparkles,
    title: "モチベーション維持",
    description:
      "家事をする人がモチベーションを保ち、感謝する人が感謝したいと思える機能とUXを提供します。",
  },
];

const features: {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
}[] = [
  {
    icon: Clock,
    title: "家事の討伐タイムライン機能",
    description:
      "いつ、誰が、どの家事を討伐したのか1日ごとに見える化できます。過去のタイムラインも遡れるので、振り返りもバッチリ！",
    tag: "推し機能",
  },
  {
    icon: MessageCircle,
    title: "感謝を伝えられる機能",
    description:
      "日頃の照れ臭くて伝えにくい感謝の気持ちを伝えるために、テンプレートメッセージも用意。自分でメッセージを丁寧に送ることもできます。討伐したユーザー自身もコメント可能！",
    tag: "推し機能",
  },
  {
    icon: BarChart3,
    title: "AIからの一週間の討伐状況レポート機能",
    description:
      "AIがあなたのグループの一週間の家事討伐状況を分析してレポートを作成。より良い家事分担のヒントが得られます。",
    tag: "Coming Soon",
  },
];

const screenshots = [
  {
    title: "討伐タイムライン",
    description: "家事の討伐履歴を一目で確認",
  },
  {
    title: "感謝を伝える",
    description: "テンプレートで簡単に感謝を伝えられる",
  },
  {
    title: "グループ管理",
    description: "家族やルームメイトとグループを作成",
  },
];

function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}>
            <div className={styles.brandIcon}>
              <Heart className={styles.brandIconSvg} />
            </div>
            <span className={styles.brandText}>カジアイ</span>
          </div>
          <Link className={styles.headerCta} to="/login">
            アプリを始める
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <section className={`${styles.section} ${styles.hero}`}>
          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroContent}>
                <div className={styles.heroBadge}>
                  <Sparkles className={styles.heroBadgeIcon} />
                  <span>協力と感謝が生まれる家事管理アプリ</span>
                </div>
                <h1 className={styles.heroTitle}>
                  家事を討伐して、
                  <br />
                  <span className={styles.gradientText}>感謝を伝え合おう</span>
                </h1>
                <p className={styles.heroDescription}>
                  カジアイは、グループでみんなで家事を討伐し、感謝を伝え合い、協力して家事を楽しくこなしていくためのアプリです。
                </p>
                <div className={styles.heroActions}>
                  <Link className={styles.primaryButton} to="/login">
                    無料で始める
                  </Link>
                  <a className={styles.secondaryButton} href="#features">
                    詳しく見る
                  </a>
                </div>
              </div>
              <div className={styles.heroVisual}>
                <div className={styles.heroGlow} />
                <div className={styles.heroCard}>
                  <img
                    className={styles.heroImage}
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=700&h=900&fit=crop"
                    alt="カジアイアプリのイメージ"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.gradientText}>カジアイのコンセプト</span>
              </h2>
              <p className={styles.sectionLead}>
                誰か一人が家事をするかもしれない、けど感謝することは必ずできるはず。
                <br />
                だからこそ、協力と感謝が生まれる仕組みを作りました。
              </p>
            </div>
            <div className={styles.conceptGrid}>
              {concepts.map((concept) => {
                const Icon = concept.icon;
                return (
                  <div key={concept.title} className={styles.card}>
                    <div className={styles.cardIcon}>
                      <Icon className={styles.cardIconSvg} />
                    </div>
                    <h3 className={styles.cardTitle}>{concept.title}</h3>
                    <p className={styles.cardDescription}>{concept.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.section} id="features">
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.gradientText}>主な機能</span>
              </h2>
              <p className={styles.sectionLead}>家事を楽しく、感謝を簡単に</p>
            </div>
            <div className={styles.featureList}>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                const isReversed = index % 2 === 1;
                return (
                  <div
                    key={feature.title}
                    className={`${styles.featureRow} ${isReversed ? styles.featureRowReverse : ""}`}
                  >
                    <div className={styles.featureContent}>
                      <div className={styles.featureTag}>{feature.tag}</div>
                      <h3 className={styles.featureTitle}>{feature.title}</h3>
                      <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                    <div className={styles.featureVisual}>
                      <div className={styles.featureGlow} />
                      <div className={styles.featureIconFrame}>
                        <Icon className={styles.featureIcon} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionMuted}`}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.gradientText}>アプリの画面</span>
              </h2>
              <p className={styles.sectionLead}>シンプルで使いやすいデザイン</p>
            </div>
            <div className={styles.screenshotGrid}>
              {screenshots.map((screenshot) => (
                <div key={screenshot.title} className={styles.screenshotCard}>
                  <div className={styles.screenshotFrame}>
                    <img
                      className={styles.screenshotImage}
                      src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=700&fit=crop&q=80"
                      alt={screenshot.title}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.screenshotCaption}>
                    <h3 className={styles.screenshotTitle}>{screenshot.title}</h3>
                    <p className={styles.screenshotDescription}>{screenshot.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaBox}>
              <div className={styles.ctaContent}>
                <h2 className={styles.ctaTitle}>さあ、家事を討伐しよう！</h2>
                <p className={styles.ctaDescription}>
                  今すぐカジアイを始めて、家事をもっと楽しく、感謝を伝え合える毎日を。
                </p>
                <Link className={styles.ctaButton} to="/login">
                  無料で始める
                  <ArrowRight className={styles.ctaButtonIcon} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerContent}>
            <div className={styles.brandCompact}>
              <div className={styles.brandIconSmall}>
                <Heart className={styles.brandIconSvg} />
              </div>
              <span className={styles.brandTextSmall}>カジアイ</span>
            </div>
            <p className={styles.footerLead}>協力と感謝が生まれる家事管理アプリ</p>
            <p className={styles.footerCopy}>© 2026 カジアイ. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
