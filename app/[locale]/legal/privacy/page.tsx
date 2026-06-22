import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { DepthPageShell } from "@/components/seo/DepthPageShell";
import { getDictionary } from "@/lib/i18n/dictionary";
import { isLocale, locales, type Locale } from "@/lib/i18n/config";
import { localeAlternates, localeHref } from "@/lib/i18n/paths";
import { SITE_NAME } from "@/lib/seo";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const LAST_UPDATED = "2026-06-22";
const CONTACT_EMAIL = "contact@babyleveling.com";

const privacyCopy: Record<
  Locale,
  {
    intro: string;
    metadataDescription: string;
    asideTitle: string;
    aside: { title: string; copy: string }[];
    readLabel: string;
    contactLinkLabel: string;
    sections: { heading: string; body: string[] }[];
  }
> = {
  en: {
    intro:
      "BabyLeveling treats care logs as family records first. This policy explains what stays on your device, what the website collects, and how future sync or sharing features would work only if you choose them.",
    metadataDescription:
      "How BabyLeveling handles on-device baby logs, waitlist email, contact messages, future backup or sharing features, and deletion requests.",
    asideTitle: "Coverage",
    readLabel: "Read",
    contactLinkLabel: "contact page",
    aside: [
      { title: "Launch app", copy: "iOS and watchOS first, local by default" },
      { title: "Future platforms", copy: "Android and server backup only if added later" },
      { title: "Web", copy: "Waitlist, contact, first-party analytics" },
    ],
    sections: [
      {
        heading: "The short version",
        body: [
          "BabyLeveling is designed around a simple rule: your baby's care data belongs to your family. At launch, the iOS and watchOS app stores baby logs locally on your device and does not upload those logs to BabyLeveling servers.",
          "We do not sell, rent, or share baby care data with advertisers or data brokers. The free launch version does not include ads. If ads are introduced in a later version, they will not use your baby's care logs for targeted advertising.",
        ],
      },
      {
        heading: "Information you choose to enter",
        body: [
          "You may enter baby care information such as feeding, sleep, diaper changes, medication, vaccine records, growth measurements, milestones, notes, and app settings.",
          "This information is used to show your baby tracker, RPG progress, level-up moments, activity history, and the practical care summaries inside the app. BabyLeveling is a logging tool for parents and caregivers; it is not a medical device and does not use Apple HealthKit.",
        ],
      },
      {
        heading: "Local storage at launch",
        body: [
          "The first launch version is for iOS and watchOS. Baby care logs are stored on your device. There is no required BabyLeveling account, and app logs are not backed up to our server in the launch version.",
          "Your device or Apple account may provide its own system-level backup features depending on your settings. Those platform backups are controlled by Apple and your device settings, not by BabyLeveling.",
        ],
      },
      {
        heading: "Future backup, sync, and sharing",
        body: [
          "Later versions may add Android support, cross-device sharing, family access, or backup to BabyLeveling-operated servers. Those features would be optional and would require clear user action before baby logs are uploaded from the device.",
          "If you choose a future sharing feature, invited caregivers may be able to see or add information for the shared baby profile according to the access you grant.",
        ],
      },
      {
        heading: "Website, waitlist, and contact data",
        body: [
          "If you join the waitlist, we collect your email address, the page or source that submitted it, and a server timestamp so we can send launch updates.",
          "If you contact us through the contact form, we collect the email address, subject, and message you submit so we can respond. The website may also collect first-party, privacy-focused analytics such as page views, section views, CTA clicks, waitlist success counts, and device category to understand whether the website works.",
        ],
      },
      {
        heading: "Retention and deletion",
        body: [
          "Local app data stays on your device until you delete it in the app, delete the app, erase the device, or remove the related device backup through your platform settings.",
          `To remove waitlist or contact data, email ${CONTACT_EMAIL} from the address you used. We will remove it from active records within 30 days unless we need to keep a limited record for security, fraud prevention, or legal reasons.`,
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "BabyLeveling is for parents, guardians, and caregivers. It is not intended for children to create accounts, submit contact information, or join the website waitlist.",
          "Adults may enter information about a child for family care tracking. We do not knowingly collect personal information directly from children under 13.",
        ],
      },
      {
        heading: "Contact",
        body: [
          `For privacy questions, data deletion requests, or platform permission concerns, email ${CONTACT_EMAIL} or use the contact form.`,
        ],
      },
    ],
  },
  vi: {
    intro:
      "BabyLeveling xem nhật ký chăm sóc bé là dữ liệu của gia đình trước hết. Chính sách này nói rõ dữ liệu nào ở lại trên thiết bị, website thu thập gì, và các tính năng đồng bộ/chia sẻ sau này chỉ hoạt động khi bạn chủ động chọn.",
    metadataDescription:
      "Cách BabyLeveling xử lý nhật ký chăm sóc bé trên thiết bị, email danh sách chờ, tin nhắn liên hệ, tính năng sao lưu/chia sẻ trong tương lai và yêu cầu xóa dữ liệu.",
    asideTitle: "Phạm vi",
    readLabel: "Đọc",
    contactLinkLabel: "trang liên hệ",
    aside: [
      { title: "App khi ra mắt", copy: "iOS và watchOS trước, mặc định lưu local" },
      { title: "Nền tảng sau này", copy: "Android và sao lưu server chỉ khi được thêm" },
      { title: "Website", copy: "Danh sách chờ, liên hệ, analytics first-party" },
    ],
    sections: [
      {
        heading: "Bản ngắn gọn",
        body: [
          "BabyLeveling được xây dựng quanh một nguyên tắc đơn giản: dữ liệu chăm sóc bé thuộc về gia đình bạn. Ở bản ra mắt đầu tiên, app iOS và watchOS lưu nhật ký của bé ngay trên thiết bị và không tải các nhật ký đó lên server của BabyLeveling.",
          "Chúng tôi không bán, cho thuê, hay chia sẻ dữ liệu chăm sóc bé với nhà quảng cáo hoặc data broker. Bản miễn phí khi ra mắt không có quảng cáo. Nếu một phiên bản sau này có quảng cáo, nhật ký chăm sóc bé của bạn sẽ không được dùng để nhắm mục tiêu quảng cáo.",
        ],
      },
      {
        heading: "Thông tin bạn tự nhập",
        body: [
          "Bạn có thể nhập thông tin chăm sóc bé như cữ bú, giấc ngủ, thay tã, thuốc, tiêm chủng, số đo tăng trưởng, cột mốc, ghi chú và cài đặt trong app.",
          "Các thông tin này dùng để hiển thị nhật ký chăm sóc, tiến trình RPG, khoảnh khắc lên cấp, lịch sử hoạt động và các tóm tắt thực tế trong app. BabyLeveling là công cụ ghi nhận cho ba mẹ và người chăm sóc; đây không phải thiết bị y tế và không dùng Apple HealthKit.",
        ],
      },
      {
        heading: "Lưu trên thiết bị khi ra mắt",
        body: [
          "Phiên bản đầu tiên ra mắt cho iOS và watchOS. Nhật ký chăm sóc bé được lưu trên thiết bị của bạn. Bạn không bắt buộc phải tạo tài khoản BabyLeveling, và nhật ký trong app không được sao lưu lên server của chúng tôi ở bản ra mắt.",
          "Thiết bị hoặc tài khoản Apple của bạn có thể có cơ chế sao lưu cấp hệ thống tùy theo cài đặt. Những bản sao lưu nền tảng đó do Apple và cài đặt thiết bị của bạn kiểm soát, không phải BabyLeveling.",
        ],
      },
      {
        heading: "Sao lưu, đồng bộ và chia sẻ trong tương lai",
        body: [
          "Các phiên bản sau này có thể thêm Android, chia sẻ giữa thiết bị, quyền truy cập gia đình, hoặc sao lưu lên server do BabyLeveling vận hành. Những tính năng này sẽ là tùy chọn và cần hành động rõ ràng từ bạn trước khi nhật ký của bé được tải khỏi thiết bị.",
          "Nếu bạn chọn tính năng chia sẻ trong tương lai, người chăm sóc được mời có thể xem hoặc thêm thông tin cho hồ sơ bé được chia sẻ theo quyền bạn cấp.",
        ],
      },
      {
        heading: "Dữ liệu website, danh sách chờ và liên hệ",
        body: [
          "Nếu bạn tham gia danh sách chờ, chúng tôi thu thập email, trang hoặc nguồn gửi form, và thời điểm server ghi nhận để gửi thông tin ra mắt.",
          "Nếu bạn gửi form liên hệ, chúng tôi thu thập email, chủ đề và nội dung tin nhắn để phản hồi. Website cũng có thể thu thập analytics first-party, tôn trọng quyền riêng tư, như lượt xem trang, lượt xem từng section, lượt bấm CTA, số lần đăng ký danh sách chờ thành công và loại thiết bị để hiểu website có hoạt động tốt không.",
        ],
      },
      {
        heading: "Lưu giữ và xóa dữ liệu",
        body: [
          "Dữ liệu app lưu local sẽ ở trên thiết bị cho đến khi bạn xóa trong app, xóa app, xóa thiết bị, hoặc xóa bản sao lưu liên quan qua cài đặt nền tảng.",
          `Để xóa dữ liệu danh sách chờ hoặc liên hệ, hãy email ${CONTACT_EMAIL} từ địa chỉ bạn đã dùng. Chúng tôi sẽ xóa dữ liệu khỏi hồ sơ đang hoạt động trong vòng 30 ngày, trừ khi cần giữ một bản ghi giới hạn vì bảo mật, chống gian lận hoặc lý do pháp lý.`,
        ],
      },
      {
        heading: "Quyền riêng tư của trẻ em",
        body: [
          "BabyLeveling dành cho ba mẹ, người giám hộ và người chăm sóc. App không được thiết kế để trẻ tự tạo tài khoản, gửi thông tin liên hệ hoặc tham gia danh sách chờ trên website.",
          "Người lớn có thể nhập thông tin về trẻ để theo dõi việc chăm sóc trong gia đình. Chúng tôi không cố ý thu thập thông tin cá nhân trực tiếp từ trẻ dưới 13 tuổi.",
        ],
      },
      {
        heading: "Liên hệ",
        body: [
          `Nếu có câu hỏi về quyền riêng tư, yêu cầu xóa dữ liệu hoặc thắc mắc về quyền truy cập trên thiết bị, hãy email ${CONTACT_EMAIL} hoặc dùng form liên hệ.`,
        ],
      },
    ],
  },
  ja: {
    intro:
      "BabyLeveling は、赤ちゃんのケア記録をまず家族の記録として扱います。このポリシーでは、端末内に残るデータ、ウェブサイトで収集する情報、そして将来の同期・共有機能が利用者の選択によってのみ動くことを説明します。",
    metadataDescription:
      "BabyLeveling における端末内の育児記録、ウェイトリストのメール、問い合わせ内容、将来のバックアップ・共有機能、削除依頼の扱いについて。",
    asideTitle: "対象範囲",
    readLabel: "読む",
    contactLinkLabel: "お問い合わせページ",
    aside: [
      { title: "初回リリース", copy: "iOS / watchOS から開始、標準は端末内保存" },
      { title: "将来の展開", copy: "Android とサーバーバックアップは追加時のみ" },
      { title: "Web", copy: "ウェイトリスト、お問い合わせ、ファーストパーティ分析" },
    ],
    sections: [
      {
        heading: "要点",
        body: [
          "BabyLeveling の基本方針はシンプルです。赤ちゃんのケア記録は、ご家族のものです。初回リリースの iOS / watchOS アプリでは、赤ちゃんの記録は端末内に保存され、BabyLeveling のサーバーへアップロードされません。",
          "赤ちゃんのケア記録を、広告主やデータブローカーへ販売、貸与、共有することはありません。初回リリースの無料版に広告は含まれません。将来のバージョンで広告を導入する場合でも、赤ちゃんのケア記録をターゲティング広告に利用することはありません。",
        ],
      },
      {
        heading: "利用者が入力する情報",
        body: [
          "授乳、睡眠、おむつ替え、服薬、予防接種、身長・体重などの成長記録、マイルストーン、メモ、アプリ設定などを入力できます。",
          "これらの情報は、育児記録、RPG の進行、レベルアップ演出、履歴、実用的なケアの要約をアプリ内で表示するために使われます。BabyLeveling は保護者・養育者のための記録ツールであり、医療機器ではありません。また Apple HealthKit は利用しません。",
        ],
      },
      {
        heading: "初回リリースでの端末内保存",
        body: [
          "初回リリースは iOS と watchOS 向けです。赤ちゃんのケア記録はお使いの端末に保存されます。BabyLeveling アカウントの作成は必須ではなく、初回リリースではアプリ内の記録を当社サーバーへバックアップしません。",
          "端末または Apple アカウントの設定によっては、OS やプラットフォーム側のバックアップ機能が利用される場合があります。これらのバックアップは Apple と端末設定により管理され、BabyLeveling が管理するものではありません。",
        ],
      },
      {
        heading: "将来のバックアップ・同期・共有",
        body: [
          "将来のバージョンでは、Android 対応、端末間共有、家族アクセス、BabyLeveling が運用するサーバーへのバックアップを追加する可能性があります。これらは任意の機能であり、赤ちゃんの記録が端末外へアップロードされる前に、利用者の明確な操作を必要とします。",
          "将来の共有機能を利用する場合、招待された養育者は、付与された権限に応じて共有中の赤ちゃんプロフィールを閲覧したり、情報を追加したりできる場合があります。",
        ],
      },
      {
        heading: "ウェブサイト、ウェイトリスト、お問い合わせ",
        body: [
          "ウェイトリストに登録する場合、ローンチ情報をお知らせするために、メールアドレス、送信元ページまたはソース、サーバー側の登録時刻を収集します。",
          "お問い合わせフォームを利用する場合、返信のためにメールアドレス、件名、メッセージ内容を収集します。ウェブサイトでは、ページ閲覧、セクション閲覧、CTA クリック、ウェイトリスト登録成功数、端末カテゴリなど、サイト改善のためのファーストパーティかつプライバシーに配慮した分析情報を収集する場合があります。",
        ],
      },
      {
        heading: "保存期間と削除",
        body: [
          "端末内のアプリデータは、アプリ内で削除する、アプリを削除する、端末を消去する、または関連する端末バックアップをプラットフォーム設定から削除するまで、端末に残ります。",
          `ウェイトリストまたはお問い合わせデータの削除を希望する場合は、登録時に使用したメールアドレスから ${CONTACT_EMAIL} へご連絡ください。セキュリティ、不正防止、法的理由により限定的な記録を保持する必要がある場合を除き、30日以内にアクティブな記録から削除します。`,
        ],
      },
      {
        heading: "子どものプライバシー",
        body: [
          "BabyLeveling は、保護者、親権者、養育者のためのサービスです。子ども本人がアカウントを作成したり、連絡先情報を送信したり、ウェイトリストに登録したりすることを想定していません。",
          "大人の利用者は、家庭内のケア記録のために子どもに関する情報を入力できます。当社は、13歳未満の子どもから直接個人情報を収集することを意図していません。",
        ],
      },
      {
        heading: "お問い合わせ",
        body: [
          `プライバシーに関する質問、データ削除依頼、端末権限についてのご相談は、${CONTACT_EMAIL} へメールするか、お問い合わせフォームをご利用ください。`,
        ],
      },
    ],
  },
};

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const d = getDictionary(locale).legal;
  const title = `${d.privacyH1}  -  ${SITE_NAME}`;
  const description = privacyCopy[locale].metadataDescription;
  const path = "/legal/privacy";
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: localeHref(locale, path),
      languages: localeAlternates(path),
    },
    openGraph: { url: localeHref(locale, path), title, description },
    twitter: { title, description },
  };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.legal;
  const copy = privacyCopy[locale];

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.privacyH1, href: localeHref(locale, "/legal/privacy") },
      ]}
    >
      <LegalPageFrame
        title={d.privacyH1}
        intro={copy.intro}
        lastUpdatedLabel={d.lastUpdated}
        asideTitle={copy.asideTitle}
        asideItems={copy.aside}
        readLabel={copy.readLabel}
        related={{
          href: localeHref(locale, "/legal/terms"),
          label: d.termsH1,
        }}
      >
        {copy.sections.map((section, index) => (
          <LegalSection
            key={section.heading}
            number={index + 1}
            heading={section.heading}
          >
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {section.heading === "Contact" ? (
              <p>
                Email{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="font-medium text-hi underline-offset-4 hover:underline"
                >
                  {CONTACT_EMAIL}
                </a>{" "}
                or open the{" "}
                <Link
                  href={localeHref(locale, "/contact")}
                  className="font-medium text-hi underline-offset-4 hover:underline"
                >
                  {copy.contactLinkLabel}
                </Link>
                .
              </p>
            ) : null}
          </LegalSection>
        ))}
      </LegalPageFrame>
    </DepthPageShell>
  );
}

function LegalPageFrame({
  title,
  intro,
  lastUpdatedLabel,
  asideTitle,
  asideItems,
  readLabel,
  related,
  children,
}: {
  title: string;
  intro: string;
  lastUpdatedLabel: string;
  asideTitle: string;
  asideItems: { title: string; copy: string }[];
  readLabel: string;
  related: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 pt-6 pb-24 sm:px-6 sm:pb-32">
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <article className="card-duolingo overflow-hidden">
          <header
            className="border-b p-6 sm:p-8"
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <p className="font-display text-sm font-semibold text-accent">
              BabyLeveling legal
            </p>
            <h1 className="mt-3 font-display text-[clamp(2.35rem,5vw,4.25rem)] leading-[1.04] tracking-tight text-hi">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-lo sm:text-lg">
              {intro}
            </p>
            <p className="mt-6 text-sm text-lo">
              {lastUpdatedLabel}:{" "}
              <time dateTime={LAST_UPDATED} className="font-medium text-hi">
                {new Date(LAST_UPDATED).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </header>

          <div className="flex flex-col gap-8 p-6 sm:p-8">{children}</div>
        </article>

        <aside className="glass h-fit rounded-[var(--radius-xl)] p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-xl text-hi">{asideTitle}</h2>
          <div className="mt-5 grid gap-3">
            {asideItems.map((item) => (
              <PlatformItem key={item.title} title={item.title} copy={item.copy} />
            ))}
          </div>
          <Link
            href={related.href}
            className="btn-secondary btn-sm mt-6 w-full"
          >
            {readLabel} {related.label}
          </Link>
        </aside>
      </div>
    </div>
  );
}

function PlatformItem({ title, copy }: { title: string; copy: string }) {
  return (
    <div
      className="rounded-[var(--radius-md)] border bg-white/70 p-4"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <p className="font-display text-base font-semibold text-hi">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-lo">{copy}</p>
    </div>
  );
}

function LegalSection({
  number,
  heading,
  children,
}: {
  number: number;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="grid gap-4 border-b pb-8 last:border-b-0 last:pb-0 sm:grid-cols-[3.5rem_1fr]"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] bg-grad-xp font-display text-sm font-bold text-white shadow-[0_4px_0_rgba(23,32,42,0.16)]">
        {String(number).padStart(2, "0")}
      </div>
      <div>
        <h2 className="font-display text-2xl leading-tight text-hi">
          {heading}
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-base leading-relaxed text-lo">
          {children}
        </div>
      </div>
    </section>
  );
}
