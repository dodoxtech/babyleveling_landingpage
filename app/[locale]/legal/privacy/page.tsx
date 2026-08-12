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
      "BabyLeveling treats care logs as family records first. This policy explains what stays on your device on the free tier, what Premium cloud sync and family sharing upload to our servers, what the website collects, and the rights available to you depending on where you live.",
    metadataDescription:
      "How BabyLeveling handles on-device baby logs, Premium cloud sync, backups, and family sharing, account and subscription data, Cloudflare storage, waitlist and contact data, our no-AI-training / no-advertising rule, and regional privacy rights under CCPA/CPRA, APPI, PIPEDA, and Decree 13/2023.",
    asideTitle: "Coverage",
    readLabel: "Read",
    contactLinkLabel: "contact page",
    aside: [
      { title: "Free tier", copy: "On-device only, no account required" },
      { title: "Premium", copy: "Account + cloud sync, backups, and family sharing, hosted in the US" },
      { title: "No AI, no ads", copy: "Baby data is never used for AI training or advertising" },
    ],
    sections: [
      {
        heading: "The short version",
        body: [
          "BabyLeveling is built parent-first: the free tier works fully on your device and never leaves it. Premium adds optional cloud sync so invited family members can see the same baby profile — you turn that on, we don't turn it on for you.",
          "We never sell your data, and we don't use your baby's care logs — including health-related entries like feeding, sleep, growth, or medication — to build advertising profiles. The app has no third-party advertising or analytics SDKs.",
          "Because our servers and storage are located in the United States, this policy also covers information specific to Japan (APPI), the United States (CCPA/CPRA), Canada (PIPEDA), and Vietnam (Decree 13/2023/NĐ-CP) further below.",
        ],
      },
      {
        heading: "No AI training, no advertising — ever",
        body: [
          "We will never use your baby's care logs, photos, or videos — health-related or otherwise — to train artificial intelligence or machine-learning models, ours or anyone else's. Your baby's data is used only to run the features you asked for: your own tracker, your own family's sync, and your own backups.",
          "BabyLeveling has no ads, no advertising SDKs, and no advertising profiles built from baby data. We do not sell, rent, or share your baby's information with data brokers or advertisers. This is a hard rule we hold ourselves to, not a setting you have to turn on.",
        ],
      },
      {
        heading: "Who can use BabyLeveling",
        body: [
          "BabyLeveling is for parents, legal guardians, and caregivers acting on a family's behalf — not for children to use directly. When creating an account, you confirm the statement \"I am a parent or legal guardian, and I am at least 18 years old.\"",
          "This confirmation is a self-attestation, not an identity check, similar to how most family and parenting apps work. We record the time it was made so we have a record if it is ever questioned, but we do not independently verify age or guardianship.",
        ],
      },
      {
        heading: "Account and sign-in information",
        body: [
          "The free tier does not require an account. If you unlock Premium or join a shared family, you create an account with Sign in with Apple or an email address and password. With Sign in with Apple, we receive Apple's unique identifier for your account and, if you allow it, your name and email — including a private relay address if you use Apple's \"Hide My Email.\" With email sign-up, we verify the address with a one-time code and store only a securely hashed version of your password.",
          "We also store sign-in sessions as securely hashed, rotating tokens so you can stay signed in, and, if you enable notifications, a push token for your device so we can deliver them.",
        ],
      },
      {
        heading: "Baby care information, photos, and family sharing",
        body: [
          "You may enter baby care information such as feeding, sleep, diaper changes, medication, vaccine and temperature records, growth measurements, milestones, and notes, plus photos or videos you attach to an entry. On the free tier, all of this stays in local storage on your device.",
          "If you turn on Premium cloud sync, this same information — including baby profile details and any photos or videos — is uploaded to our database and to Cloudflare's object storage so it can be shared across your own devices and with family members you invite. Health-related entries such as feeding, sleep, growth, medication, vaccines, and temperature are sensitive information; syncing them only happens because you actively chose to enable Premium and entered that data yourself.",
          "To share a baby profile, you invite caregivers by email and assign a role — owner, editor, or viewer — and may label their relationship to the baby (for example mother, father, grandparent, caregiver, doctor, or a custom label). Invited members can see or add information for that baby profile according to the role you grant, and the owner can change or revoke access at any time. Family sharing only ever happens between the people you specifically invite to that baby profile — we do not combine or compare data across different families' babies for any purpose, including advertising or AI training.",
        ],
      },
      {
        heading: "Backups",
        body: [
          "If you use Premium, we also create periodic point-in-time backup snapshots of your baby's activity logs and a reference list of your photos and videos — separate from the everyday sync described above — so you can restore your data if something goes wrong. A snapshot is created automatically the first time you subscribe, roughly daily whenever your baby profile has changes, and any time you trigger one manually.",
          "A backup snapshot is stored on Cloudflare in the United States as a data export plus a manifest referencing your existing media; it does not create extra copies of your photos or videos. Older snapshots are deleted automatically as new ones are made, and we always keep at least your most recent backup while your subscription is active.",
        ],
      },
      {
        heading: "Subscription and billing information",
        body: [
          "Premium subscriptions and one-time redeem codes are processed by Apple through the App Store and StoreKit. We receive a transaction identifier, product, and subscription status from Apple — we do not receive or store your card number or other payment details.",
          "If we add other payment providers in the future, this policy will be updated before that provider processes any payment on our behalf.",
        ],
      },
      {
        heading: "Device, security, and diagnostic information",
        body: [
          "To protect the service, we use Apple's App Attest to verify that requests come from a genuine, unmodified copy of the app. This can include an anonymous crash or error report from your device, verified the same way, even before you sign in; these reports are not linked to your name or baby data.",
          "If you are signed in, diagnostic or support information you send us — for example through the in-app feedback form or a bug report — is linked to your account so we can follow up with you.",
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
        heading: "How we use your information",
        body: [
          "We use the information above to operate the app (showing your baby tracker, RPG progress, level-up moments, and activity history), to sync and share data you choose to sync or share, to authenticate you and keep your account secure, to process subscriptions, to respond to support and contact requests, to send account-related emails such as one-time codes, family invitations, and deletion confirmations, and to maintain and improve the app and website.",
          "We do not use baby care data — sensitive or otherwise — to train AI or machine-learning models, to build advertising profiles, or to serve ads, and we do not sell or rent it to data brokers or advertisers.",
        ],
      },
      {
        heading: "Consent, sensitive data, and your choices",
        body: [
          "Entering baby care data, including health-related entries, and choosing to enable Premium cloud sync are actions you take deliberately, and we treat them as your consent to process that information for the purposes described in this policy. Where local law expects a more specific form of consent for sensitive data, such as health information about a child, we rely on your guardian confirmation together with your active choice to enter and sync that data.",
          "You can withdraw consent to cloud sync at any time by turning it off in Settings or by deleting your account, which stops future syncing and starts the deletion process described below. Withdrawing consent does not affect the lawfulness of processing that already happened.",
        ],
      },
      {
        heading: "Subprocessors and international data transfers",
        body: [
          "Our database and Cloudflare R2 object storage, used for photos, videos, and backups, are located in the United States. SendGrid (Twilio), our email delivery provider, and Apple's Sign in with Apple, StoreKit, App Attest, and push notification services also process data on our behalf, primarily from the United States.",
          "If you use BabyLeveling from Japan, Canada, Vietnam, or any other country outside the United States, using Premium features means your account and baby care data are transferred to and stored in the United States. We rely on contractual and technical safeguards with our providers, including encryption in transit and access controls, to protect that data during and after transfer. The free, local-only tier does not involve any cross-border transfer, because nothing leaves your device.",
        ],
      },
      {
        heading: "Your regional privacy rights",
        body: [
          "United States — California (CCPA/CPRA). Health-related baby care data is \"sensitive personal information\" under California law. We do not sell or share personal information for cross-context behavioral advertising. You may ask to know, access, correct, or delete your personal information, or limit our use of sensitive personal information, by emailing the address below. We will not discriminate against you for exercising these rights.",
          "Japan (APPI, 個人情報保護法). We collect and use each category of information described above only for the purposes stated in this policy. Because our servers are in the United States, using Premium features involves a cross-border transfer (外国にある第三者への提供) of your personal information to the United States; we take reasonable measures with our providers to protect it there. You can contact us about our purpose of use, or to request disclosure, correction, or deletion of your information, or to stop its use, and we will respond in line with the APPI and guidance from the Personal Information Protection Commission (PPC).",
          "Canada (PIPEDA and Quebec's Law 25). We collect, use, and retain only the information needed for the features described here, explained in plain language, and we will notify affected users and the Office of the Privacy Commissioner of Canada if a breach creates a real risk of significant harm. You may withdraw consent, request access to or correction of your information, or file a complaint with the OPC or, if you are in Quebec, with the Commission d'accès à l'information.",
          "Vietnam (Nghị định 13/2023/NĐ-CP). Personal data about children and health-related data are treated as sensitive personal data under Vietnamese law. We rely on your affirmative action — entering baby care data and choosing to enable Premium sync, together with the guardian confirmation described above — as your consent, and you can withdraw it at any time. Because our servers are located outside Vietnam, using Premium features involves transferring your personal data abroad. You may contact us to access, correct, delete, or restrict processing of your data, to withdraw consent, or to ask how to raise a concern with the competent authority.",
        ],
      },
      {
        heading: "Data retention and deletion",
        body: [
          "Local app data stays on your device until you delete it in the app, delete the app, erase the device, or remove the related device backup through your platform settings.",
          "If you use Premium, cloud-synced baby profiles, activity logs, and media stay on our servers while your account is active. If you delete your account from Settings in the app, we immediately mark your account and email address for deletion and revoke your sessions, then permanently delete your account, database records, and files stored on Cloudflare — including photos, videos, and backups — within 30 days, and send a confirmation email once that is complete.",
          "If a family member is removed from a shared baby profile, they lose further access to it through the app, but information already synced to their own device before removal may remain there until they delete it locally.",
          `To remove waitlist or contact data collected through the website, email ${CONTACT_EMAIL} from the address you used. We will remove it from active records within 30 days unless we need to keep a limited record for security, fraud prevention, or legal reasons.`,
        ],
      },
      {
        heading: "Children's privacy",
        body: [
          "BabyLeveling is for parents, guardians, and caregivers. It is not intended for children to create accounts, submit contact information, join the website waitlist, or otherwise interact with us directly.",
          "Adults enter information about a child for family care tracking after confirming they are the child's parent or legal guardian. We do not knowingly collect personal information directly from children, and we do not knowingly let a child create an account.",
        ],
      },
      {
        heading: "Changes to this policy",
        body: [
          "We may update this policy as BabyLeveling adds features such as new platforms, sharing options, or payment providers. We will update the date at the top of this page whenever we make a material change, and, where required, we will provide additional notice before that change takes effect.",
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
      "BabyLeveling xem nhật ký chăm sóc bé là dữ liệu của gia đình trước hết. Chính sách này nói rõ dữ liệu nào ở lại trên thiết bị với bản miễn phí, dữ liệu nào được tải lên máy chủ khi bạn bật đồng bộ đám mây và chia sẻ gia đình ở bản Premium, website thu thập gì, và các quyền bạn có tùy theo nơi bạn sinh sống.",
    metadataDescription:
      "Cách BabyLeveling xử lý nhật ký chăm sóc bé trên thiết bị, đồng bộ đám mây, sao lưu (backup) và chia sẻ gia đình ở bản Premium, dữ liệu tài khoản và thuê bao, lưu trữ trên Cloudflare, dữ liệu danh sách chờ/liên hệ, nguyên tắc không dùng dữ liệu để huấn luyện AI hay quảng cáo, và quyền riêng tư theo khu vực theo CCPA/CPRA, APPI, PIPEDA và Nghị định 13/2023.",
    asideTitle: "Phạm vi",
    readLabel: "Đọc",
    contactLinkLabel: "trang liên hệ",
    aside: [
      { title: "Bản miễn phí", copy: "Chỉ lưu trên thiết bị, không cần tài khoản" },
      { title: "Bản Premium", copy: "Cần tài khoản + đồng bộ đám mây, sao lưu và chia sẻ gia đình, đặt tại Mỹ" },
      { title: "Không AI, không quảng cáo", copy: "Dữ liệu của bé không bao giờ dùng để huấn luyện AI hay quảng cáo" },
    ],
    sections: [
      {
        heading: "Bản ngắn gọn",
        body: [
          "BabyLeveling được xây dựng vì phụ huynh trước tiên: bản miễn phí hoạt động hoàn toàn trên thiết bị của bạn và không rời khỏi đó. Bản Premium bổ sung tùy chọn đồng bộ đám mây để các thành viên gia đình được mời có thể xem cùng một hồ sơ bé — bạn là người bật tính năng này, chúng tôi không tự ý bật cho bạn.",
          "Chúng tôi không bao giờ bán dữ liệu của bạn, và không dùng nhật ký chăm sóc bé — kể cả các mục liên quan sức khỏe như cữ bú, giấc ngủ, tăng trưởng hay thuốc — để xây dựng hồ sơ quảng cáo. App không tích hợp SDK quảng cáo hay analytics của bên thứ ba.",
          "Vì máy chủ và nơi lưu trữ của chúng tôi đặt tại Hoa Kỳ, chính sách này cũng nêu rõ các nội dung riêng cho Nhật Bản (APPI), Hoa Kỳ (CCPA/CPRA), Canada (PIPEDA) và Việt Nam (Nghị định 13/2023/NĐ-CP) ở phần bên dưới.",
        ],
      },
      {
        heading: "Không dùng để huấn luyện AI, không quảng cáo — tuyệt đối",
        body: [
          "Chúng tôi tuyệt đối không bao giờ dùng nhật ký chăm sóc, ảnh hoặc video của bé — dù liên quan sức khỏe hay không — để huấn luyện trí tuệ nhân tạo (AI) hay mô hình máy học (machine learning), dù là của chúng tôi hay của bất kỳ bên nào khác. Dữ liệu của bé chỉ được dùng để vận hành đúng những tính năng bạn yêu cầu: nhật ký của riêng bạn, đồng bộ cho gia đình bạn, và bản sao lưu của bạn.",
          "BabyLeveling không có quảng cáo, không tích hợp SDK quảng cáo, và không xây dựng hồ sơ quảng cáo từ dữ liệu của bé. Chúng tôi không bán, cho thuê hay chia sẻ thông tin của bé với data broker hay nhà quảng cáo. Đây là nguyên tắc bất di bất dịch của chúng tôi, không phải một tùy chọn bạn cần tự bật lên.",
        ],
      },
      {
        heading: "Ai có thể sử dụng BabyLeveling",
        body: [
          "BabyLeveling dành cho ba mẹ, người giám hộ hợp pháp và người chăm sóc thay mặt gia đình — không dành cho trẻ em tự sử dụng trực tiếp. Khi tạo tài khoản, bạn xác nhận tuyên bố \"Tôi là ba/mẹ hoặc người giám hộ hợp pháp, và tôi từ 18 tuổi trở lên.\"",
          "Đây là hình thức tự xác nhận (self-attestation), không phải xác minh danh tính, tương tự cách hầu hết các app gia đình và nuôi dạy con vận hành. Chúng tôi ghi lại thời điểm xác nhận để có bằng chứng nếu bị đặt câu hỏi, nhưng không tự xác minh độc lập về độ tuổi hay vai trò giám hộ.",
        ],
      },
      {
        heading: "Thông tin tài khoản và đăng nhập",
        body: [
          "Bản miễn phí không yêu cầu tài khoản. Nếu bạn mở khóa Premium hoặc tham gia một gia đình được chia sẻ, bạn sẽ tạo tài khoản bằng Sign in with Apple hoặc email và mật khẩu. Với Sign in with Apple, chúng tôi nhận mã định danh duy nhất từ Apple cho tài khoản của bạn và, nếu bạn cho phép, tên và email — kể cả địa chỉ ẩn danh nếu bạn dùng tính năng \"Ẩn email\" (Hide My Email) của Apple. Khi đăng ký bằng email, chúng tôi xác minh địa chỉ bằng mã dùng một lần và chỉ lưu bản băm (hash) an toàn của mật khẩu, không lưu mật khẩu gốc.",
          "Chúng tôi cũng lưu phiên đăng nhập dưới dạng token đã băm và luân phiên thay đổi để giữ bạn đăng nhập, và nếu bạn bật thông báo, một mã thiết bị (push token) để gửi thông báo đến bạn.",
        ],
      },
      {
        heading: "Thông tin chăm sóc bé, ảnh/video và chia sẻ gia đình",
        body: [
          "Bạn có thể nhập thông tin chăm sóc bé như cữ bú, giấc ngủ, thay tã, thuốc, tiêm chủng và nhiệt độ, số đo tăng trưởng, cột mốc phát triển, ghi chú, cùng ảnh hoặc video đính kèm mục ghi. Ở bản miễn phí, toàn bộ dữ liệu này chỉ lưu cục bộ trên thiết bị của bạn.",
          "Nếu bạn bật đồng bộ đám mây của Premium, chính những thông tin này — bao gồm hồ sơ bé và mọi ảnh/video — sẽ được tải lên cơ sở dữ liệu của chúng tôi và bộ nhớ đối tượng của Cloudflare, để có thể chia sẻ giữa các thiết bị của bạn và với thành viên gia đình bạn mời. Các mục liên quan sức khỏe như cữ bú, giấc ngủ, tăng trưởng, thuốc, tiêm chủng, nhiệt độ là thông tin nhạy cảm; việc đồng bộ chỉ xảy ra vì bạn chủ động chọn bật Premium và tự nhập dữ liệu đó.",
          "Để chia sẻ hồ sơ bé, bạn mời người chăm sóc qua email và gán vai trò — chủ sở hữu (owner), người chỉnh sửa (editor) hoặc người xem (viewer) — và có thể gắn nhãn mối quan hệ với bé (ví dụ mẹ, ba, ông/bà, người chăm sóc, bác sĩ, hoặc nhãn tùy chỉnh). Thành viên được mời có thể xem hoặc thêm thông tin cho hồ sơ bé đó theo đúng vai trò bạn cấp, và người chủ sở hữu có thể thay đổi hoặc thu hồi quyền truy cập bất cứ lúc nào. Việc chia sẻ gia đình chỉ diễn ra giữa những người bạn chủ động mời vào hồ sơ bé đó — chúng tôi không gộp hay đối chiếu dữ liệu giữa các gia đình khác nhau cho bất kỳ mục đích nào, kể cả quảng cáo hay huấn luyện AI.",
        ],
      },
      {
        heading: "Sao lưu (backup)",
        body: [
          "Nếu bạn dùng Premium, chúng tôi còn tạo các bản sao lưu (backup) theo thời điểm cho nhật ký hoạt động của bé và danh sách tham chiếu ảnh/video của bạn — tách biệt với việc đồng bộ hàng ngày đã mô tả ở trên — để bạn có thể khôi phục dữ liệu nếu có sự cố. Một bản sao lưu được tạo tự động ngay lần đầu bạn đăng ký Premium, khoảng mỗi ngày nếu hồ sơ bé có thay đổi, và bất cứ khi nào bạn chủ động kích hoạt.",
          "Bản sao lưu được lưu trên Cloudflare tại Hoa Kỳ dưới dạng một bản xuất dữ liệu cùng bản kê tham chiếu tới media hiện có của bạn; việc này không tạo thêm bản sao ảnh/video nào khác. Các bản sao lưu cũ sẽ tự động bị xóa khi có bản mới, và chúng tôi luôn giữ lại ít nhất bản sao lưu gần nhất trong khi thuê bao của bạn còn hoạt động.",
        ],
      },
      {
        heading: "Thông tin thuê bao và thanh toán",
        body: [
          "Thuê bao Premium và mã đổi thưởng dùng một lần được Apple xử lý qua App Store và StoreKit. Chúng tôi nhận mã giao dịch, sản phẩm và trạng thái thuê bao từ Apple — chúng tôi không nhận hay lưu trữ số thẻ hay thông tin thanh toán khác của bạn.",
          "Nếu sau này chúng tôi bổ sung nhà cung cấp thanh toán khác, chính sách này sẽ được cập nhật trước khi nhà cung cấp đó xử lý bất kỳ khoản thanh toán nào thay mặt chúng tôi.",
        ],
      },
      {
        heading: "Thông tin thiết bị, bảo mật và chẩn đoán",
        body: [
          "Để bảo vệ dịch vụ, chúng tôi dùng App Attest của Apple để xác minh yêu cầu đến từ một bản app chính hãng, không bị chỉnh sửa. Việc này có thể bao gồm báo cáo lỗi/crash ẩn danh từ thiết bị của bạn, được xác minh theo cùng cách, ngay cả trước khi bạn đăng nhập; các báo cáo này không gắn với tên hay dữ liệu của bé.",
          "Nếu bạn đã đăng nhập, thông tin chẩn đoán hoặc hỗ trợ bạn gửi cho chúng tôi — ví dụ qua form phản hồi trong app hoặc báo lỗi — sẽ được gắn với tài khoản của bạn để chúng tôi có thể phản hồi.",
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
        heading: "Cách chúng tôi sử dụng thông tin của bạn",
        body: [
          "Chúng tôi dùng các thông tin trên để vận hành app (hiển thị nhật ký chăm sóc, tiến trình RPG, khoảnh khắc lên cấp và lịch sử hoạt động), để đồng bộ và chia sẻ dữ liệu mà bạn chọn đồng bộ hoặc chia sẻ, để xác thực và bảo vệ tài khoản của bạn, để xử lý thuê bao, để phản hồi yêu cầu hỗ trợ và liên hệ, để gửi email liên quan tài khoản như mã dùng một lần, lời mời gia đình và xác nhận xóa tài khoản, và để duy trì, cải thiện app và website.",
          "Chúng tôi không dùng dữ liệu chăm sóc bé — dù nhạy cảm hay không — để huấn luyện AI hay mô hình máy học, để xây dựng hồ sơ quảng cáo, hoặc để hiển thị quảng cáo, và không bán hay cho thuê dữ liệu này cho data broker hay nhà quảng cáo.",
        ],
      },
      {
        heading: "Đồng ý, dữ liệu nhạy cảm và lựa chọn của bạn",
        body: [
          "Việc bạn nhập dữ liệu chăm sóc bé, kể cả các mục liên quan sức khỏe, và việc bạn chọn bật đồng bộ đám mây của Premium là hành động bạn chủ động thực hiện; chúng tôi xem đây là sự đồng ý của bạn để xử lý thông tin đó cho các mục đích nêu trong chính sách này. Ở nơi pháp luật yêu cầu hình thức đồng ý cụ thể hơn cho dữ liệu nhạy cảm — ví dụ thông tin sức khỏe của trẻ em — chúng tôi dựa vào xác nhận vai trò giám hộ nêu trên cùng với hành động chủ động nhập và đồng bộ dữ liệu của bạn.",
          "Bạn có thể rút lại sự đồng ý đồng bộ đám mây bất cứ lúc nào bằng cách tắt trong Cài đặt hoặc xóa tài khoản, việc này sẽ dừng đồng bộ trong tương lai và bắt đầu quy trình xóa dữ liệu mô tả bên dưới. Việc rút lại đồng ý không ảnh hưởng đến tính hợp pháp của việc xử lý dữ liệu đã diễn ra trước đó.",
        ],
      },
      {
        heading: "Bên xử lý dữ liệu thứ ba và chuyển dữ liệu ra nước ngoài",
        body: [
          "Cơ sở dữ liệu và bộ nhớ đối tượng Cloudflare R2 (dùng cho ảnh, video và bản sao lưu) của chúng tôi đặt tại Hoa Kỳ. SendGrid (Twilio) — nhà cung cấp dịch vụ gửi email — và các dịch vụ Sign in with Apple, StoreKit, App Attest, thông báo đẩy của Apple cũng xử lý dữ liệu thay mặt chúng tôi, chủ yếu từ Hoa Kỳ.",
          "Nếu bạn dùng BabyLeveling từ Nhật Bản, Canada, Việt Nam hoặc bất kỳ quốc gia nào ngoài Hoa Kỳ, việc dùng tính năng Premium đồng nghĩa tài khoản và dữ liệu chăm sóc bé của bạn được chuyển đến và lưu trữ tại Hoa Kỳ. Chúng tôi dựa vào các biện pháp bảo vệ theo hợp đồng và kỹ thuật với các nhà cung cấp, bao gồm mã hóa khi truyền dữ liệu và kiểm soát truy cập, để bảo vệ dữ liệu trong và sau khi chuyển. Bản miễn phí chỉ lưu cục bộ không liên quan đến việc chuyển dữ liệu ra nước ngoài, vì không có dữ liệu nào rời khỏi thiết bị của bạn.",
        ],
      },
      {
        heading: "Quyền riêng tư theo khu vực của bạn",
        body: [
          "Hoa Kỳ — California (CCPA/CPRA). Dữ liệu chăm sóc bé liên quan sức khỏe là \"thông tin cá nhân nhạy cảm\" (sensitive personal information) theo luật California. Chúng tôi không bán hay chia sẻ thông tin cá nhân cho mục đích quảng cáo hành vi xuyên bối cảnh. Bạn có thể yêu cầu biết, truy cập, chỉnh sửa hoặc xóa thông tin cá nhân, hoặc giới hạn việc chúng tôi sử dụng thông tin cá nhân nhạy cảm, bằng cách email theo địa chỉ bên dưới. Chúng tôi sẽ không phân biệt đối xử với bạn vì thực hiện các quyền này.",
          "Nhật Bản (APPI, 個人情報保護法). Chúng tôi chỉ thu thập và sử dụng từng loại thông tin nêu trên cho đúng mục đích đã nêu trong chính sách này. Vì máy chủ của chúng tôi đặt tại Hoa Kỳ, việc dùng tính năng Premium bao gồm việc chuyển dữ liệu cá nhân của bạn ra nước ngoài (外国にある第三者への提供) sang Hoa Kỳ; chúng tôi áp dụng các biện pháp hợp lý cùng nhà cung cấp để bảo vệ dữ liệu ở đó. Bạn có thể liên hệ chúng tôi để hỏi về mục đích sử dụng, yêu cầu công bố, chỉnh sửa, xóa thông tin, hoặc yêu cầu ngừng sử dụng, và chúng tôi sẽ phản hồi phù hợp với APPI và hướng dẫn của Ủy ban Bảo vệ Thông tin Cá nhân (PPC).",
          "Canada (PIPEDA và Đạo luật 25 của Quebec). Chúng tôi chỉ thu thập, sử dụng và lưu giữ thông tin cần thiết cho các tính năng đã mô tả, được giải thích bằng ngôn ngữ dễ hiểu, và sẽ thông báo cho người dùng bị ảnh hưởng cũng như Văn phòng Ủy viên Bảo vệ Quyền riêng tư Canada (OPC) nếu sự cố tạo ra rủi ro tổn hại nghiêm trọng thực sự. Bạn có thể rút lại sự đồng ý, yêu cầu truy cập hoặc chỉnh sửa thông tin, hoặc khiếu nại với OPC hoặc, nếu bạn ở Quebec, với Commission d'accès à l'information.",
          "Việt Nam (Nghị định 13/2023/NĐ-CP). Dữ liệu cá nhân của trẻ em và dữ liệu liên quan sức khỏe được coi là dữ liệu cá nhân nhạy cảm theo pháp luật Việt Nam. Chúng tôi dựa vào hành động chủ động của bạn — nhập dữ liệu chăm sóc bé và chọn bật đồng bộ Premium, cùng với xác nhận vai trò giám hộ nêu trên — như sự đồng ý của bạn, và bạn có thể rút lại sự đồng ý này bất cứ lúc nào. Vì máy chủ của chúng tôi đặt ngoài lãnh thổ Việt Nam, việc dùng tính năng Premium bao gồm việc chuyển dữ liệu cá nhân của bạn ra nước ngoài. Bạn có thể liên hệ chúng tôi để truy cập, chỉnh sửa, xóa hoặc hạn chế việc xử lý dữ liệu, để rút lại sự đồng ý, hoặc để hỏi cách phản ánh với cơ quan có thẩm quyền.",
        ],
      },
      {
        heading: "Lưu giữ và xóa dữ liệu",
        body: [
          "Dữ liệu app lưu local sẽ ở trên thiết bị cho đến khi bạn xóa trong app, xóa app, xóa thiết bị, hoặc xóa bản sao lưu liên quan qua cài đặt nền tảng.",
          "Nếu bạn dùng Premium, hồ sơ bé, nhật ký hoạt động và media đã đồng bộ đám mây sẽ lưu trên máy chủ của chúng tôi trong thời gian tài khoản còn hoạt động. Nếu bạn xóa tài khoản từ Cài đặt trong app, chúng tôi ngay lập tức đánh dấu tài khoản và địa chỉ email của bạn để xóa và thu hồi các phiên đăng nhập, sau đó xóa vĩnh viễn tài khoản, bản ghi trong cơ sở dữ liệu và tệp lưu trên Cloudflare — bao gồm ảnh, video và bản sao lưu — trong vòng 30 ngày, và gửi email xác nhận khi hoàn tất.",
          "Nếu một thành viên gia đình bị xóa khỏi hồ sơ bé được chia sẻ, họ sẽ mất quyền truy cập tiếp theo qua app, nhưng thông tin đã đồng bộ về thiết bị riêng của họ trước khi bị xóa có thể vẫn còn ở đó cho đến khi họ tự xóa cục bộ.",
          `Để xóa dữ liệu danh sách chờ hoặc liên hệ thu thập qua website, hãy email ${CONTACT_EMAIL} từ địa chỉ bạn đã dùng. Chúng tôi sẽ xóa dữ liệu khỏi hồ sơ đang hoạt động trong vòng 30 ngày, trừ khi cần giữ một bản ghi giới hạn vì bảo mật, chống gian lận hoặc lý do pháp lý.`,
        ],
      },
      {
        heading: "Quyền riêng tư của trẻ em",
        body: [
          "BabyLeveling dành cho ba mẹ, người giám hộ và người chăm sóc. App không được thiết kế để trẻ tự tạo tài khoản, gửi thông tin liên hệ, tham gia danh sách chờ trên website hoặc tương tác trực tiếp với chúng tôi theo cách khác.",
          "Người lớn nhập thông tin về trẻ để theo dõi việc chăm sóc trong gia đình sau khi đã xác nhận họ là ba/mẹ hoặc người giám hộ hợp pháp của trẻ. Chúng tôi không cố ý thu thập thông tin cá nhân trực tiếp từ trẻ em, và không cố ý cho phép trẻ em tự tạo tài khoản.",
        ],
      },
      {
        heading: "Thay đổi chính sách này",
        body: [
          "Chúng tôi có thể cập nhật chính sách này khi BabyLeveling bổ sung tính năng như nền tảng mới, tùy chọn chia sẻ hoặc nhà cung cấp thanh toán mới. Chúng tôi sẽ cập nhật ngày ở đầu trang này mỗi khi có thay đổi quan trọng, và khi pháp luật yêu cầu, chúng tôi sẽ thông báo thêm trước khi thay đổi đó có hiệu lực.",
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
      "BabyLeveling は、赤ちゃんのケア記録をまず家族の記録として扱います。このポリシーでは、無料版で端末内に残るデータ、Premium のクラウド同期・家族共有でサーバーに送信される情報、ウェブサイトで収集する情報、そしてお住まいの地域に応じて利用できる権利について説明します。",
    metadataDescription:
      "BabyLeveling における端末内の育児記録、Premium のクラウド同期・バックアップ・家族共有、アカウントおよびサブスクリプション情報、Cloudflare でのデータ保存、ウェイトリスト・お問い合わせデータ、AI学習・広告に一切利用しないという方針、CCPA/CPRA・APPI・PIPEDA・ベトナム政令13号に基づく地域別プライバシー権について。",
    asideTitle: "対象範囲",
    readLabel: "読む",
    contactLinkLabel: "お問い合わせページ",
    aside: [
      { title: "無料版", copy: "端末内のみ保存、アカウント不要" },
      { title: "Premium", copy: "アカウント必須 + クラウド同期・バックアップ・家族共有、米国で保存" },
      { title: "AI学習・広告なし", copy: "赤ちゃんのデータを AI学習や広告に利用することは一切ありません" },
    ],
    sections: [
      {
        heading: "要点",
        body: [
          "BabyLeveling は保護者を第一に考えて設計されています。無料版は端末内だけで完結し、端末の外へ出ることはありません。Premium では任意でクラウド同期を有効にでき、招待した家族が同じ赤ちゃんプロフィールを見られるようになります — 有効にするかどうかは常にご自身の選択であり、当社が勝手に有効化することはありません。",
          "当社は利用者のデータを販売することは一切なく、授乳、睡眠、成長、服薬などの健康に関わる記録を含め、赤ちゃんのケア記録を広告プロファイルの構築に利用することもありません。アプリには第三者の広告 SDK や分析 SDK は組み込まれていません。",
          "当社のサーバーおよびストレージは米国にあるため、本ポリシーでは以下に、日本(APPI)、米国(CCPA/CPRA)、カナダ(PIPEDA)、ベトナム(政令13/2023/NĐ-CP号)に関する固有の内容も記載しています。",
        ],
      },
      {
        heading: "AI学習にも広告にも利用しません",
        body: [
          "当社は、健康に関わる記録であるか否かにかかわらず、赤ちゃんのケア記録・写真・動画を、当社自身のものであれ他社のものであれ、人工知能(AI)や機械学習モデルの学習に利用することは決してありません。赤ちゃんのデータは、ご自身のケア記録、ご自身の家族間の同期、ご自身のバックアップなど、利用者が求めた機能を提供するためだけに使われます。",
          "BabyLeveling には広告がなく、広告 SDK も組み込まれておらず、赤ちゃんのデータから広告プロファイルを構築することもありません。データブローカーや広告主への販売・貸与・共有も行いません。これは有効/無効を選ぶ設定項目ではなく、当社が自らに課している絶対的な原則です。",
        ],
      },
      {
        heading: "利用対象",
        body: [
          "BabyLeveling は、保護者、親権者、および家族に代わって行動する養育者のためのサービスであり、子ども本人が直接利用することを想定していません。アカウント作成時には、「私は保護者または親権者であり、18歳以上です」という宣誓を確認していただきます。",
          "この確認は、多くの家族・育児向けアプリと同様に、自己申告であり本人確認ではありません。当社は確認が行われた日時を記録し、後日問い合わせがあった場合の記録として保持しますが、年齢や保護者としての立場を独自に検証するものではありません。",
        ],
      },
      {
        heading: "アカウントおよびログイン情報",
        body: [
          "無料版はアカウントを必要としません。Premium を利用する場合や、共有された家族グループに参加する場合は、Sign in with Apple、またはメールアドレスとパスワードでアカウントを作成します。Sign in with Apple を利用する場合、Apple が発行する一意の識別子を受け取り、許可いただければ氏名とメールアドレス(Apple の「メールを非公開」機能を利用した場合は非公開のリレーアドレスを含む)も受け取ります。メールで登録する場合は、ワンタイムコードでアドレスを確認し、パスワードは安全にハッシュ化した状態でのみ保存します。",
          "また、ログイン状態を維持するために、安全にハッシュ化されローテーションするログインセッションのトークンを保存し、通知を有効にした場合は通知を届けるための端末のプッシュトークンも保存します。",
        ],
      },
      {
        heading: "育児記録・写真/動画・家族共有",
        body: [
          "授乳、睡眠、おむつ替え、服薬、予防接種・体温の記録、身長・体重などの成長記録、マイルストーン、メモ、記録に添付する写真や動画を入力できます。無料版では、これらはすべて端末内のローカルストレージにのみ保存されます。",
          "Premium のクラウド同期を有効にすると、赤ちゃんプロフィールの情報や写真・動画を含む同じ情報が、当社のデータベースおよび Cloudflare のオブジェクトストレージへアップロードされ、ご自身の複数端末や招待した家族の間で共有できるようになります。授乳、睡眠、成長、服薬、予防接種、体温などの健康に関わる記録は機微な情報として扱われ、同期はあくまで利用者が自ら Premium を有効化し、そのデータを入力したことによってのみ発生します。",
          "赤ちゃんプロフィールを共有する際は、メールで養育者を招待し、オーナー・編集者・閲覧者のいずれかの役割を割り当てます。また、母、父、祖父母、養育者、医師、またはカスタムラベルなど、赤ちゃんとの関係をラベル付けすることもできます。招待された人は、付与された役割に応じてその赤ちゃんプロフィールの情報を閲覧・追加でき、オーナーはいつでもアクセス権を変更・取り消しできます。家族共有は、その赤ちゃんプロフィールに利用者が個別に招待した人との間でのみ行われます。広告や AI 学習を含むいかなる目的であっても、異なる家族間でデータを統合したり突き合わせたりすることはありません。",
        ],
      },
      {
        heading: "バックアップ",
        body: [
          "Premium をご利用の場合、上記の日常的な同期とは別に、赤ちゃんのケア記録と写真・動画の参照リストについて、特定時点のバックアップも作成します。これにより、万一の際にデータを復元できます。バックアップは、Premium にご登録いただいた際に自動的に作成されるほか、赤ちゃんプロフィールに変更があった場合はおおむね毎日、また利用者が手動で作成した場合にも作成されます。",
          "バックアップは、データのエクスポートと、既存のメディアを参照するマニフェストという形で、米国にある Cloudflare 上に保存されます。写真や動画のコピーが新たに作られるわけではありません。古いバックアップは新しいバックアップが作成されるたびに自動的に削除されますが、サブスクリプションが有効である限り、少なくとも最新のバックアップは常に保持されます。",
        ],
      },
      {
        heading: "サブスクリプションおよび決済情報",
        body: [
          "Premium のサブスクリプションおよび1回限りの引き換えコードは、Apple が App Store と StoreKit を通じて処理します。当社が Apple から受け取るのは取引ID、プロダクト、サブスクリプション状態のみであり、カード番号などの決済情報を受け取ったり保存したりすることはありません。",
          "将来、他の決済プロバイダーを追加する場合は、そのプロバイダーが当社に代わって決済処理を行う前に、本ポリシーを更新します。",
        ],
      },
      {
        heading: "端末・セキュリティ・診断情報",
        body: [
          "サービスを保護するため、当社は Apple の App Attest を用いて、リクエストが正規かつ改変されていないアプリから送信されていることを確認します。この仕組みには、サインイン前であっても、同様の方法で検証された匿名のクラッシュ・エラーレポートが含まれる場合がありますが、これらは氏名や赤ちゃんのデータとは紐付けられません。",
          "サインイン済みの場合、アプリ内のフィードバックフォームや不具合報告などを通じて送信いただいた診断・サポート情報は、対応のためにアカウントと紐付けられます。",
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
        heading: "情報の利用目的",
        body: [
          "上記の情報は、アプリの機能提供(育児記録、RPG の進行、レベルアップ演出、履歴の表示)、利用者が選択した範囲でのデータ同期・共有、本人確認とアカウントの安全確保、サブスクリプションの処理、サポート・お問い合わせへの対応、ワンタイムコード・家族招待・削除完了通知などアカウントに関するメール送信、そしてアプリとウェブサイトの維持・改善のために利用します。",
          "赤ちゃんのケア記録は、機微な情報であるか否かにかかわらず、AI・機械学習モデルの学習、広告プロファイルの構築、広告配信のいずれにも利用しません。また、データブローカーや広告主への販売・貸与も行いません。",
        ],
      },
      {
        heading: "同意、機微な情報、利用者の選択",
        body: [
          "健康に関わる記録を含む育児記録の入力、および Premium のクラウド同期を有効にする選択は、いずれも利用者が自ら行う行為であり、当社はこれを本ポリシーに記載した目的でその情報を取り扱うことへの同意として扱います。子どもの健康情報のような機微な情報について、現地法がより具体的な同意の形式を求める場合、当社は前述の保護者確認と、データを入力・同期するという利用者の能動的な選択の両方に依拠します。",
          "クラウド同期への同意は、設定画面でオフにする、またはアカウントを削除することで、いつでも撤回できます。これにより今後の同期は停止し、下記の削除手続きが開始されます。同意の撤回は、それ以前に行われた取り扱いの適法性には影響しません。",
        ],
      },
      {
        heading: "委託先および国境を越えたデータ移転",
        body: [
          "写真、動画、バックアップに利用するデータベースおよび Cloudflare R2 オブジェクトストレージは米国にあります。メール配信を担う SendGrid(Twilio)、および Apple の Sign in with Apple、StoreKit、App Attest、プッシュ通知サービスも、主に米国から当社に代わってデータを処理します。",
          "日本、カナダ、ベトナムなど米国以外の国から BabyLeveling を利用する場合、Premium 機能を利用することは、アカウント情報および育児記録が米国へ移転・保存されることを意味します。当社は、通信の暗号化やアクセス制御を含む、委託先との契約上・技術上の保護措置に基づき、移転前後のデータを保護します。端末内のみで完結する無料版では、データが端末外へ出ることがないため、国境を越えたデータ移転は発生しません。",
        ],
      },
      {
        heading: "地域ごとのプライバシー権",
        body: [
          "米国 — カリフォルニア州(CCPA/CPRA)。健康に関わる育児記録は、カリフォルニア州法上の「機微な個人情報(sensitive personal information)」に該当します。当社は、コンテキストを越えた行動ターゲティング広告のために個人情報を販売・共有することはありません。下記の連絡先へメールいただくことで、個人情報の開示・アクセス・訂正・削除の請求、または機微な個人情報の利用制限を求めることができます。これらの権利行使を理由に不利益な取り扱いを行うことはありません。",
          "日本(個人情報保護法、APPI)。当社は、上記で説明した各種の情報について、本ポリシーに記載した目的の範囲でのみ収集・利用します。当社のサーバーは米国にあるため、Premium 機能の利用には、個人情報の外国にある第三者への提供が伴います。当社は委託先とともに、当該情報を保護するための合理的な措置を講じます。利用目的に関するお問い合わせ、開示・訂正・削除の請求、または利用停止のご要望は、当社までご連絡ください。個人情報保護委員会(PPC)のガイドラインに沿って対応いたします。",
          "カナダ(PIPEDA およびケベック州法25号)。当社は、平易な言葉で説明した本サービスの機能に必要な範囲でのみ情報を収集・利用・保持します。重大な損害の現実的なリスクを伴う漏えいが発生した場合は、影響を受ける利用者およびカナダ・プライバシー・コミッショナー事務局(OPC)に通知します。利用者は同意の撤回、情報へのアクセスまたは訂正の請求、OPC への苦情申立て(ケベック州にお住まいの場合は Commission d'accès à l'information への申立て)を行うことができます。",
          "ベトナム(政令13/2023/NĐ-CP号)。ベトナム法の下では、子どもに関する個人データおよび健康に関わるデータは機微な個人データとして扱われます。当社は、育児記録の入力および Premium 同期の有効化という利用者の能動的な行為と、前述の保護者確認とを合わせて、利用者の同意として取り扱い、この同意はいつでも撤回いただけます。当社のサーバーはベトナム国外にあるため、Premium 機能の利用には個人データの国外移転が伴います。データへのアクセス、訂正、削除、取り扱いの制限、同意の撤回、または所管当局への相談方法について、当社までご連絡いただけます。",
        ],
      },
      {
        heading: "保存期間と削除",
        body: [
          "端末内のアプリデータは、アプリ内で削除する、アプリを削除する、端末を消去する、または関連する端末バックアップをプラットフォーム設定から削除するまで、端末に残ります。",
          "Premium をご利用の場合、クラウド同期された赤ちゃんプロフィール、ケア記録、メディアは、アカウントが有効である間、当社のサーバーに保存されます。アプリ内の設定からアカウントを削除すると、直ちにアカウントとメールアドレスに削除の印を付け、ログインセッションを無効化します。その後30日以内に、アカウント、データベースの記録、写真・動画・バックアップを含む Cloudflare 上のファイルを完全に削除し、完了後に削除完了の確認メールを送信します。",
          "家族の一員が共有中の赤ちゃんプロフィールから除外された場合、その人はアプリを通じたそれ以降のアクセス権を失いますが、除外される前にその人自身の端末に同期済みの情報は、本人がローカルで削除するまで端末に残る場合があります。",
          `ウェブサイトで収集したウェイトリストまたはお問い合わせデータの削除を希望する場合は、登録時に使用したメールアドレスから ${CONTACT_EMAIL} へご連絡ください。セキュリティ、不正防止、法的理由により限定的な記録を保持する必要がある場合を除き、30日以内にアクティブな記録から削除します。`,
        ],
      },
      {
        heading: "子どものプライバシー",
        body: [
          "BabyLeveling は、保護者、親権者、養育者のためのサービスです。子ども本人がアカウントを作成したり、連絡先情報を送信したり、ウェイトリストに登録したり、その他の方法で当社と直接やり取りしたりすることは想定していません。",
          "大人の利用者は、自身がその子どもの保護者または親権者であることを確認したうえで、家庭内のケア記録のために子どもに関する情報を入力します。当社は、13歳未満を含む子どもから直接個人情報を収集することを意図しておらず、子ども本人によるアカウント作成を意図的に許可することもありません。",
        ],
      },
      {
        heading: "本ポリシーの変更",
        body: [
          "新しいプラットフォームへの対応、共有機能の追加、決済プロバイダーの追加など、BabyLeveling に新機能を追加する際に、本ポリシーを更新することがあります。重要な変更を行った場合は、このページ上部の日付を更新し、法令上必要な場合は、変更が効力を持つ前に追加の通知を行います。",
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
