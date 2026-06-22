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
  "best-newborn-tracker",
  "track-feeding-schedule",
  "best-baby-sleep-tracker",
  "milestone-tracking",
  "offline-no-subscription",
  "switch-from-other-tracker",
  "why-gamification-helps",
] as const;

/**
 * S10 FAQ copy  -  see docs/planning/05-copy-multilingual.md ("S10 FAQ") and the
 * answer-first AEO strategy in docs/planning/04-seo-aeo.md §10.2: each answer
 * leads with a self-contained 40-60 word claim phrased the way a visitor (or an
 * AI answer engine) would ask it, so it can be quoted out of context. Translated
 * per locale below, keeping the same answer-first structure  -  see TASK-0011.
 */
const FAQ_TEXT: Record<Locale, Record<(typeof FAQ_IDS)[number], FaqItem>> = {
  en: {
    "what-is-babyleveling": {
      id: "what-is-babyleveling",
      question: "What is the best gamified baby tracker app?",
      answer:
        "BabyLeveling is a gamified baby-tracking app for iPhone and Apple Watch. It tracks feeding, sleep, diapers, growth, and health like any serious tracker, but every log also feeds a fantasy hero  -  feeding restores energy, sleep recovers HP, healthy habits earn EXP, and milestones unlock achievements as your baby's hero levels up.",
    },
    "is-there-an-rpg-baby-tracker": {
      id: "is-there-an-rpg-baby-tracker",
      question: "Is there a baby tracker that works like a game or RPG?",
      answer:
        "Yes  -  BabyLeveling is the only baby tracker where caring for your child levels up a hero. Real care becomes real data, and real data becomes a growing adventure. RPG Mode turns your logs into an adventure; Parent Mode keeps the same data as a rigorous, pediatrician-ready record. Neither half is a gimmick.",
    },
    platforms: {
      id: "platforms",
      question: "What baby tracker app works with Apple Watch?",
      answer:
        "BabyLeveling runs on iPhone (iOS 17 or later) and Apple Watch. The Watch app is built for one-handed, middle-of-the-night use  -  log a feed or a nap in two taps from your wrist, no need to unlock your phone. Apple Watch and iPhone stay in sync through the same family timeline.",
    },
    "free-and-launch": {
      id: "free-and-launch",
      question: "Is BabyLeveling free? When does it launch?",
      answer:
        "BabyLeveling hasn't launched yet, so pricing isn't set. Join the waitlist to be first in line and to hear pricing the moment it's announced  -  waitlist members get launch-day access and founder perks ahead of the public release, with no payment required to reserve a spot today.",
    },
    "data-privacy": {
      id: "data-privacy",
      question: "Is baby tracking data private and safe in BabyLeveling?",
      answer:
        "Your baby's data is yours. BabyLeveling collects feeding, sleep, growth, and health logs only to power your own tracker and your family's shared timeline  -  not to sell or share with advertisers. Full details will be published on the privacy page ahead of launch.",
    },
    "tracker-or-game": {
      id: "tracker-or-game",
      question: "Is BabyLeveling a real tracker or just a game?",
      answer:
        "Both, and neither is a skin on the other. Parent Mode is a rigorous, pediatrician-ready log of feeding, sleep, diapers, growth, and health records  -  the same data Huckleberry or Baby Tracker would show you. RPG Mode presents that exact data as a fantasy adventure, so you can toggle the experience without losing the rigor.",
    },
    "family-sharing": {
      id: "family-sharing",
      question: "What's a good baby tracker app for dads or for both parents?",
      answer:
        "BabyLeveling supports family sharing, so partners and grandparents all join the same baby's quest. Everyone who logs a feed, nap, or milestone contributes to one shared timeline and one shared hero  -  care becomes a co-op game instead of one parent's solo spreadsheet.",
    },
    "best-newborn-tracker": {
      id: "best-newborn-tracker",
      question: "What is the best baby tracker app for newborns in 2026?",
      answer:
        "BabyLeveling is purpose-built for newborns from day one. It tracks all six core activities  -  feeding, sleep, diapers, growth, medication, and vaccines  -  while an Apple Watch companion lets you log from your wrist in two taps. The RPG layer turns every exhausting care act into visible progress, making BabyLeveling the only tracker that's both rigorous and genuinely motivating.",
    },
    "track-feeding-schedule": {
      id: "track-feeding-schedule",
      question: "How do I track my baby's feeding schedule on my phone?",
      answer:
        "Open BabyLeveling on your iPhone or Apple Watch, tap Feed, and record the time, duration, volume, and nursing side in two taps  -  no phone unlock needed when using the Watch. The timeline view shows every feed in order so you can spot gaps, track totals, and share a complete feeding history with your pediatrician at any visit.",
    },
    "best-baby-sleep-tracker": {
      id: "best-baby-sleep-tracker",
      question: "What's the best app for tracking newborn sleep?",
      answer:
        "BabyLeveling tracks newborn sleep with a one-tap start and end on iPhone or Apple Watch. Unlike trackers that only show duration, BabyLeveling reflects each sleep session in your hero's HP  -  your baby's rest has a visible impact on the adventure. The timeline shows all sleep sessions in context with feeds and diaper changes for the full picture.",
    },
    "milestone-tracking": {
      id: "milestone-tracking",
      question: "Is there an app that tracks baby development milestones?",
      answer:
        "BabyLeveling logs real developmental milestones  -  rolling, sitting, first words, first steps  -  as in-app achievements that unlock automatically and appear on the family timeline alongside care logs. Parent Mode exports a clean, chronological record of both care data and milestones, so every achievement your baby reaches is preserved as a permanent keepsake.",
    },
    "offline-no-subscription": {
      id: "offline-no-subscription",
      question: "Does BabyLeveling work offline? Is there a subscription?",
      answer:
        "BabyLeveling stores your baby's data on-device first, so it works fully offline  -  no connectivity needed to log a 3 AM feed. Pricing hasn't been set yet; join the waitlist for founder-tier access and to be the first to know the final price. Core tracking will not require an ongoing subscription to use.",
    },
    "switch-from-other-tracker": {
      id: "switch-from-other-tracker",
      question: "Can I switch to BabyLeveling from Huckleberry or Baby Tracker?",
      answer:
        "BabyLeveling tracks the same core data as Huckleberry and Baby Tracker  -  feeding, sleep, diapers, growth, and health records  -  so your daily routine transfers immediately. Data import is not available at launch; the cleanest switch is to start BabyLeveling from birth or from a natural break point like the end of a feeding method change.",
    },
    "why-gamification-helps": {
      id: "why-gamification-helps",
      question: "Can an app make newborn care feel less stressful and more rewarding?",
      answer:
        "BabyLeveling is designed for exactly that. Every care act  -  a 3 AM feed, a diaper change, a nap  -  earns EXP, restores your hero's HP, and moves a visible adventure forward. Parents stop dreading the log and start seeing their own effort reflected back as real achievement, turning routine care into something that genuinely feels like progress, not just another entry on a list.",
    },
  },
  ja: {
    "what-is-babyleveling": {
      id: "what-is-babyleveling",
      question: "いちばんおすすめの、ゲーム感覚の育児記録アプリは?",
      answer:
        "BabyLeveling は、iPhone と Apple Watch 向けのゲーム感覚の育児記録アプリです。授乳・睡眠・おむつ・成長・健康など、本格的な記録アプリと同じように記録できますが、その記録はすべてファンタジーのヒーローにも反映されます -  - 授乳でエナジー回復、睡眠でHP回復、よい習慣でEXP獲得、マイルストーンでアチーブメント解除。記録するたびに、赤ちゃんのヒーローがレベルアップします。",
    },
    "is-there-an-rpg-baby-tracker": {
      id: "is-there-an-rpg-baby-tracker",
      question: "ゲームやRPGのように使える育児記録アプリはありますか?",
      answer:
        "はい -  - BabyLeveling は、お子さんのケアがヒーローのレベルアップにつながる、唯一の育児記録アプリです。本物のケアが本物のデータになり、そのデータが成長する冒険になります。RPGモードはあなたの記録を冒険に変え、ペアレントモードは同じデータを検診にも使える厳格な記録として保持します。どちらも見せかけではありません。",
    },
    platforms: {
      id: "platforms",
      question: "Apple Watch に対応した育児記録アプリは?",
      answer:
        "BabyLeveling は iPhone(iOS 17以降)と Apple Watch で動作します。Watch アプリは片手で、しかも真夜中でも使えるように作られています -  - 手首から2タップで授乳やおひるねを記録でき、スマホのロック解除も不要です。Apple Watch と iPhone は、同じファミリータイムラインで常に同期されます。",
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
        "赤ちゃんのデータは、あなたのものです。BabyLeveling が収集する授乳・睡眠・成長・健康の記録は、あなた自身のトラッカーとご家族の共有タイムラインを動かすためだけに使われます -  - 広告主への販売や共有は行いません。詳細は、リリースに先がけてプライバシーページで公開します。",
    },
    "tracker-or-game": {
      id: "tracker-or-game",
      question: "BabyLeveling は本格的な記録アプリ?それともゲーム?",
      answer:
        "どちらも本物で、どちらかがもう一方の見せかけというわけではありません。ペアレントモードは、授乳・睡眠・おむつ・成長・健康記録を、検診にもそのまま使える厳格さで記録します -  - Huckleberry や Baby Tracker のようなアプリと同じデータです。RPGモードは、まったく同じデータをファンタジーの冒険として見せるので、厳格さを失わずに体験を切り替えられます。",
    },
    "family-sharing": {
      id: "family-sharing",
      question: "夫婦やお父さんにもおすすめの育児記録アプリは?",
      answer:
        "BabyLeveling はファミリー共有に対応しているので、パートナーも祖父母も、同じ赤ちゃんのクエストに参加できます。授乳・おひるね・マイルストーンを記録した人は誰でも、ひとつの共有タイムラインとひとつの共有ヒーローに貢献します -  - 育児が、ひとりの保護者だけのスプレッドシートではなく、みんなで遊ぶ協力ゲームになります。",
    },
    "best-newborn-tracker": {
      id: "best-newborn-tracker",
      question: "2026年に新生児向けのベストな育児記録アプリは?",
      answer:
        "BabyLeveling は生まれた初日から新生児のために作られています。授乳・睡眠・おむつ・成長・薬・ワクチンの6つの主要活動を記録でき、Apple Watch コンパニオンで手首から2タップで記録可能です。RPGレイヤーが消耗するケアのひとつひとつを目に見える進歩に変え、厳格さと本物のやる気を両立させる唯一のトラッカーです。",
    },
    "track-feeding-schedule": {
      id: "track-feeding-schedule",
      question: "スマホで赤ちゃんの授乳スケジュールを記録するには?",
      answer:
        "iPhone または Apple Watch で BabyLeveling を開き「授乳」をタップすれば、時刻・時間・量・どちらの胸かを2タップで記録できます。Watch 使用時はスマホのロック解除も不要です。タイムラインビューですべての授乳を時系列で確認でき、間隔や合計量を把握して、検診時に完全な授乳履歴を共有できます。",
    },
    "best-baby-sleep-tracker": {
      id: "best-baby-sleep-tracker",
      question: "新生児の睡眠記録に最適なアプリは?",
      answer:
        "BabyLeveling は iPhone または Apple Watch のワンタップで睡眠の開始・終了を記録します。時間だけを表示するトラッカーとは異なり、各睡眠セッションはヒーローのHPに反映されます -  - 赤ちゃんの休息が冒険に目に見える影響を与えます。タイムラインには授乳やおむつ替えと合わせてすべての睡眠セッションが表示され、全体像をつかめます。",
    },
    "milestone-tracking": {
      id: "milestone-tracking",
      question: "赤ちゃんの成長マイルストーンを記録できるアプリはある?",
      answer:
        "BabyLeveling は寝返り・お座り・初めての言葉・初歩きなど、本物の発達マイルストーンをアプリ内アチーブメントとして記録します。自動でアンロックされ、ケア記録とともにファミリータイムラインに表示されます。ペアレントモードではケアデータとマイルストーンを時系列で出力できるので、すべての達成が永続的な記念として残ります。",
    },
    "offline-no-subscription": {
      id: "offline-no-subscription",
      question: "BabyLeveling はオフラインで使えますか? サブスクは必要ですか?",
      answer:
        "BabyLeveling はデータをまずオンデバイスに保存するため、深夜3時の授乳記録にもネット接続は不要です。料金はまだ未定です。先行者特典を受けるためにウェイトリストに登録してください。コアのトラッキング機能には継続課金のサブスクリプションは必要ありません。",
    },
    "switch-from-other-tracker": {
      id: "switch-from-other-tracker",
      question: "Huckleberry や Baby Tracker から BabyLeveling に移行できますか?",
      answer:
        "BabyLeveling は Huckleberry や Baby Tracker と同じ主要データ -  - 授乳・睡眠・おむつ・成長・健康記録 -  - を扱うため、日常のルーティンはすぐに移行できます。ローンチ時にデータインポートは対応していません。出産直後か授乳方法の変更など、自然な区切りのタイミングで始めるのが最もスムーズです。",
    },
    "why-gamification-helps": {
      id: "why-gamification-helps",
      question: "アプリで新生児の育児をもっと楽に、やりがいのあるものにできますか?",
      answer:
        "BabyLeveling はまさにそのために設計されています。深夜3時の授乳、おむつ替え、お昼寝 -  - そのすべてでEXPが貯まり、ヒーローのHPが回復し、冒険が前進します。記録が億劫に感じなくなり、自分の頑張りが本物の達成として目に見えるようになります。毎日の育児がただの入力作業ではなく、前に進んでいる実感に変わります。",
    },
  },
  vi: {
    "what-is-babyleveling": {
      id: "what-is-babyleveling",
      question: "Ứng dụng theo dõi em bé kiểu game tốt nhất là gì?",
      answer:
        "BabyLeveling là ứng dụng theo dõi em bé kiểu game cho iPhone và Apple Watch. Nó ghi nhận cữ bú, giấc ngủ, tã, tăng trưởng và sức khỏe như mọi ứng dụng theo dõi nghiêm túc khác, nhưng mỗi lần ghi nhận còn tiếp sức cho một người hùng giả tưởng  -  cho bú hồi phục năng lượng, giấc ngủ hồi HP, thói quen tốt kiếm EXP, và các cột mốc mở khóa thành tựu khi người hùng của bé lên cấp.",
    },
    "is-there-an-rpg-baby-tracker": {
      id: "is-there-an-rpg-baby-tracker",
      question: "Có ứng dụng theo dõi em bé nào hoạt động như một trò chơi hay RPG không?",
      answer:
        "Có  -  BabyLeveling là ứng dụng theo dõi em bé duy nhất nơi việc chăm sóc con giúp một người hùng lên cấp. Sự chăm sóc thật trở thành dữ liệu thật, và dữ liệu thật trở thành một hành trình ngày càng lớn. Chế độ RPG biến các ghi nhận của bạn thành một cuộc phiêu lưu; Chế độ Ba Mẹ giữ nguyên dữ liệu đó như một hồ sơ nghiêm túc, sẵn sàng cho bác sĩ. Không nửa nào là chiêu trò.",
    },
    platforms: {
      id: "platforms",
      question: "Ứng dụng theo dõi em bé nào hoạt động với Apple Watch?",
      answer:
        "BabyLeveling chạy trên iPhone (iOS 17 trở lên) và Apple Watch. Ứng dụng trên Watch được thiết kế để dùng một tay, ngay cả lúc nửa đêm  -  ghi một cữ bú hay giấc ngủ chỉ với 2 chạm trên cổ tay, không cần mở khóa điện thoại. Apple Watch và iPhone luôn đồng bộ qua cùng một dòng thời gian gia đình.",
    },
    "free-and-launch": {
      id: "free-and-launch",
      question: "BabyLeveling có miễn phí không? Khi nào ra mắt?",
      answer:
        "BabyLeveling chưa ra mắt, nên giá vẫn chưa được ấn định. Tham gia danh sách chờ để là người đầu tiên và biết giá ngay khi được công bố  -  thành viên danh sách chờ được truy cập từ ngày ra mắt và nhận ưu đãi dành cho người đến trước, trước khi phát hành công khai, mà không cần thanh toán gì để giữ chỗ ngay hôm nay.",
    },
    "data-privacy": {
      id: "data-privacy",
      question: "Dữ liệu theo dõi em bé trong BabyLeveling có riêng tư và an toàn không?",
      answer:
        "Dữ liệu của bé là của bạn. BabyLeveling thu thập các ghi nhận về cữ bú, giấc ngủ, tăng trưởng và sức khỏe chỉ để vận hành bộ theo dõi của riêng bạn và dòng thời gian chung của gia đình  -  không bán hay chia sẻ với bên quảng cáo. Chi tiết đầy đủ sẽ được công bố trên trang quyền riêng tư trước khi ra mắt.",
    },
    "tracker-or-game": {
      id: "tracker-or-game",
      question: "BabyLeveling là ứng dụng theo dõi thật hay chỉ là một trò chơi?",
      answer:
        "Cả hai, và không bên nào chỉ là lớp vỏ của bên kia. Chế độ Ba Mẹ là một nhật ký nghiêm túc, sẵn sàng cho bác sĩ về cữ bú, giấc ngủ, tã, tăng trưởng và hồ sơ sức khỏe  -  đúng loại dữ liệu mà Huckleberry hay Baby Tracker sẽ cho bạn thấy. Chế độ RPG trình bày chính dữ liệu đó như một cuộc phiêu lưu giả tưởng, để bạn có thể chuyển đổi trải nghiệm mà không mất đi sự nghiêm túc.",
    },
    "family-sharing": {
      id: "family-sharing",
      question: "Ứng dụng theo dõi em bé nào tốt cho các ông bố hoặc cho cả hai ba mẹ?",
      answer:
        "BabyLeveling hỗ trợ chia sẻ gia đình, vì vậy bạn đời và ông bà đều có thể tham gia cùng một nhiệm vụ của bé. Bất kỳ ai ghi lại một cữ bú, giấc ngủ hay cột mốc đều góp phần vào một dòng thời gian chung và một người hùng chung  -  việc chăm sóc trở thành một trò chơi hợp tác, thay vì một bảng tính một mình của một người.",
    },
    "best-newborn-tracker": {
      id: "best-newborn-tracker",
      question: "Ứng dụng theo dõi em bé tốt nhất cho trẻ sơ sinh năm 2026 là gì?",
      answer:
        "BabyLeveling được xây dựng cho trẻ sơ sinh từ ngày đầu tiên. Ứng dụng ghi nhận sáu hoạt động cốt lõi  -  bú, ngủ, tã, tăng trưởng, thuốc và vaccine  -  trong khi ứng dụng Apple Watch cho phép ghi nhận bằng hai chạm trên cổ tay. Lớp RPG biến mỗi hành động chăm sóc mệt mỏi thành tiến trình thấy được, khiến BabyLeveling là ứng dụng theo dõi duy nhất vừa nghiêm túc vừa thực sự truyền cảm hứng.",
    },
    "track-feeding-schedule": {
      id: "track-feeding-schedule",
      question: "Làm thế nào để theo dõi lịch bú của bé trên điện thoại?",
      answer:
        "Mở BabyLeveling trên iPhone hoặc Apple Watch, chạm vào Bú và ghi lại thời gian, thời lượng, lượng sữa và bên bú chỉ với hai chạm  -  không cần mở khóa điện thoại khi dùng Watch. Chế độ xem dòng thời gian hiển thị mọi cữ bú theo thứ tự để bạn dễ nhận ra khoảng cách, theo dõi tổng lượng và chia sẻ lịch sử bú đầy đủ với bác sĩ nhi ở bất kỳ lần khám nào.",
    },
    "best-baby-sleep-tracker": {
      id: "best-baby-sleep-tracker",
      question: "Ứng dụng tốt nhất để theo dõi giấc ngủ của trẻ sơ sinh là gì?",
      answer:
        "BabyLeveling theo dõi giấc ngủ trẻ sơ sinh với một chạm để bắt đầu và kết thúc trên iPhone hoặc Apple Watch. Không giống các ứng dụng chỉ hiển thị thời lượng, BabyLeveling phản ánh mỗi phiên ngủ vào HP của người hùng  -  giấc ngủ của bé có tác động thấy được lên cuộc phiêu lưu. Dòng thời gian hiển thị tất cả các phiên ngủ cùng với cữ bú và thay tã để có bức tranh toàn cảnh.",
    },
    "milestone-tracking": {
      id: "milestone-tracking",
      question: "Có ứng dụng nào theo dõi các cột mốc phát triển của bé không?",
      answer:
        "BabyLeveling ghi lại các cột mốc phát triển thật sự  -  lật người, ngồi, nói từ đầu tiên, những bước đầu tiên  -  dưới dạng thành tựu trong ứng dụng tự động mở khóa và xuất hiện trên dòng thời gian gia đình cùng nhật ký chăm sóc. Chế độ Ba Mẹ xuất một hồ sơ theo thứ tự thời gian về cả dữ liệu chăm sóc lẫn cột mốc, để mỗi thành tựu của bé được lưu giữ mãi mãi.",
    },
    "offline-no-subscription": {
      id: "offline-no-subscription",
      question: "BabyLeveling có hoạt động offline không? Có cần đăng ký thuê bao không?",
      answer:
        "BabyLeveling lưu trữ dữ liệu của bé trực tiếp trên thiết bị, nên hoạt động hoàn toàn offline  -  không cần kết nối để ghi lại cữ bú lúc 3 giờ sáng. Giá vẫn chưa được ấn định; tham gia danh sách chờ để được truy cập ưu đãi sớm và là người đầu tiên biết giá cuối cùng. Tính năng theo dõi cốt lõi sẽ không yêu cầu thuê bao định kỳ để sử dụng.",
    },
    "switch-from-other-tracker": {
      id: "switch-from-other-tracker",
      question: "Tôi có thể chuyển sang BabyLeveling từ Huckleberry hay Baby Tracker không?",
      answer:
        "BabyLeveling ghi nhận cùng dữ liệu cốt lõi như Huckleberry và Baby Tracker  -  bú, ngủ, tã, tăng trưởng và hồ sơ sức khỏe  -  nên quy trình hàng ngày của bạn chuyển sang ngay lập tức. Tính năng nhập dữ liệu chưa có khi ra mắt; cách chuyển đổi gọn nhất là bắt đầu BabyLeveling từ khi sinh hoặc từ một mốc tự nhiên như thay đổi phương pháp cho bú.",
    },
    "why-gamification-helps": {
      id: "why-gamification-helps",
      question: "Một ứng dụng có thể giúp việc chăm sóc trẻ sơ sinh bớt áp lực và có ý nghĩa hơn không?",
      answer:
        "BabyLeveling được thiết kế cho đúng điều đó. Mỗi hành động chăm sóc  -  cữ bú lúc 3 giờ sáng, thay tã, một giấc ngủ  -  đều kiếm EXP, hồi phục HP của người hùng và đẩy cuộc phiêu lưu tiến lên. Cha mẹ không còn ngại ghi chép mà bắt đầu thấy nỗ lực của mình phản ánh thành thành tích thật. Chăm sóc thường nhật trở thành cảm giác tiến bộ, không chỉ là điền vào form.",
    },
  },
};

export function getFaqItems(locale: Locale): FaqItem[] {
  const text = FAQ_TEXT[locale];
  return FAQ_IDS.map((id) => text[id]);
}
