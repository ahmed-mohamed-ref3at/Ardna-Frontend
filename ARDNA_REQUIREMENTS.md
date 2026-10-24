# BUILD ARDNA — A PREMIUM, COMPLETE FRONTEND FOR NASA SPACE APPS 2026

## YOUR ROLE

You are acting as a senior frontend engineer, world-class UI/UX designer, product designer, and creative director.

Your task is to **DESIGN AND IMPLEMENT a complete, beautiful, interactive frontend web application** called:

# Ardna | أرضنا
### From Earth's Data to Better Farming Decisions

This project is being developed for the **NASA Space Apps Challenge 2026**, under the challenge:

**Field Shift: Adapting Farms with NASA Data**

Our ambition is to create a project competitive for **Global Nominee recognition**.

This does not mean you should create an ordinary NASA-themed website. You must create a memorable, polished product that combines a compelling Egyptian agricultural identity, exceptional user experience, clear scientific storytelling, and meaningful interactive features.

**Do not guarantee competition recognition. Instead, deliver a frontend that demonstrates outstanding product quality.**

---

# 1. CRITICAL INSTRUCTIONS

**You must actually build the application in the project workspace.**

Do not simply respond with:

- A project plan.
- An architectural explanation.
- Pseudocode.
- UI design recommendations.
- A list of features without implementation.

Implement the complete frontend and make it runnable.

### Scope

This is a **FRONTEND-ONLY** project.

Do not implement:

- A backend server.
- A real user authentication service.
- A production database.
- Actual NASA API integrations.
- Machine learning model training.
- Real agricultural recommendations.
- Payment systems.
- IoT infrastructure.

Instead, create a sophisticated frontend experience powered by well-structured, realistic **mock data**, browser state, and local persistence.

The website should feel like a fully functional product during a live demonstration.

All mock scientific results must be clearly labeled as illustrative.

### Working rules

1. Inspect the existing repository before making changes.
2. If it is empty, initialize the project.
3. If it already contains useful frontend code, preserve and improve it.
4. Implement all core screens, navigation, and interactions.
5. Install the necessary dependencies.
6. Run the application and fix implementation errors.
7. Run available lint, type-check, and build commands.
8. If browser testing or screenshots are available, inspect the actual rendered application and fix visual problems.
9. Continue through implementation and validation without stopping after creating the initial homepage.
10. Deliver a runnable project, not an unfinished scaffold.

Make reasonable design decisions independently and prioritize working functionality over decorative complexity.

---

# 2. RECOMMENDED TECHNOLOGY STACK

Use:

- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui or accessible Radix-based components
- Lucide React icons
- Framer Motion for subtle animations
- Apache ECharts or Recharts for scientific data visualizations
- MapLibre GL JS with polygon-drawing capabilities, or another robust React-compatible mapping solution
- Turf.js or an equivalent library for geographical area calculations
- Zustand or React Context for application state
- LocalStorage for persistent demonstration data

You may choose equivalent libraries if they provide a more stable implementation.

Use reusable, maintainable components and consistent TypeScript interfaces.

Do not introduce unnecessary architectural complexity.

### Desktop priority

Optimize the product primarily for:

- 1920 × 1080 desktop screens
- 1440 × 900 laptop screens

Create a professional widescreen dashboard experience.

Basic responsive behavior is welcome, but **do not build a separate mobile application or spend significant effort on a mobile-specific demo**.

---

# 3. PRODUCT VISION

Ardna is an Egyptian agricultural decision-support platform designed to help farmers answer one of the most important questions they face:

**"What should I grow next, and what should I grow after that?"**

Egyptian farmers face problems involving:

- Limited irrigation-water availability.
- Rising temperatures and climate variability.
- Soil salinity and declining soil health in some areas.
- Repeated cultivation of the same crops.
- Uncertainty about crop suitability.
- Agricultural input costs.
- Difficulties accessing understandable scientific information.

Ardna aims to turn Earth observation data, crop knowledge, farmer-provided information, and agricultural planning principles into an intuitive digital experience.

The system helps farmers explore **multi-season crop rotation strategies**, not merely receive a single crop recommendation.

A farmer should be able to:

1. Identify their farmland on a map.
2. Draw its geographical boundaries.
3. Review estimated soil and climate conditions.
4. Provide information about previous crops and irrigation.
5. Select their farming priorities.
6. Compare different crop rotation plans.
7. Understand why a plan was recommended.
8. Save a preferred plan.
9. Follow seasonal activities.
10. Return next season with an updated farm history.

The platform must provide **two connected experiences**:

### Farmer Portal

Simple, welcoming, practical, Arabic-first.

### Science Lab

Advanced, analytical, visually impressive, transparent, and scientifically explainable.

Both experiences must use the same farm and crop rotation information.

---

# 4. BRAND IDENTITY AND UI/UX DIRECTION

## Brand name

**أرضنا | Ardna**

## Arabic tagline

**أرضك تعرفها، وزراعتك تخطط لها.**

## English tagline

**From Earth's Data to Better Farming Decisions.**

## Design personality

The application should feel:

- Modern.
- Elegant.
- Trustworthy.
- Human-centered.
- Agricultural.
- Egyptian.
- Innovative.
- Premium.
- Easy to understand.

Imagine a combination of:

- A premium modern SaaS application.
- A beautiful agricultural sustainability platform.
- A professional Earth observation dashboard.
- A highly accessible farmer-friendly product.

Do not copy the interface or branding of any existing product.

## Color system

Primary forest green: `#174B35`

Secondary natural green: `#3D8852`

Warm cream background: `#F7F7F0`

Wheat-gold accent: `#DDAA57`

White surfaces: `#FFFFFF`

Muted red for verified warnings.

Muted orange for missing or uncertain information.

Use soft borders, gentle shadows, tasteful gradients, and consistent spacing.

## Typography

Use Cairo, IBM Plex Sans Arabic, or a similarly polished Arabic font.

Arabic is the default language.

Ensure proper right-to-left layout.

Use correct Arabic typography and avoid malformed mixed Arabic-English alignment.

English scientific terms may appear where appropriate.

## Design requirements

- Spacious, carefully composed layouts.
- Strong visual hierarchy.
- Large, meaningful headings.
- Attractive but restrained imagery.
- Refined cards.
- Beautiful tab navigation.
- Clearly identifiable primary actions.
- Subtle hover states.
- Consistent loading states.
- Well-designed empty states.
- Accessible contrast.
- Clear feedback after user interactions.
- Smooth navigation transitions.
- No excessive animation.
- No overwhelming walls of text.
- No randomly colored cards.
- No generic bootstrap-looking interface.

Every major screen should look professionally designed.

## Imagery

Use suitable images of:

- Egyptian Nile Delta farmland.
- Irrigation canals.
- Wheat fields.
- Maize.
- Fava beans.
- Agricultural soil.
- Egyptian agricultural landscapes.

Use properly licensed images or well-designed local SVG illustrations.

If remote photography is unreliable, use local visual assets or designed illustrations instead of broken image placeholders.

The website must remain visually attractive when external images fail to load.

---

# 5. COMPLETE WEBSITE STRUCTURE

The application must contain these main sections:

1. Homepage.
2. Farmer Portal.
3. Farm Location and Boundary Selection.
4. Farm Profile.
5. Farmer Information Form.
6. Farming Priorities Selection.
7. Crop Rotation Planner.
8. Crop Rotation Comparison.
9. Recommendation Explanation.
10. Registration and Saved Profile.
11. My Farm Dashboard.
12. My Rotation Plan.
13. Farm Notebook and Seasonal Calendar.
14. Science Lab.
15. NASA Data and Scientific Methodology.
16. Egypt Agricultural Atlas.
17. Crop Encyclopedia.
18. About Our Mission.

Create a coherent route structure using Next.js.

All relevant pages should be connected through navigation and contextual links.

No dead-end pages.

---

# 6. HOMEPAGE — THE FIRST IMPRESSION

Build a visually outstanding homepage.

This is the first screen seen by potential users, teammates, and NASA judges.

## Desktop navigation

Include:

- الرئيسية
- بوابة المزارع
- المختبر العلمي
- أطلس الزراعة
- موسوعة المحاصيل
- من نحن

Include language and account controls.

Use a refined, sticky navigation bar.

## Hero section

Use a beautiful, authentic Egyptian agricultural landscape.

Create an elegant editorial composition with a bold Arabic heading:

**أرضك تعرفها، وزراعتك تخطط لها.**

Supporting description:

**منصة ذكية تساعد المزارع المصري يفهم أرضه، ويختار أولوياته، ويخطط لدورته الزراعية للمواسم الجاية.**

Primary CTA:

**ابدأ بأرضك**

Secondary CTA:

**استكشف الجانب العلمي**

Both buttons must navigate correctly.

## Homepage sections

After the hero, add:

### The Problem

Explain the agricultural challenges facing farmers in Egypt using a sophisticated visual layout.

### How Ardna Works

Show an elegant four-step journey:

حدد أرضك → افهم ظروفها → خطط زراعتك → تابع موسمك

### Two Connected Experiences

Show beautiful visual cards for Farmer Portal and Science Lab.

### Why Crop Rotation Matters

Explain the difference between recommending one crop and planning multiple agricultural seasons.

### Powered by Earth Observations

Show how NASA data contributes to agricultural decision-making without implying that NASA directly recommends crops.

### Explore Egyptian Agriculture

Promote Egypt Atlas and Crop Encyclopedia.

### Mission and Final Call to Action

Encourage visitors to discover their land.

The homepage should be visually rich but not overcrowded.

---

# 7. FARMER ONBOARDING — FIND MY FARM

The main Farmer Portal begins with a friendly screen:

**فين أرضك؟**

Supporting text:

**اختار الطريقة الأسهل ليك علشان نوصلك لأرضك على الخريطة.**

Display three beautiful selectable cards.

### Option 1 — Use My Location

**استخدم موقعي الحالي**

When clicked:

- Request browser geolocation permission.
- Show loading feedback.
- If successful, center the map around the detected coordinates.
- If denied or unavailable, show a clear Arabic explanation and manual alternatives.
- Never pretend location access succeeded.
- Do not assume the detected coordinates are the farm boundaries.

### Option 2 — Manual Location Search

**ابحث عن أرضك**

Display:

- Governorate selector.
- District/Markaz selector.
- Village or local area search.

The experience must follow:

**المحافظة ← المركز ← القرية أو المنطقة**

Provide Egyptian governorate choices.

Use accurate known districts where available, and allow a custom area entry when a village is not listed.

Primary demo location:

**البحيرة → دمنهور → منطقة زراعية قريبة من دمنهور**

Clicking **افتح الخريطة** navigates to the appropriate map view.

### Option 3 — Open Map Directly

**اختار من الخريطة**

Allow users to explore the map manually.

All three options must lead to the same boundary-selection experience.

---

# 8. FARM BOUNDARY DRAWING — SIGNATURE FEATURE

This is one of the most important experiences in the entire product.

Build an interactive desktop map interface.

The map should occupy most of the screen, accompanied by a beautiful right-side Arabic control panel.

## Map requirements

- Zoom controls.
- Pan interaction.
- Location search.
- Satellite/map mode selector where supported.
- Draw Polygon button.
- Add polygon vertices by clicking.
- Close polygon.
- Edit vertices.
- Undo last point.
- Clear selection.
- Confirm boundary.
- Save polygon coordinates in frontend state.

The map must be genuinely interactive, not a static screenshot.

Use a real tile provider where possible, respecting attribution and licensing.

Satellite imagery may require a configured provider or API key. Provide a clearly labeled demo fallback rather than silently pretending ordinary map tiles are satellite imagery.

## Drawing interaction

The user clicks:

**حدد حدود أرضك**

The cursor places points around the farm.

Green lines connect the vertices.

After completing the polygon, the farm appears highlighted using a semi-transparent green fill.

Show draggable editing handles.

Calculate polygon area using a proper geographical area calculation.

Display area in:

- Square meters.
- Egyptian feddans.
- Qirats.

Use approximately:

1 feddan = 4,200.83 square meters.

1 feddan = 24 qirats.

Never display a fabricated area independent of the actual polygon.

Show a small disclaimer:

**الحدود المرسومة تقديرية لأغراض التخطيط الزراعي، وليست إثبات ملكية.**

Primary button:

**تأكيد حدود الأرض**

## Demo Farm

Include an optional **استخدم أرضًا تجريبية** action.

It should load a deterministic sample field near Damanhour.

The farm polygon, calculated area, map location, and associated information must remain consistent throughout the application.

This makes the entire website easy to demonstrate even if the map service is unavailable.

---

# 9. FARM PROFILE — UNDERSTAND YOUR LAND

After confirming the farm, navigate to:

**بطاقة أرضك**

Use a beautiful desktop dashboard layout.

Include:

- Farm name.
- Governorate and district.
- Farm area.
- Small map with the highlighted farm.
- Estimated climate conditions.
- Available soil information.
- Irrigation information.
- Previous crop information.

Create four large cards.

### المناخ

Historical seasonal climate context.

### التربة

Estimated soil texture, pH, organic carbon, and other relevant information when available.

### المياه

Irrigation source, type, and water availability.

### تاريخ الزراعة

Previous crops and farming seasons.

Each card must open an actual detail panel.

Use badges that clearly distinguish:

- Observed or sourced regional data.
- Estimated information.
- Farmer-provided information.
- Missing information.

**Never imply that satellite observations provide exact laboratory soil measurements for a small individual farm.**

---

# 10. FARMER INFORMATION FORM

Create a polished, low-friction step-by-step questionnaire.

Avoid long forms.

Ask:

### Question 1

**آخر محصول زرعته كان إيه؟**

Display crop selection cards with illustrations.

Options include:

- قمح
- ذرة
- فول بلدي
- محصول آخر

### Question 2

**بتروي أرضك إزاي؟**

- ري سطحي
- ري بالتنقيط
- ري بالرش
- مش عارف

### Question 3

**مصدر مياه الري إيه؟**

- ترعة
- بئر
- مصدر آخر
- مش عارف

### Question 4

**المياه متوفرة طول الموسم؟**

- متوفرة غالبًا
- أحيانًا محدودة
- مش متأكد

Provide progress indicators and a Back button.

Store the answers in application state.

Provide reasonable skip options where information is not essential.

---

# 11. FARMER PRIORITIES — CRITICAL PERSONALIZATION

This screen is mandatory and should be especially polished.

Heading:

**إيه أهم حاجة عندك في زراعتك؟**

Subtitle:

**اختار هدفك الأساسي، وهنرتب الخطط الزراعية حسب أولوياتك.**

Display four large selectable cards.

### Water Conservation

**توفير المياه**

Icon: water droplet.

### Soil Health

**تحسين صحة التربة**

Icon: healthy plant or soil.

### High Productivity

**إنتاجية عالية**

Icon: wheat.

### Balanced

**التوازن بين الأهداف**

Icon: balance scales.

The balanced option is selected by default.

When a user selects a different goal:

- Highlight the selected card.
- Display a checkmark.
- Show a short explanation of the selected objective.
- Persist the choice.
- Use it to influence plan ranking.

This must not be a purely decorative selection.

Primary button:

**اعرض خطط الزراعة**

---

# 12. CROP ROTATION PLANNER — THE CORE PRODUCT

Build a visually outstanding planning dashboard.

Heading:

**أزرع إيه بعد كده؟**

Subtitle:

**قارن بين خطط زراعية على عدة مواسم تناسب ظروف أرضك وأهدافك.**

The interface should look like a premium decision-support product.

## Layout

- Farm summary sidebar.
- Current farming priority selector.
- Main crop rotation cards.
- Comparison actions.
- Explanation panel.
- Save Plan action.

Display three candidate crop rotation plans.

### Plan A — Water-Focused Example

Winter 2026/2027: Fava beans.

Summer 2027: Sesame.

Winter 2027/2028: Wheat.

### Plan B — Balanced Example

Winter 2026/2027: Wheat.

Summer 2027: Maize.

Winter 2027/2028: Fava beans.

### Plan C — Alternative Example

Winter 2026/2027: Clover.

Summer 2027: Maize.

Winter 2027/2028: Wheat.

These are **illustrative UI sequences only**, not validated agronomic recommendations for the selected land.

## Crop rotation card design

Each card should include:

- Plan name.
- Season-by-season crop timeline.
- Crop photographs or illustrations.
- Arrows between consecutive crops.
- Water requirements indicator.
- Soil-health benefit indicator.
- Productivity suitability indicator.
- Main trade-offs.
- Evidence status.
- Compare button.
- Why This Plan button.
- Select Plan button.

The cards should be beautiful, spacious, and easy to compare.

Avoid unsupported claims such as guaranteed crop success or exact yield increases.

---

# 13. LIVE PLAN COMPARISON AND PRIORITY RANKING

The user must be able to compare at least two plans side by side.

Use a premium comparison interface.

Compare:

- Water demand.
- Soil-management considerations.
- Productivity suitability.
- Seasonal suitability.
- Crop succession.
- Missing information.
- Estimated costs only if credible input data is available.

Changing the farmer's priority must actually update the ordering and scoring of eligible plans.

Use the following **illustrative demo scoring model**.

### Example normalized metrics

| Plan | Water | Soil | Productivity |
|---|---:|---:|---:|
| A | 90 | 65 | 70 |
| B | 65 | 90 | 76 |
| C | 50 | 63 | 95 |

### Example priority weights

Water conservation:

- Water: 55%
- Soil: 25%
- Productivity: 20%

Soil health:

- Water: 25%
- Soil: 55%
- Productivity: 20%

High productivity:

- Water: 20%
- Soil: 20%
- Productivity: 60%

Balanced:

- Water: 33%
- Soil: 33%
- Productivity: 34%

Calculate:

**Rotation Score = Water Score × Water Weight + Soil Score × Soil Weight + Productivity Score × Productivity Weight**

Display integer scores out of 100.

The numerical results must be computed from the demo values, not hardcoded individually for each priority.

For example, under Water Conservation:

Plan A = 79.75, displayed as approximately 80/100.

Changing priorities should dynamically change the scores and ranking.

Make this interaction visually satisfying and easy to understand.

### Scientific honesty

These weights and demo values are illustrative.

Display:

**تقييم تجريبي للمقارنة، وليس نسبة نجاح المحصول.**

Clearly distinguish the final comparative score from the quality of supporting evidence.

Do not interpret 80/100 as an 80% probability of success.

A confirmed violation of an essential agricultural constraint must make a plan ineligible rather than merely reduce its score.

For the initial demo, the three candidate plans may be marked as provisionally eligible under illustrative assumptions.

---

# 14. EXPLAINABLE RECOMMENDATIONS

Every plan must have a functional button:

**ليه رشحنالك الخطة دي؟**

Clicking opens a beautifully designed side panel.

Sections:

### Reasons for Recommendation

**أسباب ترشيح الخطة**

Explain the relevant decision factors in farmer-friendly language.

### Missing Information

**حاجات محتاجة تأكيد**

Mention soil testing, actual water availability, and other missing information when relevant.

### Rejected Alternatives

**ليه بعض المحاصيل مش موجودة؟**

Show illustrative reasons why some options may conflict with documented constraints or lack sufficient evidence.

### Scientific Detail

Button:

**عرض التحليل العلمي**

This opens the corresponding plan's explanation in Science Lab.

The Farmer Portal and Science Lab must share the same selected plan and score.

---

# 15. DEMO REGISTRATION AND SAVING PLANS

Do not require registration before the user experiences the core product.

After selecting a rotation, show:

**خطتك الزراعية جاهزة 🌱**

Offer:

**احفظ خطتك علشان ترجع لها في المواسم الجاية.**

Create a simple, beautiful frontend-only demo registration experience.

Fields:

- Name.
- Email or phone.
- Optional additional profile information.

Use an explicit **Demo Account** workflow.

Store only non-sensitive demo profile information locally.

Do not store real passwords in localStorage.

Do not pretend that a production authentication service exists.

After the user completes the demo registration:

- Save the selected farm.
- Save their priority.
- Save their selected crop rotation.
- Navigate to the personalized dashboard.
- Show a success message.

Use a fictional demonstration farmer:

**أحمد**

Located in Beheira near Damanhour.

Include a **Reset Demo Data** action for easy presentation testing.

---

# 16. MY FARM DASHBOARD

After saving a plan, display a personalized experience.

Welcome title:

**أهلًا يا أحمد 🌿**

The dashboard should display:

- Farm satellite/map preview.
- Farm name and area.
- Selected primary priority.
- Saved crop rotation.
- Current or upcoming planning season.
- Farm Notebook preview.
- Important data gaps.
- Relevant next actions.

The page should be action-oriented.

Primary actions:

- عرض خطتي
- تعديل بيانات أرضي
- دفتر أرضي
- خطط للموسم الجاي

The application must remember the demo state after a page refresh.

---

# 17. MY ROTATION PLAN

Build a dedicated My Plan page.

Show the selected plan as an elegant agricultural season timeline.

For each season:

- Crop.
- Farming season.
- Planned planting window.
- Planned harvest window.
- Important notes.
- Seasonal activity placeholders.

Display all dates as indicative unless backed by validated agricultural data.

Allow the user to inspect details for each season.

Provide actions for:

- Reviewing the plan.
- Returning to plan comparison.
- Editing the main priority.
- Saving updated preferences.
- Opening the Farm Notebook.

The same saved plan must appear consistently throughout the product.

---

# 18. FARM NOTEBOOK

Build a complete frontend-only Farm Notebook.

Heading:

**دفتر أرضي**

Sections:

### Crop History

**المحاصيل السابقة**

### Farming Activities

**العمليات الزراعية**

### Expenses

**المصروفات**

### Seasonal Calendar

**مفكرة الموسم**

The user should be able to:

- Add an activity.
- Choose its type.
- Select a date.
- Write optional notes.
- Save the record.
- Edit or delete a record.
- View the activity on a timeline.
- Add an expense.
- View recorded expenses by category.
- View illustrative seasonal reminders.

Supported activity categories:

- Planting.
- Irrigation.
- Fertilization.
- Harvest.
- Other.

Persist demo records in localStorage.

Make the interface functional, polished, and easy to understand.

Show useful empty states when no records exist.

---

# 19. SCIENCE LAB — ADVANCED ANALYTICAL EXPERIENCE

This is one of the most important features for demonstrating scientific credibility.

The Science Lab should feel like a sophisticated research dashboard.

It must be visually distinct from the Farmer Portal in information density while preserving Ardna's identity.

Heading:

**المختبر العلمي | Science Lab**

Subtitle:

**اكتشف البيانات والتحليلات العلمية وراء توصيات أرضنا.**

## Main dashboard

Display:

### Farm Location Panel

Interactive map with the selected farm.

### Temperature Analytics

Line charts showing illustrative seasonal temperature patterns.

### Rainfall Analytics

Bar charts showing illustrative rainfall patterns.

### Soil Analytics

Estimated soil-property cards with source and uncertainty labels.

### Water Requirement Comparison

Charts comparing the demo rotation plans.

### Rotation Score Breakdown

Explain how the selected plan receives its composite score.

### Data Sources

Show NASA and non-NASA sources separately.

### Scientific Methodology

Explain how environmental information contributes to agricultural decision-making.

All charts must have:

- Clear titles.
- Appropriate axes and units.
- Legends.
- Tooltips.
- Descriptive explanations.
- Data source labels.
- An illustrative-data disclaimer where applicable.

Do not populate the Science Lab with unrelated decorative graphs.

---

# 20. NASA DATA TO SCORE EXPLORER — SIGNATURE SCIENTIFIC FEATURE

Create a particularly impressive interactive Science Lab section titled:

**From NASA Data to Your Rotation Score**

Arabic heading:

**إزاي بيانات ناسا بتساعدنا نقيّم الخطة الزراعية؟**

This section should visually demonstrate the entire reasoning journey.

## Step 1 — Earth Observation Data

Show beautiful source cards.

### NASA POWER

Temperature, solar radiation, humidity, and related climate variables.

These help characterize the seasonal environment and contribute to crop suitability and water-demand assessment.

### NASA GPM IMERG

Precipitation estimates and seasonal rainfall context.

### NASA SMAP

Regional soil-moisture context where appropriate.

Clearly explain that coarse-resolution soil moisture is not an exact measurement of a small Egyptian farm.

### SoilGrids — ISRIC

Estimated pH, soil texture, organic carbon, and related characteristics.

**Clearly identify SoilGrids as a non-NASA source.**

### Farmer Inputs

Irrigation method, water constraints, crop history, soil testing, and farmer priorities.

## Step 2 — Agricultural Interpretation

Show how raw environmental data becomes meaningful agricultural indicators.

Examples:

- Temperature suitability for crop growth stages.
- Seasonal climate suitability.
- Crop water demand.
- Estimated soil suitability.
- Crop succession compatibility.
- Production-related suitability indicators.

Use a professional visual flow diagram.

## Step 3 — Water Requirement Explanation

Show the FAO crop evapotranspiration relationship:

**ETc = Kc × ET0**

Explain:

- ET0: reference evapotranspiration.
- Kc: crop coefficient.
- ETc: crop evapotranspiration.

Use an interactive **illustrative example** where users can change ET0 and Kc values and see ETc update immediately.

For instance:

ET0 = 5 mm/day.

Kc = 0.8.

ETc = 4 mm/day.

Explain that irrigation requirement is not automatically identical to ETc and also depends on effective rainfall, irrigation efficiency, and field conditions.

This calculator is a demonstration of the concept, not a real crop-irrigation prescription.

## Step 4 — Feasibility Check

Show a visual checklist of constraints:

- Agricultural season compatibility.
- Crop environmental requirements.
- Available irrigation conditions.
- Crop succession considerations.
- Documented local restrictions, where available.

A plan that fails a critical confirmed constraint should be shown as ineligible.

Do not produce high scores for obviously ineligible plans.

## Step 5 — Three Score Dimensions

Display three beautiful circular or horizontal score indicators:

**Water Efficiency**

**Soil Management Benefit**

**Productivity Suitability**

Explain that these are normalized comparison indicators.

They are not guarantees of actual water savings, soil improvement, or harvested yield.

## Step 6 — Farmer Priority Weights

Display the selected farmer priority.

Show the exact demo weight distribution.

The user must be able to change the priority and watch the calculated Rotation Score update dynamically.

## Step 7 — Final Score

Display:

**Rotation Suitability Index**

Show the calculation:

Score = Water × Weight + Soil × Weight + Productivity × Weight.

Display the numerical breakdown and comparison with alternative plans.

For Plan A under Water Conservation:

90 × 0.55 + 65 × 0.25 + 70 × 0.20 = 79.75.

Show approximately 80/100.

## Step 8 — Evidence Quality

Create a separate **Evidence Quality** panel.

Explain:

- Which information is observational or sourced.
- Which values are estimated.
- Which values were provided by the farmer.
- Which values are missing.
- Why uncertainty matters.

Do not combine evidence quality with crop suitability as if they represent the same thing.

Use explanatory labels such as:

**Observed / Sourced**

**Estimated**

**Farmer Provided**

**Missing**

This entire NASA-to-Score journey should be one of the visually strongest parts of the application.

**Important: use connected, internally consistent mock values and transparent demo calculations, not fabricated live NASA outputs.**

---

# 21. EGYPT AGRICULTURAL ATLAS

Create a beautiful and interactive section titled:

**أطلس الزراعة في مصر**

This page should be appealing to:

- Farmers.
- Agricultural students.
- Researchers.
- General audiences.
- NASA competition evaluators.

## Design

Use an elegant Egypt map as the centerpiece.

Allow users to select governorates.

At minimum, include polished regional examples for:

- البحيرة
- كفر الشيخ
- الغربية
- المنيا
- أسوان

Display additional Egyptian governorates where reliable geographic data is available.

For each selected region, show:

- Regional agricultural overview.
- Common crops, where supported.
- Climate characteristics.
- Irrigation and water considerations.
- Soil-related challenges.
- Agricultural landscape imagery.

The regional information must be clearly presented as educational context.

This page is not a real-time farm recommendation engine.

The map and region cards must be interactive.

---

# 22. CROP ENCYCLOPEDIA

Create a polished crop information library.

Title:

**موسوعة المحاصيل**

Display a beautiful searchable crop catalog.

Example crops:

- Wheat — القمح
- Maize — الذرة
- Fava Beans — الفول البلدي
- Rice — الأرز
- Clover — البرسيم
- Cotton — القطن
- Tomato — الطماطم
- Potato — البطاطس
- Sesame — السمسم

Support filtering by crop category.

Each crop card must have:

- Image or illustration.
- Arabic name.
- English name.
- Category.
- Short description.
- View Details action.

## Crop Detail Page

Clicking a crop opens a detailed page.

Include:

- Crop overview.
- Agricultural seasons.
- Soil suitability considerations.
- Water requirements.
- Relevant growing conditions.
- Relationship to crop rotations.
- Potential agricultural concerns.
- Important uncertainty or local-validation notes.

Add a contextual action:

**شوف المحصول ضمن خطة أرضك**

This should navigate to the crop rotation planning experience.

Use coherent illustrative content rather than unsupported detailed agricultural claims.

---

# 23. ABOUT OUR MISSION

Create a premium About page.

Headline:

**من بيانات الفضاء... إلى أرض كل فلاح مصري.**

Include sections for:

### Our Story

Why Egyptian agriculture needs accessible decision-support tools.

### Our Mission

Helping farmers make more informed multi-season agricultural decisions.

### NASA Space Apps Challenge

Explain that the project is being developed in the context of the Field Shift challenge.

Do not imply official NASA endorsement.

### Our Approach

Combine Earth observations, agricultural knowledge, farmer priorities, and explainable crop rotation planning.

### Our Team

Create elegant member cards with neutral placeholders.

Do not invent real names, photographs, awards, or partnerships.

### Our Intended Impact

Describe the intended benefits:

- More informed farming decisions.
- Better awareness of irrigation needs.
- More thoughtful crop rotation planning.
- Greater understanding of soil health.
- Accessible agricultural knowledge.
- Continuous seasonal records.

Clearly frame these as intended outcomes, not proven achievements.

---

# 24. APPLICATION STATE AND DEMO CONTINUITY

Every interaction must feel connected.

Use shared application state for:

- User profile.
- Farm location.
- Farm boundary polygon.
- Farm area.
- Irrigation details.
- Previous crops.
- Farming priority.
- Candidate rotations.
- Selected rotation.
- Farm activities.
- Expenses.

Persist meaningful demonstration data locally.

A user should be able to complete the workflow and refresh the page without losing their saved farm and plan.

The Science Lab should recognize the same selected farm and plan.

The Rotation Planner should reflect the current farmer priority.

The Farm Notebook should display newly created records.

The dashboard should reflect saved updates.

Do not use disconnected page-specific fake state that breaks continuity.

---

# 25. DEMONSTRATION MODE

This feature is important.

Create a visible but tasteful option:

**جرّب أرضنا ببيانات تجريبية**

Clicking this should load a complete, internally consistent fictional farm demonstration.

Demo user:

**أحمد**

Demo location:

**البحيرة — دمنهور**

Previous crop:

**ذرة**

Irrigation:

**ري سطحي من ترعة**

Water availability:

**أحيانًا محدودة**

Main farming priority:

**توفير المياه**

Include all candidate rotation plans and illustrative scores.

Allow visitors to explore the entire application without needing real data or a registered account.

The user must still be able to experience the full manual onboarding workflow separately.

Provide a Reset Demo option.

All demo outputs must remain explicitly identified as illustrative.

---

# 26. EXCEPTIONAL UI/UX QUALITY REQUIREMENTS

Do not prioritize quantity of screens over quality.

I expect:

### Beautiful Visual Hierarchy

Every screen should have a clear purpose and a clear primary action.

### Meaningful Empty States

When there is no selected farm, no saved plan, or no notebook entries, display helpful next steps.

### Helpful Loading States

Show skeletons or subtle progress animations where appropriate.

### Realistic Feedback

Use elegant toast notifications for successful saves and user errors.

### Accessible Forms

Labels, keyboard navigation, focus states, and validation messages.

### Professional Motion

Use subtle animations to reinforce state changes.

### High-Quality Dashboard Layout

Avoid clutter and unnecessary widgets.

### Contextual Navigation

Users can move naturally between the Farmer Portal, Science Lab, Crop Library, and their saved plans.

### Scientific Transparency

Important disclaimers and missing information must remain visible without overwhelming the interface.

### No Dead Buttons

Every visible interactive control must perform the advertised action.

If a feature cannot be implemented in a frontend-only prototype, either provide a meaningful simulated experience or clearly label it as unavailable.

### Consistent Arabic

All farmer-facing language must be understandable and natural.

Avoid unnecessarily technical terminology in the Farmer Portal.

---

# 27. NAVIGATION AND INFORMATION ARCHITECTURE

Use two navigation experiences.

## Public Website Navigation

- الرئيسية
- بوابة المزارع
- المختبر العلمي
- أطلس الزراعة
- موسوعة المحاصيل
- من نحن

## Farmer Dashboard Navigation

- الرئيسية
- أرضي
- خطط الزراعة
- خطتي
- دفتر أرضي

Keep shared branding, spacing, typography, and interaction patterns.

Add appropriate breadcrumbs or back navigation where useful.

Onboarding should have clear progress indicators and a simple Back button.

---

# 28. PROJECT ORGANIZATION

Organize the code cleanly.

Suggested structure:

- `app/` — Next.js routes and layouts.
- `components/` — reusable design components.
- `components/maps/` — map and polygon-drawing UI.
- `components/charts/` — chart components.
- `features/farms/` — farm location and profile features.
- `features/rotations/` — rotation planning and comparison.
- `features/notebook/` — seasonal recordkeeping.
- `features/science/` — scientific visualization.
- `data/` — typed mock data and crop catalog.
- `lib/` — utilities and scoring calculations.
- `store/` — shared frontend state.
- `public/` — visual assets.

Use component abstraction sensibly.

Avoid giant components containing entire pages with all their logic.

---

# 29. PRIORITY ORDER FOR IMPLEMENTATION

Implement the application in a deliberate sequence.

### Priority 1 — Visual Foundation

- Next.js setup.
- Design system.
- Fonts.
- Colors.
- Navbar.
- Shared layouts.
- Homepage.

### Priority 2 — Core Farmer Journey

- Location selection.
- Interactive map.
- Boundary drawing.
- Farm Profile.
- Farmer questions.
- Farmer priorities.

### Priority 3 — Main Decision Experience

- Crop rotation cards.
- Working priority-based scoring.
- Plan comparison.
- Explanation panel.
- Save Plan.
- Demo registration.
- Personalized dashboard.

### Priority 4 — Continuing Experience

- My Plan.
- Farm Notebook.
- Calendar.
- LocalStorage persistence.

### Priority 5 — Scientific Experience

- Science Lab.
- Charts.
- NASA Data Source cards.
- NASA-to-Score Explorer.
- Scientific methodology explanations.

### Priority 6 — Supporting Experiences

- Egypt Agriculture Atlas.
- Crop Encyclopedia.
- About Our Mission.
- Visual polish.

Do not sacrifice the core Farmer Journey for decorative extras.

---

# 30. ACCEPTANCE CRITERIA

The project is only complete when the following user journey works:

1. Open Ardna homepage.
2. Click **ابدأ بأرضك**.
3. Choose a location method.
4. Select Beheira and Damanhour or load the demo area.
5. Interact with the map.
6. Draw or edit a farm boundary.
7. Confirm the farm.
8. View the Farm Profile.
9. Enter previous crop and irrigation details.
10. Select Water Conservation as the priority.
11. Generate and view three illustrative crop rotation plans.
12. Compare two plans.
13. Change the farming priority.
14. Observe the calculated ranking change.
15. Open an explanation panel.
16. Save the selected plan using a demo account.
17. Open My Farm dashboard.
18. Open My Plan.
19. Add a farming activity in the Farm Notebook.
20. Refresh the browser and verify the saved state persists.
21. Open Science Lab.
22. View scientific charts and explanations.
23. Explore NASA-to-Score calculations.
24. Open the Egypt Agricultural Atlas.
25. Explore a governorate.
26. Open Crop Encyclopedia.
27. View a crop detail page.
28. Open About Our Mission.
29. Return to the saved Farm Dashboard.

All major navigation paths should be functional.

All displayed demo scoring must be internally consistent.

There must be no broken images, missing assets, fatal browser errors, or obvious placeholder pages.

---

# 31. TESTING AND FINAL QUALITY CHECK

Before finishing:

- Install dependencies.
- Run the development environment.
- Resolve TypeScript errors.
- Run linting.
- Run the production build.
- Verify major routes.
- Test localStorage state restoration.
- Test priority-based scoring.
- Test map drawing or the working demo fallback.
- Inspect Arabic RTL layout.
- Check that charts render properly.
- Verify empty states.
- Check browser console errors.
- Test the full sample farmer journey.

If visual browser testing is available, inspect at least:

- Homepage.
- Location selection.
- Farm boundary screen.
- Farm Profile.
- Priority selection.
- Rotation Planner.
- Plan comparison.
- Science Lab.
- Egypt Atlas.
- Crop Encyclopedia.

Improve weak visual sections before considering the task complete.

---

# 32. FINAL DELIVERABLE

I expect a **complete, polished, functional frontend application**.

When finished, provide:

1. A short overview of the completed application.
2. The project directory structure.
3. Clear instructions for running it locally.
4. A list of implemented routes.
5. Instructions for loading the demo farm.
6. A short explanation of which interactions are functional.
7. A clear distinction between illustrative demo data and real scientific integration still required.
8. Any remaining limitations.

Do not substitute documentation for implementation.

Do not stop after scaffolding the project.

Do not build just one beautiful landing page and leave the rest incomplete.

**The core goal is to create an exceptional, visually memorable, easy-to-use Egyptian agricultural web application that demonstrates the complete Ardna product vision.**

The experience should make viewers say:

**"This is not just an agricultural dashboard. This is a complete, thoughtful product designed around a farmer's real decisions."**

## FINAL INSTRUCTION

Build Ardna now.

Prioritize excellent UI/UX, genuine frontend interactions, scientific transparency, seamless user journeys, and exceptional visual consistency.

The website should be polished enough to demonstrate confidently to the project team and serve as a strong visual foundation for a future NASA Space Apps Challenge submission.

**Make it beautiful. Make it usable. Make it coherent. Make it work.**
