---
tags: [planning, copy, i18n]
updated: 2026-06-16
---

# Multilingual Copy Structure (EN / JA / VI)

Deliverables 11–13. Owner: `multilingual-copywriter`. Written to the story beats
([[01-strategy#3-story-framework]]) and SEO/AEO targets ([[04-seo-aeo]]).

**Transcreation, not translation.** JA and VI are localized for tone and culture, not
literal renderings. Shared `i18n` keys map across all three locales so the
`nextjs-architect` can wire sub-path i18n (`/`, `/ja`, `/vi`).

> Voice: warm, witty, a little epic; never clinical, never babyish-cutesy, never hypey.
> Respects exhausted parents — short sentences, real empathy. The RPG metaphor is playful
> but the care is taken seriously.

---

## i18n key map (all locales share these keys)

| Key | Section |
|-----|---------|
| `nav.cta`, `nav.features`, `nav.rpg`, `nav.parents`, `nav.pricing`, `nav.faq` | S0 |
| `hero.eyebrow`, `hero.headline`, `hero.tagline`, `hero.cta`, `hero.ctaSub` | S1 |
| `heroChar.line` | S2 |
| `reveal.headline`, `reveal.body`, `reveal.cta` | S3 |
| `loop.title`, `loop.feed`, `loop.sleep`, `loop.habit`, `loop.milestone` | S4 |
| `features.title`, `features.xp.*`, `features.quests.*`, `features.skilltree.*`, `features.achievements.*`, `features.streaks.*`, `features.watch.*` | S5 |
| `modes.title`, `modes.parent.*`, `modes.rpg.*` | S6 |
| `shots.title`, `shots.dashboard`, `shots.questlog`, `shots.skilltree`, `shots.trophies` | S7 |
| `themes.title`, `themes.royal.*`, `themes.warrior.*`, `themes.zen.*` | S8 |
| `family.title`, `family.body` | S9 |
| `faq.q1..q6` (question/answer) | S10 |
| `waitlist.headline`, `waitlist.body`, `waitlist.placeholder`, `waitlist.cta`, `waitlist.success`, `waitlist.error`, `waitlist.invalid` | S11 |
| `footer.*` | S12 |

---

## 11. English Copy Structure

**S0 Nav** — `nav.cta`: **Join the waitlist** · Features · RPG System · For Parents · Pricing · FAQ

**S1 Hero**
- Eyebrow: `A new game has begun`
- Headline: **You just had a baby.** *You also just started a new game.*
- Tagline: `Every day is a new quest.`
- CTA: **Join the waitlist** · sub: `Be first in line at launch.`

**S2 Hero Appears** — `Every hero starts at Level 1.`

**S3 The Reveal**
- Headline: **The hero is your baby. The XP is real life.**
- Body: `Every feed, every nap, every tiny milestone — it all counts. BabyLeveling turns the
  care you already give into a story you grow together.`
- CTA: `See how it works →`

**S4 Care → XP loop** — Title: **Feed. Sleep. Grow. Level up.**
- Feeding → **+Energy** · Sleep → **+HP** · Healthy habits → **+EXP** · Milestone → **Achievement unlocked**

**S5 Feature Showcase** — Title: **A full RPG, built on real baby care.**
- XP & Levels — *Every log earns XP. Your baby's hero levels up.*
- Daily Quests — *Tracking becomes daily missions. "3 feeds today = +320 XP."*
- Skill Tree — *Smiles, rolls, first words — milestones as an unlockable skill tree.*
- Achievements — *Earn badges and trophies for streaks and milestones.*
- Streaks & Buffs — *Stay consistent. "🔥 3-day streak, +50 XP bonus."*
- Apple Watch — *Log a feed or nap from your wrist in two taps.*

**S6 Parent Mode** — Title: **Two modes. One source of truth.**
- Parent Mode — *Practical, reliable, pediatrician-ready. Clean charts and health records
  when you need the facts.*
- RPG Mode — *The same data, as an adventure — for the moments you need a little magic.*

**S7 Screenshots** — Title: **This is what your adventure looks like.**
- Dashboard *(your character sheet)* · Quest Log *(the battle log)* · Skill Tree · Trophy Room

**S8 Themes** — Title: **Choose the world your hero grows up in.**
- Royal — *Soft power.* · Warrior — *Forged in fire.* · Zen — *Gentle and intentional.*

**S9 Family Sharing** — Title: **Raise them together. Level up as a party.**
- Body: `Invite a partner and grandparents. Everyone caring for your baby joins the same
  quest — and shares the same timeline.`

**S10 FAQ** *(answer-first, see [[04-seo-aeo#10-2-faq-strategy]])*
- Q: *What is BabyLeveling?* — A: A gamified baby tracker for iOS & Apple Watch: track
  feeding, sleep, diapers, growth, and health, and every log levels up your baby's hero.
- Q: *Which platforms does it support?* — A: iPhone (iOS 17+) and Apple Watch.
- Q: *Is it free? When does it launch?* — A: Launching soon — join the waitlist to be first
  and to hear pricing the moment it's set.
- Q: *Is my baby's data private?* — A: Your baby's data is yours. (Details on the privacy page.)
- Q: *Is it a real tracker or just a game?* — A: Both. Parent Mode is a rigorous,
  pediatrician-ready log; RPG Mode is the same data as an adventure.
- Q: *Can both parents use it?* — A: Yes — family sharing lets partners and grandparents
  join the same baby's quest.

**S11 Final CTA / Waitlist**
- Headline: **Be there at Level 1.**
- Body: `Your adventure begins at launch. Claim your spot on the waitlist.`
- Placeholder: `you@email.com` · CTA: **Join the waitlist**
- Success: **You're in. +1 Party Member!** *We'll email you the moment the quest begins.*
- Error: `Something went wrong — try again.` · Invalid: `Please enter a valid email.`

**S12 Footer** — *BabyLeveling — every day is a new quest.* + nav + Privacy · Terms · © 2026 + EN/日本語/Tiếng Việt

---

## 12. Japanese Copy Structure (日本語)

> Tone: warm, gentle, slightly poetic. Keep the playful RPG vocabulary that JP gamers know
> (レベルアップ, クエスト, EXP). Use polite-but-friendly register (ですます). Headlines may
> mix Japanese with the loved English RPG terms.

**S0 ナビ** — `nav.cta`: **ウェイトリストに登録** · 機能 · RPGシステム · 保護者の方へ · 料金 · よくある質問

**S1 ヒーロー**
- アイブロウ: `あたらしいゲームが、はじまった`
- 見出し: **赤ちゃんが生まれた。** *それは、新しい冒険のはじまり。*
- タグライン: `毎日が、あたらしいクエスト。`
- CTA: **ウェイトリストに登録** · サブ: `リリースを、いちばんに。`

**S2** — `すべてのヒーローは、レベル1から。`

**S3 リヴィール**
- 見出し: **ヒーローは、あなたの赤ちゃん。EXPは、毎日の暮らし。**
- 本文: `授乳も、おひるねも、小さな「はじめて」も——すべてが力になる。BabyLeveling は、
  あなたが注ぐ愛情を、いっしょに育てる物語に変えます。`
- CTA: `仕組みを見る →`

**S4 ケア → EXP** — タイトル: **食べて、眠って、育って、レベルアップ。**
- 授乳 → **エナジー** · 睡眠 → **HP回復** · よい習慣 → **EXP** · マイルストーン → **実績解除**

**S5 機能** — タイトル: **本格RPG。土台は、リアルな育児。**
- XP & レベル — *記録するたびにXP。赤ちゃんのヒーローがレベルアップ。*
- デイリークエスト — *記録が毎日のミッションに。「今日は3回授乳 = +320 XP」*
- スキルツリー — *笑顔、寝返り、はじめての言葉——成長をスキルツリーで解放。*
- アチーブメント — *連続記録やマイルストーンでバッジとトロフィーを獲得。*
- ストリーク & バフ — *続けるほど強くなる。「🔥3日連続、+50 XP ボーナス」*
- Apple Watch — *授乳もおひるねも、手首から2タップで記録。*

**S6 ペアレントモード** — タイトル: **2つのモード。記録は、ひとつ。**
- ペアレントモード — *実用的で、たしかで、検診にもそのまま使える。必要なときは、すっきりした
  グラフと健康記録を。*
- RPGモード — *同じ記録を、冒険として。ちょっとの魔法がほしい日に。*

**S7 スクリーンショット** — タイトル: **これが、あなたの冒険のすがた。**
- ダッシュボード *(キャラクターシート)* · クエストログ *(バトルログ)* · スキルツリー · トロフィールーム

**S8 テーマ** — タイトル: **ヒーローが育つ世界を、選ぼう。**
- Royal — *やわらかな、強さ。* · Warrior — *炎で鍛える。* · Zen — *おだやかに、ていねいに。*

**S9 ファミリー共有** — タイトル: **みんなで育てる。パーティーでレベルアップ。**
- 本文: `パートナーや祖父母を招待。赤ちゃんに関わるみんなが、同じクエストとタイムラインを共有します。`

**S10 よくある質問**
- Q: *BabyLeveling とは?* — A: iPhone・Apple Watch 向けのゲーム感覚の育児記録アプリ。授乳・睡眠・
  おむつ・成長・健康を記録すると、赤ちゃんのヒーローがレベルアップします。
- Q: *対応デバイスは?* — A: iPhone(iOS 17以降)と Apple Watch。
- Q: *無料ですか?いつリリース?* — A: まもなくリリース。ウェイトリスト登録で、料金もリリースも
  いちばんにお知らせします。
- Q: *赤ちゃんのデータは安全?* — A: データはあなたのもの。(詳細はプライバシーページで。)
- Q: *記録アプリ?それともゲーム?* — A: どちらも。ペアレントモードは検診にも使える本格的な記録、
  RPGモードは同じ記録を冒険として楽しめます。
- Q: *夫婦で使える?* — A: はい。ファミリー共有で、パートナーも祖父母も同じ赤ちゃんのクエストに参加できます。

**S11 最終CTA**
- 見出し: **レベル1から、いっしょに。**
- 本文: `冒険は、リリースとともに。ウェイトリストで席を確保しよう。`
- プレースホルダー: `you@email.com` · CTA: **ウェイトリストに登録**
- 成功: **登録完了。パーティーメンバー +1!** *クエスト開始のときに、メールでお知らせします。*
- エラー: `エラーが発生しました。もう一度お試しください。` · 無効: `有効なメールアドレスを入力してください。`

**S12 フッター** — *BabyLeveling — 毎日が、あたらしいクエスト。* + ナビ + プライバシー · 利用規約 · © 2026

---

## 13. Vietnamese Copy Structure (Tiếng Việt)

> Tone: warm, encouraging, modern. Keep widely-understood gaming loanwords (level up, EXP,
> quest) which Vietnamese gamers use naturally; pair with heartfelt Vietnamese for the
> emotional beats. Friendly register ("ba mẹ" = parents).

**S0 Điều hướng** — `nav.cta`: **Tham gia danh sách chờ** · Tính năng · Hệ thống RPG · Dành cho ba mẹ · Giá · Hỏi đáp

**S1 Hero**
- Eyebrow: `Một trò chơi mới vừa bắt đầu`
- Tiêu đề: **Bạn vừa có em bé.** *Bạn cũng vừa bắt đầu một trò chơi mới.*
- Tagline: `Mỗi ngày là một nhiệm vụ mới.`
- CTA: **Tham gia danh sách chờ** · phụ: `Là người đầu tiên khi ra mắt.`

**S2** — `Mọi người hùng đều bắt đầu từ Cấp 1.`

**S3 Cú lật mở**
- Tiêu đề: **Người hùng chính là bé. EXP chính là cuộc sống thật.**
- Nội dung: `Mỗi cữ bú, mỗi giấc ngủ, mỗi cột mốc nhỏ xíu — tất cả đều có ý nghĩa.
  BabyLeveling biến tình yêu thương bạn đang trao thành một hành trình lớn lên cùng nhau.`
- CTA: `Xem cách hoạt động →`

**S4 Chăm sóc → EXP** — Tiêu đề: **Ăn. Ngủ. Lớn. Lên cấp.**
- Cho bú → **+Năng lượng** · Giấc ngủ → **+HP** · Thói quen tốt → **+EXP** · Cột mốc → **Mở khóa thành tựu**

**S5 Tính năng** — Tiêu đề: **Một game RPG đúng nghĩa, dựng trên việc chăm con thật.**
- XP & Cấp độ — *Mỗi lần ghi nhận là một ít XP. Người hùng của bé lên cấp.*
- Nhiệm vụ hằng ngày — *Việc theo dõi thành nhiệm vụ mỗi ngày. "3 cữ bú hôm nay = +320 XP."*
- Cây kỹ năng — *Nụ cười, lẫy, tiếng nói đầu tiên — cột mốc thành cây kỹ năng để mở khóa.*
- Thành tựu — *Nhận huy hiệu và cúp cho chuỗi ngày đều và các cột mốc.*
- Chuỗi & Buff — *Đều đặn là mạnh hơn. "🔥 chuỗi 3 ngày, +50 XP."*
- Apple Watch — *Ghi cữ bú hay giấc ngủ ngay trên cổ tay, chỉ 2 chạm.*

**S6 Chế độ Ba Mẹ** — Tiêu đề: **Hai chế độ. Một nguồn dữ liệu.**
- Chế độ Ba Mẹ — *Thực tế, đáng tin, sẵn sàng cho bác sĩ. Biểu đồ gọn gàng và hồ sơ sức khỏe
  khi bạn cần số liệu.*
- Chế độ RPG — *Cũng dữ liệu đó, nhưng là một cuộc phiêu lưu — cho những ngày cần chút phép màu.*

**S7 Ảnh chụp màn hình** — Tiêu đề: **Hành trình của bạn trông như thế này.**
- Bảng điều khiển *(bảng nhân vật)* · Nhật ký nhiệm vụ *(nhật ký chiến đấu)* · Cây kỹ năng · Phòng cúp

**S8 Giao diện** — Tiêu đề: **Chọn thế giới nơi người hùng của bạn lớn lên.**
- Royal — *Sức mạnh dịu dàng.* · Warrior — *Tôi luyện trong lửa.* · Zen — *Nhẹ nhàng và chú tâm.*

**S9 Chia sẻ gia đình** — Tiêu đề: **Cùng nuôi con. Cùng lên cấp như một đội.**
- Nội dung: `Mời bạn đời và ông bà. Mọi người chăm bé đều tham gia cùng một nhiệm vụ — và
  chung một dòng thời gian.`

**S10 Hỏi đáp**
- Q: *BabyLeveling là gì?* — A: Ứng dụng theo dõi em bé kiểu game cho iPhone & Apple Watch:
  ghi cữ bú, giấc ngủ, tã, tăng trưởng và sức khỏe — mỗi lần ghi giúp người hùng của bé lên cấp.
- Q: *Hỗ trợ thiết bị nào?* — A: iPhone (iOS 17 trở lên) và Apple Watch.
- Q: *Có miễn phí không? Khi nào ra mắt?* — A: Sắp ra mắt — tham gia danh sách chờ để là người
  đầu tiên và biết giá ngay khi có.
- Q: *Dữ liệu của bé có riêng tư không?* — A: Dữ liệu của bé là của bạn. (Chi tiết ở trang quyền riêng tư.)
- Q: *Là app theo dõi hay chỉ là game?* — A: Cả hai. Chế độ Ba Mẹ là nhật ký nghiêm túc, sẵn
  sàng cho bác sĩ; chế độ RPG là cũng dữ liệu đó dưới dạng phiêu lưu.
- Q: *Cả hai vợ chồng dùng được không?* — A: Được — chia sẻ gia đình cho phép bạn đời và ông
  bà cùng tham gia nhiệm vụ của bé.

**S11 CTA cuối**
- Tiêu đề: **Có mặt ngay từ Cấp 1.**
- Nội dung: `Hành trình bắt đầu khi ra mắt. Giữ chỗ trong danh sách chờ.`
- Placeholder: `ban@email.com` · CTA: **Tham gia danh sách chờ**
- Thành công: **Xong rồi. +1 thành viên đội!** *Chúng tôi sẽ email ngay khi cuộc phiêu lưu bắt đầu.*
- Lỗi: `Có lỗi xảy ra — thử lại nhé.` · Không hợp lệ: `Vui lòng nhập email hợp lệ.`

**S12 Footer** — *BabyLeveling — mỗi ngày là một nhiệm vụ mới.* + điều hướng + Quyền riêng tư · Điều khoản · © 2026

---

### Localization notes for implementation
- JA/VI lines run longer/shorter than EN — design must flex (see [[03-storyboard-motion-visual#8-4-layout-grid]]); no fixed-width text containers.
- Keep `BabyLeveling`, theme names (Royal/Warrior/Zen), and "XP/HP/EXP" untranslated across locales (brand + loved gaming terms).
- Per-locale OG images and `<title>/<description>` (targets in [[04-seo-aeo]]).
- All strings live in locale files keyed by the i18n map; no hard-coded copy in components.

→ Build it: [[06-execution]]
</content>
