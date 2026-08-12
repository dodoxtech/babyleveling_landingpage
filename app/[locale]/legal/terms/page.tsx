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

const LAST_UPDATED = "2026-08-12";
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
      "These terms cover the BabyLeveling website, waitlist, iOS/watchOS app, the free on-device tier, Premium cloud sync and family sharing, and the responsibilities that come with entering and sharing baby care data.",
    metadataDescription:
      "Terms for BabyLeveling website, waitlist, iOS/watchOS app license, App Store rules, guardian confirmation, accounts, Premium subscriptions, family sharing, baby-care logging, medical disclaimers, and contact.",
    asideTitle: "Terms scope",
    readLabel: "Read",
    contactLinkLabel: "contact page",
    aside: [
      { title: "Apple platform", copy: "iOS, watchOS, App Store and StoreKit rules" },
      { title: "Free tier", copy: "No account or server backup required" },
      { title: "Premium", copy: "Account, cloud sync, and family sharing, billed through Apple" },
    ],
    sections: [
      {
        heading: "Acceptance",
        body: [
          "By using BabyLeveling, this website, the waitlist, or any related app experience, you agree to these Terms of Service. If you do not agree, do not use the app or website.",
          "These terms apply to the public website, the waitlist, the free on-device tier of the iOS/watchOS app, and Premium cloud sync and family sharing when you enable them. If BabyLeveling later expands to Android or other platforms, the relevant platform terms may also apply.",
        ],
      },
      {
        heading: "Eligibility and guardian confirmation",
        body: [
          "BabyLeveling is for parents, legal guardians, and caregivers acting with a guardian's permission. When you create an account, you confirm that you are a parent or legal guardian and at least 18 years old, as stated during onboarding. If you invite or accept access to a shared baby profile as a caregiver, the baby's parent or legal guardian remains responsible for authorizing that access.",
          "You may not create an account or use BabyLeveling on behalf of a child, and you are responsible for the accuracy of the confirmation you provide.",
        ],
      },
      {
        heading: "Accounts and sign-in",
        body: [
          "The free tier does not require an account. To use Premium features, you create an account with Sign in with Apple or an email address and password, and you are responsible for keeping your credentials and any device you sign in from secure.",
          "You are responsible for activity under your account, including entries made by anyone you invite to a shared baby profile. Contact us promptly if you believe your account has been accessed without authorization.",
        ],
      },
      {
        heading: "App license",
        body: [
          `${SITE_NAME} grants you a limited, non-exclusive, non-transferable, revocable license to use the app for personal, family, and caregiving purposes.`,
          "BabyLeveling is intended for supported Apple devices. You may not copy, modify, sell, sublicense, or reverse-engineer the app except where applicable law allows it.",
        ],
      },
      {
        heading: "Platform terms",
        body: [
          "If you download BabyLeveling from the Apple App Store, Apple's App Store terms and policies also apply, including Apple rules for purchases, refunds, and device permissions.",
          "If BabyLeveling is distributed through Google Play or another store in the future, that store's terms and policies may also apply. Those future platform references do not mean the Android version is available today.",
          "Apple and other platform providers are not responsible for this website, the waitlist, or BabyLeveling support unless their own platform terms say otherwise.",
        ],
      },
      {
        heading: "Free tier and Premium subscription",
        body: [
          "The free tier works fully on your device, without a required account and without server backup — your baby care logs stay local until you choose otherwise.",
          "Premium is an optional paid subscription, billed through the Apple App Store, that unlocks cloud sync across your own devices and sharing with invited family members. Premium features, pricing, and what is included may change over time; current pricing, billing cycle, and auto-renewal terms are shown in the app before you subscribe.",
        ],
      },
      {
        heading: "Family sharing responsibilities",
        body: [
          "If you invite other people to a shared baby profile, you choose their role (owner, editor, or viewer) and are responsible for deciding who can see or add information about your baby. Anyone you invite must agree to these Terms and the Privacy Policy before they can view shared baby data.",
          "If you remove someone from a shared baby profile, they lose further access through the app, but BabyLeveling cannot delete copies of information they already viewed, saved, or exported outside the app before removal.",
        ],
      },
      {
        heading: "Acceptable use",
        body: [
          "You may not use BabyLeveling for unlawful activity, harassment, abuse, unauthorized access, security testing without permission, scraping, spam, or any use that disrupts the service for other families.",
          "You may not submit content that violates another person's rights or includes information you are not authorized to share, including baby care information about a child you do not have parental or guardian authority over.",
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
        heading: "Payments, subscriptions, and refunds",
        body: [
          "Joining the waitlist and using the free tier are free. Premium subscriptions and redeem codes are billed and managed through the Apple App Store; pricing, billing cycle, and auto-renewal terms are shown in the app before you subscribe, as required by Apple's guidelines.",
          "Purchases, refunds, renewals, and cancellations are handled by Apple according to Apple's own terms — we cannot issue refunds directly. If we add other platforms or payment providers later, their store terms will also apply to purchases made there.",
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
        heading: "Disclaimers and limitation of liability",
        body: [
          "The app and website are provided as is and as available. We do not promise that BabyLeveling will be uninterrupted, error-free, compatible with every device, or available in every country or store, and we do not promise that cloud sync will always be available or free of delay.",
          `To the maximum extent permitted by law, ${SITE_NAME} is not liable for indirect, incidental, special, consequential, punitive, or lost-data damages arising from your use of the app or website, or from another family member's use of a baby profile you shared with them.`,
        ],
      },
      {
        heading: "Termination",
        body: [
          "You may stop using BabyLeveling at any time and delete your account from Settings in the app; see the Privacy Policy for what happens to your data after deletion. We may suspend or terminate access to Premium features if you violate these Terms, misuse family sharing, or if required by law or an App Store policy.",
          "Sections that by their nature should continue to apply — including intellectual property, disclaimers, limitation of liability, and this section — remain in effect after your account is deleted or your access ends.",
        ],
      },
      {
        heading: "Governing law and disputes",
        body: [
          "Nothing in these Terms limits any consumer protection rights you have under the mandatory law of your country of residence, including the United States, Japan, Canada, or Vietnam. If a dispute arises, please contact us first at the email below so we can try to resolve it informally.",
        ],
      },
      {
        heading: "Changes and contact",
        body: [
          "We may update these terms as BabyLeveling adds features, platforms, or payment options. We will update the date on this page when material terms change.",
          `Questions about these terms can be sent to ${CONTACT_EMAIL} or through the contact page.`,
        ],
      },
    ],
  },
  vi: {
    intro:
      "Các điều khoản này áp dụng cho website BabyLeveling, danh sách chờ, app iOS/watchOS, bản miễn phí lưu trên thiết bị, đồng bộ đám mây và chia sẻ gia đình của Premium, cùng trách nhiệm đi kèm khi bạn nhập và chia sẻ dữ liệu chăm sóc bé.",
    metadataDescription:
      "Điều khoản cho website BabyLeveling, danh sách chờ, giấy phép app iOS/watchOS, quy định App Store, xác nhận vai trò giám hộ, tài khoản, thuê bao Premium, chia sẻ gia đình, ghi nhận chăm sóc bé, miễn trừ y tế và liên hệ.",
    asideTitle: "Phạm vi điều khoản",
    readLabel: "Đọc",
    contactLinkLabel: "trang liên hệ",
    aside: [
      { title: "Nền tảng Apple", copy: "iOS, watchOS, quy định App Store và StoreKit" },
      { title: "Bản miễn phí", copy: "Không cần tài khoản hay sao lưu server" },
      { title: "Premium", copy: "Cần tài khoản, đồng bộ đám mây, chia sẻ gia đình, thanh toán qua Apple" },
    ],
    sections: [
      {
        heading: "Chấp nhận điều khoản",
        body: [
          "Khi sử dụng BabyLeveling, website này, danh sách chờ hoặc bất kỳ trải nghiệm app liên quan nào, bạn đồng ý với các Điều khoản dịch vụ này. Nếu không đồng ý, vui lòng không sử dụng app hoặc website.",
          "Các điều khoản này áp dụng cho website công khai, danh sách chờ, bản miễn phí lưu trên thiết bị của app iOS/watchOS, và tính năng đồng bộ đám mây, chia sẻ gia đình của Premium khi bạn bật các tính năng đó. Nếu BabyLeveling sau này mở rộng sang Android hoặc nền tảng khác, điều khoản của nền tảng tương ứng cũng có thể áp dụng.",
        ],
      },
      {
        heading: "Điều kiện sử dụng và xác nhận vai trò giám hộ",
        body: [
          "BabyLeveling dành cho ba mẹ, người giám hộ hợp pháp và người chăm sóc được người giám hộ cho phép. Khi tạo tài khoản, bạn xác nhận rằng bạn là ba/mẹ hoặc người giám hộ hợp pháp và từ 18 tuổi trở lên, như đã nêu trong bước làm quen ban đầu (onboarding). Nếu bạn mời hoặc chấp nhận quyền truy cập vào hồ sơ bé được chia sẻ với vai trò người chăm sóc, ba/mẹ hoặc người giám hộ hợp pháp của bé vẫn là người chịu trách nhiệm cho phép quyền truy cập đó.",
          "Bạn không được tạo tài khoản hoặc sử dụng BabyLeveling thay mặt cho một trẻ em, và bạn chịu trách nhiệm về tính chính xác của xác nhận bạn cung cấp.",
        ],
      },
      {
        heading: "Tài khoản và đăng nhập",
        body: [
          "Bản miễn phí không yêu cầu tài khoản. Để sử dụng tính năng Premium, bạn tạo tài khoản bằng Sign in with Apple hoặc email và mật khẩu, và bạn chịu trách nhiệm bảo mật thông tin đăng nhập cũng như bất kỳ thiết bị nào bạn dùng để đăng nhập.",
          "Bạn chịu trách nhiệm cho các hoạt động diễn ra dưới tài khoản của mình, bao gồm các mục do bất kỳ ai bạn mời vào hồ sơ bé được chia sẻ nhập vào. Vui lòng liên hệ chúng tôi ngay nếu bạn nghi ngờ tài khoản của mình bị truy cập trái phép.",
        ],
      },
      {
        heading: "Giấy phép sử dụng app",
        body: [
          `${SITE_NAME} cấp cho bạn giấy phép có giới hạn, không độc quyền, không thể chuyển nhượng và có thể bị thu hồi để sử dụng app cho mục đích cá nhân, gia đình và chăm sóc bé.`,
          "BabyLeveling được thiết kế cho các thiết bị Apple được hỗ trợ. Bạn không được sao chép, chỉnh sửa, bán, cấp phép lại hoặc reverse-engineer app, trừ khi pháp luật hiện hành cho phép.",
        ],
      },
      {
        heading: "Điều khoản nền tảng",
        body: [
          "Nếu bạn tải BabyLeveling từ Apple App Store, điều khoản và chính sách của Apple App Store cũng áp dụng, bao gồm quy định của Apple về mua hàng, hoàn tiền và quyền truy cập thiết bị.",
          "Nếu BabyLeveling được phân phối qua Google Play hoặc cửa hàng khác trong tương lai, điều khoản và chính sách của cửa hàng đó cũng có thể áp dụng. Các nhắc đến nền tảng tương lai không có nghĩa là bản Android có sẵn ở thời điểm hiện tại.",
          "Apple và các nhà cung cấp nền tảng khác không chịu trách nhiệm cho website này, danh sách chờ hoặc hỗ trợ BabyLeveling, trừ khi điều khoản riêng của họ quy định khác.",
        ],
      },
      {
        heading: "Bản miễn phí và thuê bao Premium",
        body: [
          "Bản miễn phí hoạt động hoàn toàn trên thiết bị của bạn, không bắt buộc tài khoản và không sao lưu lên server — nhật ký chăm sóc bé của bạn ở lại trên thiết bị cho đến khi bạn chọn khác đi.",
          "Premium là thuê bao trả phí tùy chọn, thanh toán qua Apple App Store, mở khóa đồng bộ đám mây giữa các thiết bị của bạn và chia sẻ với thành viên gia đình được mời. Tính năng, giá cả và nội dung của Premium có thể thay đổi theo thời gian; giá hiện tại, chu kỳ thanh toán và điều khoản tự động gia hạn được hiển thị trong app trước khi bạn đăng ký.",
        ],
      },
      {
        heading: "Trách nhiệm khi chia sẻ gia đình",
        body: [
          "Nếu bạn mời người khác vào hồ sơ bé được chia sẻ, bạn chọn vai trò cho họ (chủ sở hữu, người chỉnh sửa hoặc người xem) và chịu trách nhiệm quyết định ai có thể xem hoặc thêm thông tin về bé. Bất kỳ ai bạn mời đều phải đồng ý với các Điều khoản này và Chính sách quyền riêng tư trước khi có thể xem dữ liệu bé được chia sẻ.",
          "Nếu bạn xóa ai đó khỏi hồ sơ bé được chia sẻ, họ sẽ mất quyền truy cập tiếp theo qua app, nhưng BabyLeveling không thể xóa các bản sao thông tin mà họ đã xem, lưu hoặc xuất ra bên ngoài app trước khi bị xóa.",
        ],
      },
      {
        heading: "Cách sử dụng được chấp nhận",
        body: [
          "Bạn không được dùng BabyLeveling cho hoạt động trái pháp luật, quấy rối, lạm dụng, truy cập trái phép, kiểm thử bảo mật khi chưa được phép, scraping, spam hoặc bất kỳ hành vi nào làm gián đoạn dịch vụ cho các gia đình khác.",
          "Bạn không được gửi nội dung vi phạm quyền của người khác hoặc chứa thông tin mà bạn không có quyền chia sẻ, bao gồm thông tin chăm sóc về một trẻ em mà bạn không có quyền làm ba/mẹ hoặc giám hộ.",
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
        heading: "Thanh toán, thuê bao và hoàn tiền",
        body: [
          "Tham gia danh sách chờ và dùng bản miễn phí là miễn phí. Thuê bao Premium và mã đổi thưởng được Apple App Store thanh toán và quản lý; giá, chu kỳ thanh toán và điều khoản tự động gia hạn được hiển thị trong app trước khi bạn đăng ký, theo đúng yêu cầu của Apple.",
          "Giao dịch mua, hoàn tiền, gia hạn và hủy được Apple xử lý theo điều khoản riêng của Apple — chúng tôi không thể trực tiếp hoàn tiền. Nếu sau này chúng tôi bổ sung nền tảng hoặc nhà cung cấp thanh toán khác, điều khoản cửa hàng của họ cũng sẽ áp dụng cho giao dịch thực hiện ở đó.",
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
          "App và website được cung cấp theo hiện trạng và tùy khả dụng. Chúng tôi không cam kết BabyLeveling sẽ luôn không gián đoạn, không lỗi, tương thích với mọi thiết bị hoặc có mặt ở mọi quốc gia hay cửa hàng, và không cam kết đồng bộ đám mây sẽ luôn khả dụng hoặc không có độ trễ.",
          `Trong phạm vi tối đa pháp luật cho phép, ${SITE_NAME} không chịu trách nhiệm cho thiệt hại gián tiếp, ngẫu nhiên, đặc biệt, hệ quả, mang tính trừng phạt hoặc mất dữ liệu phát sinh từ việc bạn sử dụng app hoặc website, hoặc từ việc thành viên gia đình khác sử dụng hồ sơ bé mà bạn đã chia sẻ với họ.`,
        ],
      },
      {
        heading: "Chấm dứt sử dụng",
        body: [
          "Bạn có thể ngừng sử dụng BabyLeveling bất cứ lúc nào và xóa tài khoản từ Cài đặt trong app; xem Chính sách quyền riêng tư để biết điều gì xảy ra với dữ liệu của bạn sau khi xóa. Chúng tôi có thể tạm ngừng hoặc chấm dứt quyền truy cập tính năng Premium nếu bạn vi phạm các Điều khoản này, lạm dụng tính năng chia sẻ gia đình, hoặc khi pháp luật hay chính sách App Store yêu cầu.",
          "Các điều khoản có tính chất cần tiếp tục áp dụng — bao gồm sở hữu trí tuệ, miễn trừ, giới hạn trách nhiệm và mục này — vẫn có hiệu lực sau khi tài khoản của bạn bị xóa hoặc quyền truy cập kết thúc.",
        ],
      },
      {
        heading: "Luật áp dụng và tranh chấp",
        body: [
          "Không nội dung nào trong các Điều khoản này giới hạn quyền bảo vệ người tiêu dùng mà bạn có theo pháp luật bắt buộc áp dụng tại quốc gia nơi bạn cư trú, bao gồm Hoa Kỳ, Nhật Bản, Canada hoặc Việt Nam. Nếu phát sinh tranh chấp, vui lòng liên hệ chúng tôi trước qua email bên dưới để chúng tôi có thể cùng bạn giải quyết không chính thức.",
        ],
      },
      {
        heading: "Thay đổi và liên hệ",
        body: [
          "Chúng tôi có thể cập nhật các điều khoản này khi BabyLeveling bổ sung tính năng, nền tảng hoặc tùy chọn thanh toán mới. Chúng tôi sẽ cập nhật ngày trên trang này khi có thay đổi quan trọng.",
          `Câu hỏi về các điều khoản này có thể gửi tới ${CONTACT_EMAIL} hoặc qua trang liên hệ.`,
        ],
      },
    ],
  },
  ja: {
    intro:
      "本規約は、BabyLeveling のウェブサイト、ウェイトリスト、iOS / watchOS アプリ、端末内で完結する無料版、Premium のクラウド同期・家族共有、そして赤ちゃんのケア記録を入力・共有する際の責任について定めるものです。",
    metadataDescription:
      "BabyLeveling のウェブサイト、ウェイトリスト、iOS/watchOS アプリのライセンス、App Store 規約、保護者確認、アカウント、Premium サブスクリプション、家族共有、育児記録、医療免責、お問い合わせに関する利用規約。",
    asideTitle: "規約の範囲",
    readLabel: "読む",
    contactLinkLabel: "お問い合わせページ",
    aside: [
      { title: "Apple プラットフォーム", copy: "iOS、watchOS、App Store および StoreKit 規約" },
      { title: "無料版", copy: "アカウントもサーバーバックアップも不要" },
      { title: "Premium", copy: "アカウント、クラウド同期、家族共有。Apple 経由で課金" },
    ],
    sections: [
      {
        heading: "同意",
        body: [
          "BabyLeveling、本ウェブサイト、ウェイトリスト、または関連するアプリ体験を利用することで、本利用規約に同意したものとみなされます。同意しない場合は、アプリおよびウェブサイトを利用しないでください。",
          "本規約は、公開ウェブサイト、ウェイトリスト、iOS / watchOS アプリの端末内で完結する無料版、および有効化した場合の Premium クラウド同期・家族共有に適用されます。将来 BabyLeveling が Android またはその他のプラットフォームへ展開する場合、該当するプラットフォーム規約も適用されることがあります。",
        ],
      },
      {
        heading: "利用資格と保護者確認",
        body: [
          "BabyLeveling は、保護者、親権者、および保護者の許可を得て行動する養育者のためのサービスです。アカウント作成時には、オンボーディングで示されるとおり、ご自身が保護者または親権者であり、18歳以上であることを確認いただきます。養育者として共有中の赤ちゃんプロフィールへのアクセスを招待または承諾する場合でも、そのアクセスを許可する責任は赤ちゃんの保護者または親権者にあります。",
          "子どもに代わってアカウントを作成したり BabyLeveling を利用したりすることはできません。また、提供いただく確認内容の正確性についてはご自身に責任があります。",
        ],
      },
      {
        heading: "アカウントとログイン",
        body: [
          "無料版はアカウントを必要としません。Premium 機能を利用するには、Sign in with Apple またはメールアドレスとパスワードでアカウントを作成し、認証情報およびログインに使用する端末の安全管理はご自身の責任となります。",
          "共有中の赤ちゃんプロフィールに招待した人による入力を含め、ご自身のアカウントの下で行われる活動についてはご自身に責任があります。アカウントが不正にアクセスされたと思われる場合は、速やかに当社までご連絡ください。",
        ],
      },
      {
        heading: "アプリのライセンス",
        body: [
          `${SITE_NAME} は、個人、家族、育児・養育の目的でアプリを利用するための、限定的、非独占的、譲渡不可、取消可能なライセンスを付与します。`,
          "BabyLeveling は、対応する Apple デバイス向けに提供されています。適用法で認められる場合を除き、アプリのコピー、改変、販売、再許諾、リバースエンジニアリングはできません。",
        ],
      },
      {
        heading: "プラットフォーム規約",
        body: [
          "Apple App Store から BabyLeveling をダウンロードする場合、購入、返金、端末権限などに関する Apple App Store の規約およびポリシーも適用されます。",
          "将来 BabyLeveling が Google Play または他のストアで配信される場合、そのストアの規約およびポリシーも適用されることがあります。将来のプラットフォームへの言及は、Android 版が現時点で提供されていることを意味しません。",
          "Apple、その他のプラットフォーム提供者は、それぞれの規約で別途定める場合を除き、本ウェブサイト、ウェイトリスト、または BabyLeveling のサポートについて責任を負いません。",
        ],
      },
      {
        heading: "無料版と Premium サブスクリプション",
        body: [
          "無料版は端末内だけで完結し、アカウントもサーバーバックアップも必要ありません。ご自身で選択しない限り、赤ちゃんのケア記録は端末内に留まります。",
          "Premium は、Apple App Store を通じて課金される任意の有料サブスクリプションであり、ご自身の複数端末間でのクラウド同期、および招待した家族との共有を可能にします。Premium の機能、価格、含まれる内容は将来変更される場合があり、現在の価格、課金サイクル、自動更新の条件は、登録前にアプリ内に表示されます。",
        ],
      },
      {
        heading: "家族共有に関する責任",
        body: [
          "共有中の赤ちゃんプロフィールに他の人を招待する場合、その人の役割(オーナー、編集者、閲覧者)を選択するのはご自身であり、赤ちゃんに関する情報を誰が閲覧・追加できるかを決める責任もご自身にあります。招待された人は、共有中の赤ちゃんデータを閲覧する前に、本規約およびプライバシーポリシーに同意する必要があります。",
          "共有中の赤ちゃんプロフィールから誰かを削除した場合、その人はアプリを通じたそれ以降のアクセス権を失いますが、削除前にその人がすでに閲覧・保存・エクスポートした情報のコピーまで、BabyLeveling が削除することはできません。",
        ],
      },
      {
        heading: "禁止事項",
        body: [
          "違法行為、嫌がらせ、虐待、不正アクセス、許可のないセキュリティテスト、スクレイピング、スパム、または他のご家族の利用を妨げる行為に BabyLeveling を使用することはできません。",
          "他者の権利を侵害する内容、または共有する権限のない情報を送信してはいけません。これには、保護者または親権者としての権限を持たない子どもに関するケア情報も含まれます。",
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
        heading: "支払い、サブスクリプション、返金",
        body: [
          "ウェイトリストへの登録および無料版の利用は無料です。Premium のサブスクリプションおよび引き換えコードは Apple App Store を通じて課金・管理され、Apple のガイドラインに従い、価格、課金サイクル、自動更新の条件は登録前にアプリ内に表示されます。",
          "購入、返金、更新、解約は Apple 自身の規約に従い Apple が処理するため、当社が直接返金を行うことはできません。将来、他のプラットフォームや決済プロバイダーを追加する場合、そこでの購入にはそのストアの規約も適用されます。",
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
          "アプリおよびウェブサイトは、現状有姿かつ提供可能な範囲で提供されます。BabyLeveling が常に中断なく、エラーなく、すべての端末に対応し、すべての国またはストアで利用できること、また、クラウド同期が常に遅延なく利用できることを保証するものではありません。",
          `適用法で認められる最大限の範囲において、${SITE_NAME} は、アプリまたはウェブサイトの利用、あるいはご自身が共有した赤ちゃんプロフィールを他の家族が利用したことから生じる間接的、偶発的、特別、結果的、懲罰的損害、またはデータ損失について責任を負いません。`,
        ],
      },
      {
        heading: "利用の終了",
        body: [
          "いつでも BabyLeveling の利用を停止し、アプリ内の設定からアカウントを削除できます。削除後にデータがどうなるかについては、プライバシーポリシーをご確認ください。本規約への違反、家族共有機能の不正利用があった場合、または法令や App Store のポリシーで求められる場合、当社は Premium 機能へのアクセスを停止または終了することがあります。",
          "知的財産、免責、責任制限、および本条項など、その性質上存続すべき条項は、アカウントの削除またはアクセスの終了後も引き続き効力を有します。",
        ],
      },
      {
        heading: "準拠法および紛争解決",
        body: [
          "本規約のいかなる内容も、米国、日本、カナダ、ベトナムを含む、お住まいの国の強行法規に基づく消費者保護上の権利を制限するものではありません。紛争が生じた場合は、まず下記のメールアドレスまでご連絡いただければ、当社は誠実に協議による解決を試みます。",
        ],
      },
      {
        heading: "変更とお問い合わせ",
        body: [
          "BabyLeveling が新機能、プラットフォーム、または決済オプションを追加する場合、本規約を更新することがあります。重要な変更がある場合は、このページの日付を更新します。",
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
            {index === copy.sections.length - 1 ? (
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
