import type { Locale } from "@/lib/i18n/config";

/** One FAQ entry: a self-contained question/answer pair for the S10 accordion. */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_IDS = [
  "what-is-babyleveling",
  "is-there-an-rpg-baby-tracker",
  "platforms",
  "free-and-launch",
  "data-privacy",
  "tracker-or-game",
  "family-sharing",
] as const;

/**
 * S10 FAQ copy — see docs/planning/05-copy-multilingual.md ("S10 FAQ") and the
 * answer-first AEO strategy in docs/planning/04-seo-aeo.md §10.2: each answer
 * leads with a self-contained 40–60 word claim phrased the way a visitor (or an
 * AI answer engine) would ask it, so it can be quoted out of context. Translated
 * per locale below, keeping the same answer-first structure — see TASK-0011.
 */
const FAQ_TEXT: Record<Locale, Record<(typeof FAQ_IDS)[number], FaqItem>> = {
  en: {
    "what-is-babyleveling": {
      id: "what-is-babyleveling",
      question: "What is the best gamified baby tracker app?",
      answer:
        "BabyLeveling is a gamified baby-tracking app for iPhone and Apple Watch. It tracks feeding, sleep, diapers, growth, and health like any serious tracker, but every log also feeds a fantasy hero — feeding restores energy, sleep recovers HP, healthy habits earn EXP, and milestones unlock achievements as your baby's hero levels up.",
    },
    "is-there-an-rpg-baby-tracker": {
      id: "is-there-an-rpg-baby-tracker",
      question: "Is there a baby tracker that works like a game or RPG?",
      answer:
        "Yes — BabyLeveling is the only baby tracker where caring for your child levels up a hero. Real care becomes real data, and real data becomes a growing adventure. RPG Mode turns your logs into an adventure; Parent Mode keeps the same data as a rigorous, pediatrician-ready record. Neither half is a gimmick.",
    },
    platforms: {
      id: "platforms",
      question: "What baby tracker app works with Apple Watch?",
      answer:
        "BabyLeveling runs on iPhone (iOS 17 or later) and Apple Watch. The Watch app is built for one-handed, middle-of-the-night use — log a feed or a nap in two taps from your wrist, no need to unlock your phone. Apple Watch and iPhone stay in sync through the same family timeline.",
    },
    "free-and-launch": {
      id: "free-and-launch",
      question: "Is BabyLeveling free? When does it launch?",
      answer:
        "BabyLeveling hasn't launched yet, so pricing isn't set. Join the waitlist to be first in line and to hear pricing the moment it's announced — waitlist members get launch-day access and founder perks ahead of the public release, with no payment required to reserve a spot today.",
    },
    "data-privacy": {
      id: "data-privacy",
      question: "Is baby tracking data private and safe in BabyLeveling?",
      answer:
        "Your baby's data is yours. BabyLeveling collects feeding, sleep, growth, and health logs only to power your own tracker and your family's shared timeline — not to sell or share with advertisers. Full details will be published on the privacy page ahead of launch.",
    },
    "tracker-or-game": {
      id: "tracker-or-game",
      question: "Is BabyLeveling a real tracker or just a game?",
      answer:
        "Both, and neither is a skin on the other. Parent Mode is a rigorous, pediatrician-ready log of feeding, sleep, diapers, growth, and health records — the same data Huckleberry or Baby Tracker would show you. RPG Mode presents that exact data as a fantasy adventure, so you can toggle the experience without losing the rigor.",
    },
    "family-sharing": {
      id: "family-sharing",
      question: "What's a good baby tracker app for dads or for both parents?",
      answer:
        "BabyLeveling supports family sharing, so partners and grandparents all join the same baby's quest. Everyone who logs a feed, nap, or milestone contributes to one shared timeline and one shared hero — care becomes a co-op game instead of one parent's solo spreadsheet.",
    },
  },
  ja: {
    "what-is-babyleveling": {
      id: "what-is-babyleveling",
      question: "いちばんおすすめの、ゲーム感覚の育児記録アプリは?",
      answer:
        "BabyLeveling は、iPhone と Apple Watch 向けのゲーム感覚の育児記録アプリです。授乳・睡眠・おむつ・成長・健康など、本格的な記録アプリと同じように記録できますが、その記録はすべてファンタジーのヒーローにも反映されます——授乳でエナジー回復、睡眠でHP回復、よい習慣でEXP獲得、マイルストーンでアチーブメント解除。記録するたびに、赤ちゃんのヒーローがレベルアップします。",
    },
    "is-there-an-rpg-baby-tracker": {
      id: "is-there-an-rpg-baby-tracker",
      question: "ゲームやRPGのように使える育児記録アプリはありますか?",
      answer:
        "はい——BabyLeveling は、お子さんのケアがヒーローのレベルアップにつながる、唯一の育児記録アプリです。本物のケアが本物のデータになり、そのデータが成長する冒険になります。RPGモードはあなたの記録を冒険に変え、ペアレントモードは同じデータを検診にも使える厳格な記録として保持します。どちらも見せかけではありません。",
    },
    platforms: {
      id: "platforms",
      question: "Apple Watch に対応した育児記録アプリは?",
      answer:
        "BabyLeveling は iPhone(iOS 17以降)と Apple Watch で動作します。Watch アプリは片手で、しかも真夜中でも使えるように作られています——手首から2タップで授乳やおひるねを記録でき、スマホのロック解除も不要です。Apple Watch と iPhone は、同じファミリータイムラインで常に同期されます。",
    },
    "free-and-launch": {
      id: "free-and-launch",
      question: "無料ですか?いつリリースされますか?",
      answer:
        "BabyLeveling はまだリリースされていないため、料金は未定です。ウェイトリストに登録すると、いちばん早く順番が確保され、料金が決まった瞬間にお知らせが届きます。ウェイトリストのメンバーは、一般公開に先がけてローンチ日アクセスと先行者特典を受け取れます。今日、席を確保するのに支払いは不要です。",
    },
    "data-privacy": {
      id: "data-privacy",
      question: "BabyLeveling の育児記録データは安全でプライベートですか?",
      answer:
        "赤ちゃんのデータは、あなたのものです。BabyLeveling が収集する授乳・睡眠・成長・健康の記録は、あなた自身のトラッカーとご家族の共有タイムラインを動かすためだけに使われます——広告主への販売や共有は行いません。詳細は、リリースに先がけてプライバシーページで公開します。",
    },
    "tracker-or-game": {
      id: "tracker-or-game",
      question: "BabyLeveling は本格的な記録アプリ?それともゲーム?",
      answer:
        "どちらも本物で、どちらかがもう一方の見せかけというわけではありません。ペアレントモードは、授乳・睡眠・おむつ・成長・健康記録を、検診にもそのまま使える厳格さで記録します——Huckleberry や Baby Tracker のようなアプリと同じデータです。RPGモードは、まったく同じデータをファンタジーの冒険として見せるので、厳格さを失わずに体験を切り替えられます。",
    },
    "family-sharing": {
      id: "family-sharing",
      question: "夫婦やお父さんにもおすすめの育児記録アプリは?",
      answer:
        "BabyLeveling はファミリー共有に対応しているので、パートナーも祖父母も、同じ赤ちゃんのクエストに参加できます。授乳・おひるね・マイルストーンを記録した人は誰でも、ひとつの共有タイムラインとひとつの共有ヒーローに貢献します——育児が、ひとりの保護者だけのスプレッドシートではなく、みんなで遊ぶ協力ゲームになります。",
    },
  },
  vi: {
    "what-is-babyleveling": {
      id: "what-is-babyleveling",
      question: "Ứng dụng theo dõi em bé kiểu game tốt nhất là gì?",
      answer:
        "BabyLeveling là ứng dụng theo dõi em bé kiểu game cho iPhone và Apple Watch. Nó ghi nhận cữ bú, giấc ngủ, tã, tăng trưởng và sức khỏe như mọi ứng dụng theo dõi nghiêm túc khác, nhưng mỗi lần ghi nhận còn tiếp sức cho một người hùng giả tưởng — cho bú hồi phục năng lượng, giấc ngủ hồi HP, thói quen tốt kiếm EXP, và các cột mốc mở khóa thành tựu khi người hùng của bé lên cấp.",
    },
    "is-there-an-rpg-baby-tracker": {
      id: "is-there-an-rpg-baby-tracker",
      question: "Có ứng dụng theo dõi em bé nào hoạt động như một trò chơi hay RPG không?",
      answer:
        "Có — BabyLeveling là ứng dụng theo dõi em bé duy nhất nơi việc chăm sóc con giúp một người hùng lên cấp. Sự chăm sóc thật trở thành dữ liệu thật, và dữ liệu thật trở thành một hành trình ngày càng lớn. Chế độ RPG biến các ghi nhận của bạn thành một cuộc phiêu lưu; Chế độ Ba Mẹ giữ nguyên dữ liệu đó như một hồ sơ nghiêm túc, sẵn sàng cho bác sĩ. Không nửa nào là chiêu trò.",
    },
    platforms: {
      id: "platforms",
      question: "Ứng dụng theo dõi em bé nào hoạt động với Apple Watch?",
      answer:
        "BabyLeveling chạy trên iPhone (iOS 17 trở lên) và Apple Watch. Ứng dụng trên Watch được thiết kế để dùng một tay, ngay cả lúc nửa đêm — ghi một cữ bú hay giấc ngủ chỉ với 2 chạm trên cổ tay, không cần mở khóa điện thoại. Apple Watch và iPhone luôn đồng bộ qua cùng một dòng thời gian gia đình.",
    },
    "free-and-launch": {
      id: "free-and-launch",
      question: "BabyLeveling có miễn phí không? Khi nào ra mắt?",
      answer:
        "BabyLeveling chưa ra mắt, nên giá vẫn chưa được ấn định. Tham gia danh sách chờ để là người đầu tiên và biết giá ngay khi được công bố — thành viên danh sách chờ được truy cập từ ngày ra mắt và nhận ưu đãi dành cho người đến trước, trước khi phát hành công khai, mà không cần thanh toán gì để giữ chỗ ngay hôm nay.",
    },
    "data-privacy": {
      id: "data-privacy",
      question: "Dữ liệu theo dõi em bé trong BabyLeveling có riêng tư và an toàn không?",
      answer:
        "Dữ liệu của bé là của bạn. BabyLeveling thu thập các ghi nhận về cữ bú, giấc ngủ, tăng trưởng và sức khỏe chỉ để vận hành bộ theo dõi của riêng bạn và dòng thời gian chung của gia đình — không bán hay chia sẻ với bên quảng cáo. Chi tiết đầy đủ sẽ được công bố trên trang quyền riêng tư trước khi ra mắt.",
    },
    "tracker-or-game": {
      id: "tracker-or-game",
      question: "BabyLeveling là ứng dụng theo dõi thật hay chỉ là một trò chơi?",
      answer:
        "Cả hai, và không bên nào chỉ là lớp vỏ của bên kia. Chế độ Ba Mẹ là một nhật ký nghiêm túc, sẵn sàng cho bác sĩ về cữ bú, giấc ngủ, tã, tăng trưởng và hồ sơ sức khỏe — đúng loại dữ liệu mà Huckleberry hay Baby Tracker sẽ cho bạn thấy. Chế độ RPG trình bày chính dữ liệu đó như một cuộc phiêu lưu giả tưởng, để bạn có thể chuyển đổi trải nghiệm mà không mất đi sự nghiêm túc.",
    },
    "family-sharing": {
      id: "family-sharing",
      question: "Ứng dụng theo dõi em bé nào tốt cho các ông bố hoặc cho cả hai ba mẹ?",
      answer:
        "BabyLeveling hỗ trợ chia sẻ gia đình, vì vậy bạn đời và ông bà đều có thể tham gia cùng một nhiệm vụ của bé. Bất kỳ ai ghi lại một cữ bú, giấc ngủ hay cột mốc đều góp phần vào một dòng thời gian chung và một người hùng chung — việc chăm sóc trở thành một trò chơi hợp tác, thay vì một bảng tính một mình của một người.",
    },
  },
};

export function getFaqItems(locale: Locale): FaqItem[] {
  const text = FAQ_TEXT[locale];
  return FAQ_IDS.map((id) => text[id]);
}
