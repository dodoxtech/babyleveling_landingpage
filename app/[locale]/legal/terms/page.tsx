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

const termsCopy: Record<
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
      "These terms cover the BabyLeveling website, waitlist, iOS/watchOS launch app, and the responsibilities that come with entering baby care data.",
    metadataDescription:
      "Terms for BabyLeveling website, waitlist, iOS/watchOS app license, app store rules, baby-care logging, medical disclaimers, future optional features, and contact.",
    asideTitle: "Terms scope",
    readLabel: "Read",
    contactLinkLabel: "contact page",
    aside: [
      { title: "Apple launch", copy: "iOS, watchOS, App Store rules" },
      { title: "Local core", copy: "No required account or server backup at launch" },
      { title: "Future updates", copy: "Android, sharing, ads, or paid features if added" },
    ],
    sections: [
      {
        heading: "Acceptance",
        body: [
          "By using BabyLeveling, this website, the waitlist, or any related app experience, you agree to these Terms of Service. If you do not agree, do not use the app or website.",
          "These terms apply to pre-launch waitlist access, public website use, and the iOS/watchOS app when it becomes available through the Apple App Store. If BabyLeveling later expands to Android or other platforms, the relevant platform terms may also apply.",
        ],
      },
      {
        heading: "App license",
        body: [
          `${SITE_NAME} grants you a limited, non-exclusive, non-transferable, revocable license to use the app for personal, family, and caregiving purposes.`,
          "At launch, BabyLeveling is intended for supported Apple devices. You may not copy, modify, sell, sublicense, or reverse-engineer the app except where applicable law allows it.",
        ],
      },
      {
        heading: "Platform terms",
        body: [
          "If you download BabyLeveling from the Apple App Store, Apple's App Store terms and policies also apply, including Apple rules for purchases, refunds, and device permissions.",
          "If BabyLeveling is distributed through Google Play or another store in the future, that store's terms and policies may also apply. Those future platform references do not mean the Android version is available at launch.",
          "Apple, Google, and other platform providers are not responsible for this website, the waitlist, or BabyLeveling support unless their own platform terms say otherwise.",
        ],
      },
      {
        heading: "Accounts, local data, and future sharing",
        body: [
          "The launch app is designed to work without a required BabyLeveling account. Baby care logs are stored locally on your device at launch and are not backed up to BabyLeveling servers.",
          "Future features, such as Android support, cross-device sharing, family access, or server backup, may require an account, a platform account, or consent from the family organizer. You are responsible for choosing who can access shared baby care information if you enable those features later.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You may not use BabyLeveling for unlawful activity, harassment, abuse, unauthorized access, security testing without permission, scraping, spam, or any use that disrupts the service for other families.",
          "You may not submit content that violates another person's rights or includes information you are not authorized to share.",
        ],
      },
      {
        heading: "Medical disclaimer",
        body: [
          "BabyLeveling is a baby-care logging and habit-support tool. It is not a medical device and does not provide medical advice, diagnosis, treatment, emergency guidance, or clinical decision support.",
          "Always contact a qualified healthcare provider for questions about your baby's health, feeding, sleep, growth, medication, symptoms, vaccines, or emergencies.",
        ],
      },
      {
        heading: "Payments and ads",
        body: [
          "Joining the waitlist is free. The free launch version does not include ads. If paid features, purchases, subscriptions, or ads are introduced later, the relevant pricing or ad-supported experience will be disclosed before use where required.",
          "Purchases made through Apple, Google, or another platform store are handled by the relevant store. Store refund rules, renewal settings, cancellation flows, and taxes may apply.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          `BabyLeveling, ${SITE_NAME}, the website, app design, artwork, logos, software, and content are owned by BabyLeveling or its licensors.`,
          "You may not use our brand assets or app content in a way that suggests endorsement, partnership, or ownership without written permission.",
        ],
      },
      {
        heading: "Disclaimers and liability",
        body: [
          "The app and website are provided as is and as available. We do not promise that BabyLeveling will be uninterrupted, error-free, compatible with every device, or available in every country or store.",
          `To the maximum extent permitted by law, ${SITE_NAME} is not liable for indirect, incidental, special, consequential, punitive, or lost-data damages arising from your use of the app or website.`,
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update these terms as BabyLeveling moves from waitlist to launch and as platform support changes. We will update the date on this page when material terms change.",
          `Questions about these terms can be sent to ${CONTACT_EMAIL} or through the contact page.`,
        ],
      },
    ],
  },
  vi: {
    intro:
      "Các điều khoản này áp dụng cho website, danh sách chờ, app iOS/watchOS khi ra mắt, và trách nhiệm đi kèm khi bạn nhập dữ liệu chăm sóc bé.",
    metadataDescription:
      "Điều khoản cho website BabyLeveling, danh sách chờ, giấy phép app iOS/watchOS, quy định App Store, ghi nhận chăm sóc bé, miễn trừ y tế, tính năng tùy chọn trong tương lai và liên hệ.",
    asideTitle: "Phạm vi điều khoản",
    readLabel: "Đọc",
    contactLinkLabel: "trang liên hệ",
    aside: [
      { title: "Ra mắt trên Apple", copy: "iOS, watchOS, quy định App Store" },
      { title: "Lõi local", copy: "Không bắt buộc tài khoản hoặc sao lưu server khi ra mắt" },
      { title: "Cập nhật sau này", copy: "Android, chia sẻ, quảng cáo hoặc tính năng trả phí nếu được thêm" },
    ],
    sections: [
      {
        heading: "Chấp nhận điều khoản",
        body: [
          "Khi sử dụng BabyLeveling, website này, danh sách chờ hoặc bất kỳ trải nghiệm app liên quan nào, bạn đồng ý với các Điều khoản dịch vụ này. Nếu không đồng ý, vui lòng không sử dụng app hoặc website.",
          "Các điều khoản này áp dụng cho danh sách chờ trước khi ra mắt, việc dùng website công khai, và app iOS/watchOS khi app có mặt trên Apple App Store. Nếu BabyLeveling sau này mở rộng sang Android hoặc nền tảng khác, điều khoản của nền tảng tương ứng cũng có thể áp dụng.",
        ],
      },
      {
        heading: "Giấy phép sử dụng app",
        body: [
          `${SITE_NAME} cấp cho bạn giấy phép có giới hạn, không độc quyền, không thể chuyển nhượng và có thể bị thu hồi để sử dụng app cho mục đích cá nhân, gia đình và chăm sóc bé.`,
          "Khi ra mắt, BabyLeveling được thiết kế cho các thiết bị Apple được hỗ trợ. Bạn không được sao chép, chỉnh sửa, bán, cấp phép lại hoặc reverse-engineer app, trừ khi pháp luật hiện hành cho phép.",
        ],
      },
      {
        heading: "Điều khoản nền tảng",
        body: [
          "Nếu bạn tải BabyLeveling từ Apple App Store, điều khoản và chính sách của Apple App Store cũng áp dụng, bao gồm quy định của Apple về mua hàng, hoàn tiền và quyền truy cập thiết bị.",
          "Nếu BabyLeveling được phân phối qua Google Play hoặc cửa hàng khác trong tương lai, điều khoản và chính sách của cửa hàng đó cũng có thể áp dụng. Các nhắc đến nền tảng tương lai không có nghĩa là bản Android có sẵn khi ra mắt.",
          "Apple, Google và các nhà cung cấp nền tảng khác không chịu trách nhiệm cho website này, danh sách chờ hoặc hỗ trợ BabyLeveling, trừ khi điều khoản riêng của họ quy định khác.",
        ],
      },
      {
        heading: "Tài khoản, dữ liệu local và chia sẻ sau này",
        body: [
          "App khi ra mắt được thiết kế để hoạt động mà không bắt buộc tài khoản BabyLeveling. Nhật ký chăm sóc bé được lưu local trên thiết bị khi ra mắt và không được sao lưu lên server của BabyLeveling.",
          "Các tính năng sau này, như hỗ trợ Android, chia sẻ giữa thiết bị, quyền truy cập gia đình hoặc sao lưu server, có thể cần tài khoản, tài khoản nền tảng hoặc sự đồng ý của người quản lý gia đình. Bạn chịu trách nhiệm chọn ai có thể truy cập thông tin chăm sóc bé được chia sẻ nếu sau này bật các tính năng đó.",
        ],
      },
      {
        heading: "Cách sử dụng được chấp nhận",
        body: [
          "Bạn không được dùng BabyLeveling cho hoạt động trái pháp luật, quấy rối, lạm dụng, truy cập trái phép, kiểm thử bảo mật khi chưa được phép, scraping, spam hoặc bất kỳ hành vi nào làm gián đoạn dịch vụ cho các gia đình khác.",
          "Bạn không được gửi nội dung vi phạm quyền của người khác hoặc chứa thông tin mà bạn không có quyền chia sẻ.",
        ],
      },
      {
        heading: "Miễn trừ y tế",
        body: [
          "BabyLeveling là công cụ ghi nhận chăm sóc bé và hỗ trợ thói quen. Đây không phải thiết bị y tế và không cung cấp tư vấn y khoa, chẩn đoán, điều trị, hướng dẫn khẩn cấp hoặc hỗ trợ quyết định lâm sàng.",
          "Luôn liên hệ chuyên gia y tế đủ chuyên môn nếu có câu hỏi về sức khỏe, cữ bú, giấc ngủ, tăng trưởng, thuốc, triệu chứng, tiêm chủng hoặc tình huống khẩn cấp của bé.",
        ],
      },
      {
        heading: "Thanh toán và quảng cáo",
        body: [
          "Tham gia danh sách chờ là miễn phí. Bản miễn phí khi ra mắt không có quảng cáo. Nếu sau này có tính năng trả phí, mua trong app, đăng ký hoặc quảng cáo, giá hoặc trải nghiệm có quảng cáo liên quan sẽ được thông báo trước khi sử dụng khi pháp luật yêu cầu.",
          "Các giao dịch qua Apple, Google hoặc cửa hàng nền tảng khác sẽ do cửa hàng tương ứng xử lý. Quy định hoàn tiền, gia hạn, hủy và thuế của cửa hàng có thể áp dụng.",
        ],
      },
      {
        heading: "Sở hữu trí tuệ",
        body: [
          `BabyLeveling, ${SITE_NAME}, website, thiết kế app, hình ảnh, logo, phần mềm và nội dung thuộc sở hữu của BabyLeveling hoặc bên cấp phép của chúng tôi.`,
          "Bạn không được dùng tài sản thương hiệu hoặc nội dung app theo cách khiến người khác hiểu rằng có sự chứng thực, hợp tác hoặc quyền sở hữu nếu chưa có văn bản cho phép.",
        ],
      },
      {
        heading: "Miễn trừ và giới hạn trách nhiệm",
        body: [
          "App và website được cung cấp theo hiện trạng và tùy khả dụng. Chúng tôi không cam kết BabyLeveling sẽ luôn không gián đoạn, không lỗi, tương thích với mọi thiết bị hoặc có mặt ở mọi quốc gia hay cửa hàng.",
          `Trong phạm vi tối đa pháp luật cho phép, ${SITE_NAME} không chịu trách nhiệm cho thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hệ quả, mang tính trừng phạt hoặc mất dữ liệu phát sinh từ việc bạn sử dụng app hoặc website.`,
        ],
      },
      {
        heading: "Thay đổi và liên hệ",
        body: [
          "Chúng tôi có thể cập nhật các điều khoản này khi BabyLeveling chuyển từ danh sách chờ sang ra mắt và khi phạm vi nền tảng thay đổi. Chúng tôi sẽ cập nhật ngày trên trang này khi có thay đổi quan trọng.",
          `Câu hỏi về các điều khoản này có thể gửi tới ${CONTACT_EMAIL} hoặc qua trang liên hệ.`,
        ],
      },
    ],
  },
  ja: {
    intro:
      "本規約は、BabyLeveling のウェブサイト、ウェイトリスト、初回リリースの iOS / watchOS アプリ、および赤ちゃんのケア記録を入力する際の責任について定めるものです。",
    metadataDescription:
      "BabyLeveling のウェブサイト、ウェイトリスト、iOS/watchOS アプリのライセンス、ストア規約、育児記録、医療免責、将来の任意機能、お問い合わせに関する利用規約。",
    asideTitle: "規約の範囲",
    readLabel: "読む",
    contactLinkLabel: "お問い合わせページ",
    aside: [
      { title: "Apple での開始", copy: "iOS、watchOS、App Store 規約" },
      { title: "ローカル中心", copy: "初回リリースでは必須アカウント・サーバーバックアップなし" },
      { title: "将来の更新", copy: "Android、共有、広告、有料機能は追加時のみ" },
    ],
    sections: [
      {
        heading: "同意",
        body: [
          "BabyLeveling、本ウェブサイト、ウェイトリスト、または関連するアプリ体験を利用することで、本利用規約に同意したものとみなされます。同意しない場合は、アプリおよびウェブサイトを利用しないでください。",
          "本規約は、リリース前のウェイトリスト、公開ウェブサイトの利用、および Apple App Store で提供される iOS / watchOS アプリに適用されます。将来 BabyLeveling が Android またはその他のプラットフォームへ展開する場合、該当するプラットフォーム規約も適用されることがあります。",
        ],
      },
      {
        heading: "アプリのライセンス",
        body: [
          `${SITE_NAME} は、個人、家族、育児・養育の目的でアプリを利用するための、限定的、非独占的、譲渡不可、取消可能なライセンスを付与します。`,
          "初回リリース時点の BabyLeveling は、対応する Apple デバイス向けです。適用法で認められる場合を除き、アプリのコピー、改変、販売、再許諾、リバースエンジニアリングはできません。",
        ],
      },
      {
        heading: "プラットフォーム規約",
        body: [
          "Apple App Store から BabyLeveling をダウンロードする場合、購入、返金、端末権限などに関する Apple App Store の規約およびポリシーも適用されます。",
          "将来 BabyLeveling が Google Play または他のストアで配信される場合、そのストアの規約およびポリシーも適用されることがあります。将来のプラットフォームへの言及は、Android 版が初回リリース時に提供されることを意味しません。",
          "Apple、Google、その他のプラットフォーム提供者は、それぞれの規約で別途定める場合を除き、本ウェブサイト、ウェイトリスト、または BabyLeveling のサポートについて責任を負いません。",
        ],
      },
      {
        heading: "アカウント、端末内データ、将来の共有",
        body: [
          "初回リリースのアプリは、BabyLeveling アカウントを必須とせずに利用できる設計です。赤ちゃんのケア記録はリリース時点では端末内に保存され、BabyLeveling のサーバーへバックアップされません。",
          "Android 対応、端末間共有、家族アクセス、サーバーバックアップなどの将来機能では、アカウント、プラットフォームアカウント、または家族管理者の同意が必要になる場合があります。将来これらの機能を有効にする場合、共有された赤ちゃんのケア情報へ誰がアクセスできるかを選ぶ責任は利用者にあります。",
        ],
      },
      {
        heading: "禁止事項",
        body: [
          "違法行為、嫌がらせ、虐待、不正アクセス、許可のないセキュリティテスト、スクレイピング、スパム、または他のご家族の利用を妨げる行為に BabyLeveling を使用することはできません。",
          "他者の権利を侵害する内容、または共有する権限のない情報を送信してはいけません。",
        ],
      },
      {
        heading: "医療に関する免責",
        body: [
          "BabyLeveling は、赤ちゃんのケアを記録し、習慣を支えるためのツールです。医療機器ではなく、医療上の助言、診断、治療、緊急時の指示、臨床判断支援を提供するものではありません。",
          "赤ちゃんの健康、授乳、睡眠、成長、服薬、症状、予防接種、緊急時について疑問がある場合は、必ず資格を有する医療専門家に相談してください。",
        ],
      },
      {
        heading: "支払いと広告",
        body: [
          "ウェイトリストへの登録は無料です。初回リリースの無料版には広告は含まれません。将来、有料機能、購入、サブスクリプション、または広告が導入される場合、必要に応じて利用前に価格または広告付き体験について表示します。",
          "Apple、Google、またはその他のプラットフォームストアを通じた購入は、該当するストアにより処理されます。返金、更新、解約、税金に関するストアの規則が適用される場合があります。",
        ],
      },
      {
        heading: "知的財産",
        body: [
          `BabyLeveling、${SITE_NAME}、ウェブサイト、アプリデザイン、アートワーク、ロゴ、ソフトウェア、コンテンツは、BabyLeveling またはそのライセンサーに帰属します。`,
          "書面による許可なく、当社のブランド資産またはアプリコンテンツを、推薦、提携、所有関係があるかのように見える形で使用することはできません。",
        ],
      },
      {
        heading: "免責および責任制限",
        body: [
          "アプリおよびウェブサイトは、現状有姿かつ提供可能な範囲で提供されます。BabyLeveling が常に中断なく、エラーなく、すべての端末に対応し、すべての国またはストアで利用できることを保証するものではありません。",
          `適用法で認められる最大限の範囲において、${SITE_NAME} は、アプリまたはウェブサイトの利用から生じる間接的、偶発的、特別、結果的、懲罰的損害、またはデータ損失について責任を負いません。`,
        ],
      },
      {
        heading: "変更とお問い合わせ",
        body: [
          "BabyLeveling がウェイトリスト段階からリリースへ進む場合、または対応プラットフォームが変わる場合、本規約を更新することがあります。重要な変更がある場合は、このページの日付を更新します。",
          `本規約に関する質問は、${CONTACT_EMAIL} またはお問い合わせページからご連絡ください。`,
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
  const title = `${d.termsH1}  -  ${SITE_NAME}`;
  const description = termsCopy[locale].metadataDescription;
  const path = "/legal/terms";
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

export default async function TermsPage({ params }: PageProps) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const dict = getDictionary(locale);
  const d = dict.legal;
  const copy = termsCopy[locale];

  return (
    <DepthPageShell
      locale={locale}
      breadcrumb={[
        { label: dict.common.home, href: localeHref(locale, "/") },
        { label: d.termsH1, href: localeHref(locale, "/legal/terms") },
      ]}
    >
      <LegalPageFrame
        title={d.termsH1}
        intro={copy.intro}
        lastUpdatedLabel={d.lastUpdated}
        asideTitle={copy.asideTitle}
        asideItems={copy.aside}
        readLabel={copy.readLabel}
        related={{
          href: localeHref(locale, "/legal/privacy"),
          label: d.privacyH1,
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
            {section.heading === "Changes and contact" ? (
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
