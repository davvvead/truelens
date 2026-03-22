/**
 * TrueLens Simulated Scenario Data
 * ---------------------------------
 * Scenario: "What programs help internationally trained nurses in Nova Scotia?"
 *
 * Instructions:
 * 1. Replace each PASTE_YOUR_RESPONSE_HERE block with the actual model response text.
 * 2. Replace each PASTE_YOUR_AUDIT_HERE block with the TrueLens audit text for that model.
 * 3. Keep the backtick string format and escape any backticks in your text with \`
 */

export type ModelId = "gpt-5.3" | "claude-sonnet-4-6" | "gemini-3.0";

export type ScenarioData = {
    id: string;
    /** Keywords used to detect this scenario from the user's query */
    keywords: string[];
    /** The canonical question shown above the response */
    question: string;
    /** Per-model AI responses */
    responses: Record<ModelId, string>;
    /** Per-model TrueLens audit results */
    audits: Record<ModelId, string>;
};

const scenarios: ScenarioData[] = [
    {
        id: "internationally-trained-nurses-ns",
        keywords: [
            "nurse",
            "nurses",
            "nursing",
            "internationally trained",
            "itn",
            "healthcare credential",
            "nova scotia",
            "bridging program",
            "nsha",
        ],
        question:
            "What programs help internationally trained nurses in Nova Scotia?",

        responses: {
            // ─────────────────────────────────────────────────────────────
            // GPT 5.3 RESPONSE
            // Paste GPT 5.3's answer below, between the backticks
            // ─────────────────────────────────────────────────────────────
            "gpt-5.3": `If you’re an internationally educated nurse (IEN) looking to work in Nova Scotia, there are several programs designed to help you bridge into the Canadian system, meet licensing requirements, and find work.
Here are the main ones 👇
🏥 Key Programs for Internationally Trained Nurses (Nova Scotia)
1. RN Bridging / Re-Entry Program (Nova Scotia Health)
Offered by the Nova Scotia Health Learning Institute
Designed for nurses educated outside Canada
Helps you:
Learn Canadian nursing standards
Fill education/skills gaps
Prepare for the NCLEX-RN exam
Often required if the regulator identifies gaps in your training
👉 This is one of the main bridging programs used to qualify for licensing in Nova Scotia.
2. IEN Orientation Program (ISANS)
Run by Immigrant Services Association of Nova Scotia (ISANS)
About 22 weeks of training
Includes:
Canadian healthcare system overview
Workplace communication skills
Nursing-specific courses (e.g., health assessment)
Mentorship and exam prep
👉 Great for newcomers who need orientation + support, not just academic bridging.
3. St. Francis Xavier (StFX) IEN Distance Nursing Program
Online courses tailored to your specific competency gaps
Based on what the nursing regulator says you’re missing
Helps you upgrade to Canadian-level nursing knowledge
👉 Flexible option if you don’t need a full bridging program.
4. Enhanced IEN Orientation (Health Association of Nova Scotia)
Short program (about 6 weeks)
Combines:
Classroom learning
Hands-on mentorship in healthcare settings
👉 Good for quick workplace readiness and confidence-building.
5. Nursing Transition Program (NS Health + StFX)
Newer program (launched around 2025)
Helps IENs transition into practice with ongoing training cohorts
6. PASS Program (Pre-Arrival & Post-Arrival Support)
Free program for internationally educated nurses
Helps with:
Understanding licensing steps
Mentorship & networking
Job search and system navigation
👉 Useful before or after arriving in Canada.
7. Language & Communication Support Programs
Example: National Healthcare Language Program (NHLP)
Focuses on:
Patient communication
Healthcare-specific English skills
👉 Important if language is a barrier to licensing or employment.
🧭 Important: Licensing Pathway (Nova Scotia)
Before or alongside these programs, you’ll go through the regulator:
Nova Scotia College of Nursing (NSCN)
They assess your credentials and may require:
Bridging program
Competency assessment
Recent practice or re-entry education
👍 How to Choose the Right Program
Need full credential upgrade? → RN Bridging Program
Need orientation + support? → ISANS IEN Program
Only small gaps? → StFX courses
Need job readiness fast? → Enhanced Orientation
Still overseas? → PASS Program
✅ Bottom line:
Nova Scotia has a well-developed pathway for internationally trained nurses, combining bridging education, orientation, language training, and mentorship to help you become licensed and employed.
If you want, tell me:
RN or LPN?
Already in Canada or not?
I can map out your exact step-by-step pathway 👍
`,

            // ─────────────────────────────────────────────────────────────
            // CLAUDE SONNET 4.6 RESPONSE
            // Paste Claude Sonnet 4.6's answer below, between the backticks
            // ─────────────────────────────────────────────────────────────
            "claude-sonnet-4-6": `Here's an overview of the key programs and supports available for internationally trained nurses (IENs) in Nova Scotia:

**Regulatory Body: Nova Scotia College of Nursing (NSCN)**

All IENs must go through the NSCN for registration and licensure. The traditional pathway requires applying through the National Nursing Assessment Service (NNAS). Note that as of January 20, 2025, the previously available Expedited Pathway for nurses from seven designated countries has been temporarily paused for new applicants.

**Bridging & Education Programs**

- **RN Bridging/Re-Entry Program** — Offered by the Nova Scotia Health Learning Institute for Health Care Providers, this NSCN-approved program graduates 90–120 learners per year. It involves virtual learning, skills, simulation, and a clinical component designed to bridge education gaps for successful licensure in Nova Scotia.

- **LPN Re-Entry Program** — Offered by Nova Scotia Community College (NSCC) for internationally educated nurses who need to meet LPN licensure requirements.

- **ISANS IEN Orientation Program** — Run by the Immigrant Services Association of Nova Scotia (ISANS), this program includes a 22-week Foundations of Nursing Practice course, structured study groups, Adult Health Assessment workshops, workplace communication skills development, mentorship from experienced nurse educators, and access to a Healthcare Sciences Library.

- **Communication for Nurses (ISANS)** — A free online course offered by ISANS to help internationally trained nurses enhance their communication skills and prepare for the Canadian English Language Benchmark Assessment for Nurses (CELBAN).

**Competency Assessment**

If the NSCN identifies educational gaps in your nursing program, you may be required to complete a competency assessment through the Nursing Community Assessment Service (NCAS), which uses a Computer-Based Assessment and a Simulation Lab Assessment to evaluate entry-level competencies.

**Conditional Licence**

While preparing to write the registration exam, IENs may qualify for a conditional licence, which allows them to practice in Nova Scotia. These licences must be renewed every four months.

**Employment & Recruitment Support**

- Nova Scotia Health's **NICHE program** (Nova Scotia's International Community of Healthcare Workers Engagement Program) provides comprehensive recruitment and retention support for internationally educated health professionals, including a mentorship program to support IENs post-graduation and integration into the health care system.

- Nova Scotia Health actively hires internationally educated nurses — interested candidates can apply at jobs.nshealth.ca and email internationalrecruitment@nshealth.ca with licensure updates.

**Financial Support**

Windmill Microlending offers low-interest loans to help cover the costs of bridging programs and credentialing for internationally trained nurses.

A good starting point is the **NS Internationally Educated Nurses Network** at nsienn.ca, which consolidates pathway and resource information in one place.`,

            // ─────────────────────────────────────────────────────────────
            // GEMINI 3.0 RESPONSE
            // Paste Gemini 3.0's answer below, between the backticks
            // ─────────────────────────────────────────────────────────────
            "gemini-3.0": `Nova Scotia has significantly streamlined its process for internationally educated nurses (IENs) in recent years. Depending on where you are in your journey—whether you are still abroad, newly arrived, or looking for financial help—there are several key programs available.

1. Fast-Track Licensing (Designated Countries)

The Nova Scotia College of Nursing (NSCN) has an expedited licensing pathway for nurses from specific countries: Philippines, India, Nigeria, USA, UK, Australia, and New Zealand.

The Benefit: If you are licensed in good standing in one of these countries, you can apply directly to NSCN, often bypassing the long NNAS (National Nursing Assessment Service) wait times.

Result: Eligible nurses can often receive a license in weeks rather than months.

2. Educational & Bridging Programs

If the regulator determines you have "educational gaps," you may be referred to these programs:

RN Bridging/Re-Entry Program: Offered by the Nova Scotia Health Learning Institute. This program includes online theory, in-person labs/simulations, and clinical placements. It typically lasts about 10 months but can be shorter depending on your specific requirements.
+1

Competency Assessments: Instead of full bridging, some nurses take a shorter assessment (through Inspire Global Assessments) to prove their skills, which can reduce the number of courses needed.

Orientation to the Canadian Health Care System: A free 8-week online course for IENs to help them understand the cultural and professional nuances of working in Canada.

3. Settlement & Career Support

ISANS (Immigrant Services Association of Nova Scotia):

Communication for Nurses: A specialized English language course focused on medical terminology and workplace communication.

CELBAN Prep: Help preparing for the Canadian English Language Benchmark Assessment for Nurses.

Employment Counseling: One-on-one help with resumes and interview prep specifically for the healthcare sector.

PASS Program: A pre-arrival program that helps nurses while they are still in their home countries with webinars, mentorship, and planning.

4. Financial Assistance

Nursing registration and bridging can be expensive. Several options help offset these costs:

Atlantic Immigration Career Loan Fund: Provides micro-loans (up to $15,000) for immigrants to cover the costs of exams, licensing fees, and living expenses while studying.

Windmill Microlending: A national charity offering low-interest loans specifically for skilled immigrants to get their Canadian credentials.

Bursaries: Periodically, the Nova Scotia government offers bursaries (sometimes ranging from $1,500 to $16,000) to help cover the cost of the RN Bridging program.

5. Recruitment & Navigators

IEN Navigators: Nova Scotia Health employs "Navigators" whose sole job is to help IENs walk through the complex steps of immigration, licensing, and finding a job.

Conditional Licenses: In some cases, you may be eligible for a conditional license that allows you to work (under supervision) while you finish your final exams or bridging requirements.


Would you like me to help you find the specific contact information for the IEN Navigators or the latest application deadlines for the RN Bridging program?`,
        },

        audits: {
            // ─────────────────────────────────────────────────────────────
            // GPT 5.3 AUDIT
            // Paste the TrueLens audit for GPT 5.3's response below
            // ─────────────────────────────────────────────────────────────
            "gpt-5.3": `📍 Region Detected: Nova Scotia
👤 Audience Profile: Internationally Trained Nurse
📊 Coverage Score: 4 / 78 verified regional programs
⚠️ Visibility Gap: 94.9% of programs not represented

WHAT GPT-5.3 GOT RIGHT
GPT identified four solid programs — the RN Bridging Program, ISANS IEN Orientation, StFX distance courses, and the PASS Program. These are legitimate starting points for the licensing pathway.

WHERE GPT-5.3 FAILED YOU

❌ No Financial Support Mentioned
GPT gave you four programs and zero dollars. It never mentioned:

- Nova Scotia Bridging Bursary — Up to $16,000 to cover RN Bridging costs. Applications open quarterly — NS Office of Immigration

- Atlantic Immigration Career Loan Fund — Micro-loans up to $15,000 for licensing fees, exam costs, and living expenses while bridging — ACOA Atlantic

- Windmill Microlending — Low-interest loans for skilled immigrants covering credential recognition costs — Windmill Microlending Canada

❌ No Employment Connection
GPT told you how to get licensed but not how to get hired. It missed:

- Halifax Connector Program — Direct employer-to-nurse matching. Connects you with hiring managers before you finish bridging — Halifax Partnership

- Nova Scotia Health IEN Navigator — A dedicated navigator to walk you through licensing, employment, housing and community settlement — Nova Scotia Health Authority

❌ Geographic Blind Spot
Every program GPT mentioned assumes Halifax. Nova Scotia has 21 counties. It never mentioned:

- Cape Breton IEN Employment Initiative — Accelerated placement for IENs willing to work in Cape Breton Regional Hospital and surrounding health centres. Includes relocation support — CBRM Health Services

❌ Fast Track Pathway Completely Missing
GPT never mentioned that nurses from Nigeria, Philippines, India, UK, USA, Australia and New Zealand may qualify for expedited licensing — bypassing standard NNAS wait times entirely.

💡 WHY THIS GAP EXISTS
GPT answered the credential question accurately but missed the financial, employment, and regional programs that determine whether you can actually complete the pathway and get hired. Those programs live in provincial health authority pages and regional partnership directories that rarely appear in AI training data.

✅ All TrueLens programs sourced from 211.ca, Nova Scotia Health Authority directories, and verified provincial partnership registries.`,

            // ─────────────────────────────────────────────────────────────
            // CLAUDE SONNET 4.6 AUDIT
            // Paste the TrueLens audit for Claude Sonnet 4.6's response below
            // ─────────────────────────────────────────────────────────────
            "claude-sonnet-4-6": `📍 Region Detected: Nova Scotia
👤 Audience Profile: Internationally Trained Nurse
📊 Coverage Score: 5 / 78 verified regional programs
⚠️ Visibility Gap: 93.6% of programs not represented

WHAT CLAUDE SONNET 4.6 GOT RIGHT
This response provided accurate and current information — correctly noting that the expedited pathway has been paused as of January 20, 2025. It also correctly identified the NICHE program at Nova Scotia Health and provided the direct hiring contact at internationalrecruitment@nshealth.ca.

WHERE CLAUDE SONNET 4.6 STILL FAILED YOU

❌ Financial Support Severely Incomplete
This response mentioned only Windmill Microlending. It completely missed:

- Nova Scotia Bridging Bursary — Up to $16,000 specifically for RN Bridging program costs. The single largest financial support available and the most searched program by IENs in Nova Scotia — NS Office of Immigration

- Atlantic Immigration Career Loan Fund — Up to $15,000 in micro-loans covering exam fees, licensing costs, and living expenses during bridging — ACOA Atlantic

❌ Peer Support Network Missing
This response referenced nsienn.ca as a starting point but never described what it actually offers — a full peer network of IENs who completed this pathway and actively mentor newcomers through it. That community is often what makes the difference between completing the pathway and dropping out.

- NS Internationally Educated Nurses Network — Peer mentorship, pathway navigation, and community support run by IENs for IENs — NSIENN (nsienn.ca)

❌ Rural and Regional Programs Absent
This response assumed Halifax throughout. It never mentioned:

- Cape Breton IEN Employment Initiative — Accelerated placement with relocation support for nurses serving communities outside Halifax — CBRM Health Services

- Rural Nova Scotia Nursing Incentive — Signing bonus and loan forgiveness for IENs committing to rural placements. The fastest employment pathway currently available in Nova Scotia — NS Department of Health and Wellness

❌ Halifax Connector Program Missing
This program was not mentioned in the response.

- Halifax Connector Program — Employer matching that connects internationally trained professionals with Nova Scotia employers before credential recognition is complete — Halifax Partnership

💡 WHY THIS GAP EXISTS
This response provided accurate licensing information, but accuracy about licensing pathways is not the same as completeness about regional employment and financial support. The programs missed here are actively funded, currently accepting applicants, and specifically designed for this exact situation. They simply do not appear in the data sources AI systems learn from. That gap is exactly what TrueLens exists to close.

✅ All TrueLens programs sourced from 211.ca, Nova Scotia Health Authority directories, and verified provincial partnership registries. Last verified March 2026.`,

            // ─────────────────────────────────────────────────────────────
            // GEMINI 3.0 AUDIT
            // Paste the TrueLens audit for Gemini 3.0's response below
            // ─────────────────────────────────────────────────────────────
            "gemini-3.0": `📍 Region Detected: Nova Scotia
👤 Audience Profile: Internationally Trained Nurse
📊 Coverage Score: 6 / 78 verified regional programs
⚠️ Visibility Gap: 92.3% of programs not represented

WHAT GEMINI 3.0 GOT RIGHT
This response correctly identified the fast-track licensing pathway for designated countries, financial options including the Atlantic Immigration Career Loan Fund and Windmill Microlending, and IEN Navigators at Nova Scotia Health. This is genuinely useful information.

WHERE GEMINI 3.0 STILL FAILED YOU

❌ Fast Track Is Currently Paused
This response presented the expedited licensing pathway for designated countries as fully active. It is not. As of January 20, 2025, the Nova Scotia College of Nursing has temporarily paused this pathway for new applicants. A nurse planning around fast-track licensing based on this response is building on outdated information.

❌ Employment Programs Still Missing
This response still missed:

- Halifax Connector Program — Direct employer matching for internationally trained healthcare professionals. Connects you with Nova Scotia Health hiring managers before bridging is complete — Halifax Partnership

- NS Internationally Educated Nurses Network — Peer network run by IENs for IENs. Real people who completed this exact pathway sharing what actually worked — NSIENN (nsienn.ca)

❌ Rural Nova Scotia Completely Absent
This response assumed urban placement throughout. It never mentioned:

- Rural Nova Scotia Nursing Incentive — Financial incentives and accelerated placement for IENs committing to rural communities. Includes signing bonus and loan forgiveness — NS Department of Health and Wellness

- Cape Breton IEN Employment Initiative — Regional placement program with relocation support for nurses willing to serve communities outside Halifax — CBRM Health Services

❌ Bursary Amount Understated
This response mentioned bursaries ranging from $1,500 to $16,000 without clarifying that the full $16,000 is available and actively disbursed for the RN Bridging program specifically.

💡 WHY THIS GAP EXISTS
This response covered more ground than average and still missed 92% of verified regional programs. The fast-track error is the most significant finding. Confident, detailed, and outdated information causes real harm when people make career decisions based on it. TrueLens verifies currency, not just existence.

✅ All TrueLens programs sourced from 211.ca, Nova Scotia Health Authority directories, and verified provincial partnership registries. Last verified March 2026.`,
        },
    },
];

export default scenarios;
