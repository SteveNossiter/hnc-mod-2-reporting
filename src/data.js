export const kpiData = [
  {
    id: 1,
    category: "Mental Health Improvement (K10+/K5)",
    kpi: "Number of clients who showed improvement using the K10+/K5 outcome measure",
    questions: [
      { id: "1_a", label: "a) Number of clients with matched pairs of outcome scores (K10+/K5 or other validated tool used by ACCHO)", type: "number" },
      { id: "1_b", label: "b) Number of clients with matched pairs of outcome scores who showed improvement (using the K10+/K5 or other validated tool) outcome measure", type: "number" },
      { id: "1_c", label: "c) Number of clients that didn’t record results of an outcome measure because they completed as part of the SEWB program participation", type: "number" },
      { id: "1_d", label: "d) What outcome measure tool was used", type: "text" }
    ]
  },
  {
    id: 2,
    category: "Mental Health Improvement (RAS-DS)",
    kpi: "Number of clients who showed improvement using the RAS-DS outcome measure",
    questions: [
      { id: "2_a", label: "a) Number of clients with matched pairs of RAS-DS outcome scores", type: "number" },
      { id: "2_b", label: "b) Number of clients with matched pairs of outcome scores who showed improvement using the RAS-DS outcome measure", type: "number" },
      { id: "2_c", label: "c) Number of clients with outcome scores not reported", type: "number" },
      { id: "2_d", label: "d) Number of clients with outcome scores not reported because they reported as part of SEWB program participation", type: "number" }
    ]
  },
  {
    id: 3,
    category: "Service Delivery - Unique Clients",
    kpi: "Number of clients who received a service by...",
    questions: [
      { id: "3_a_header", label: "a) gender", type: "header" },
      { id: "3_a_i", label: "i) Man / Male", type: "number" },
      { id: "3_a_ii", label: "ii) Woman / Female", type: "number" },
      { id: "3_a_iii", label: "iii) Non-Binary", type: "number" },
      { id: "3_a_iv_num", label: "iv) Different term (Number)", type: "number" },
      { id: "3_a_iv_text", label: "iv) Different term (Fill in term)", type: "text" },
      { id: "3_a_v", label: "v) Prefer not to say", type: "number" },

      { id: "3_b_header", label: "b) Age Group", type: "header" },
      { id: "3_b_i", label: "i) 0-17", type: "number" },
      { id: "3_b_ii", label: "ii) 18-24", type: "number" },
      { id: "3_b_iii", label: "iii) 25-44", type: "number" },
      { id: "3_b_iv", label: "iv) 45-64", type: "number" },
      { id: "3_b_v", label: "v) 65+", type: "number" },
      { id: "3_b_vi", label: "vi) Not reported", type: "number" },

      { id: "3_c_header", label: "c) Aboriginal / Torres Strait Islander status", type: "header" },
      { id: "3_c_i", label: "i) Aboriginal", type: "number" },
      { id: "3_c_ii", label: "ii) Torres Strait Islander", type: "number" },
      { id: "3_c_iii", label: "iii) Aboriginal and Torres Strait Islander", type: "number" },
      { id: "3_c_iv", label: "iv) Neither", type: "number" },
      { id: "3_c_v", label: "v) Not reported", type: "number" },

      { id: "3_d_header", label: "d) Cultural and linguistic diversity status", type: "header" },
      { id: "3_d_i", label: "i) Culturally diverse", type: "number" },
      { id: "3_d_ii", label: "ii) Linguistically diverse", type: "number" },
      { id: "3_d_iii", label: "iii) Culturally and linguistically diverse", type: "number" },
      { id: "3_d_iv", label: "iv) Not reported", type: "number" },

      { id: "3_e_header", label: "e) Neurodevelopmental condition", type: "header" },
      { id: "3_e_i", label: "i) Autism", type: "number" },
      { id: "3_e_ii", label: "ii) ADHD", type: "number" },
      { id: "3_e_iii", label: "iii) Intellectual disability", type: "number" },
      { id: "3_e_iv", label: "iv) Dyslexia", type: "number" },
      { id: "3_e_v_num", label: "v) Other - specify (Number)", type: "number" },
      { id: "3_e_v_text", label: "v) Other - specify (Fill in condition)", type: "text" },

      { id: "3_f_header", label: "f) Mental health severity", type: "header" },
      { id: "3_f_i", label: "i) Moderate", type: "number" },
      { id: "3_f_ii", label: "ii) Severe", type: "number" },
      { id: "3_f_iii", label: "iii) Not reported", type: "number" },

      { id: "3_g_header", label: "g) Engagement Status", type: "header" },
      { id: "3_g", label: "g) Number of unique clients engaged (ie first time clients)", type: "number" }
    ]
  },
  {
    id: 4,
    category: "Service Delivery - Service Contacts",
    kpi: "Number of service contacts (occasions of service) delivered",
    questions: [
      { id: "4_a", label: "a) Number of individual service contacts (occasions of service) delivered", type: "number" },
      { id: "4_b", label: "b) Number of group service contacts (occasions of service) delivered", type: "number" }
    ]
  },
  {
    id: 5,
    category: "Referrals Received",
    kpi: "Number of referrals received by source",
    questions: [
      { id: "5_a", label: "a) GP", type: "number" },
      { id: "5_b", label: "b) SEWB Program staff", type: "number" },
      { id: "5_c", label: "c) Other (please specify)", type: "text" }
    ]
  },
  {
    id: 6,
    category: "Referrals Not Accepted",
    kpi: "Number of referrals not accepted by reason",
    questions: [
      { id: "6_a", label: "a) Client does not meet mental health condition eligibility criteria", type: "number" },
      { id: "6_b", label: "b) Workforce and service capacity constraints", type: "number" },
      { id: "6_c", label: "c) Limited-service availability in regional and remote area", type: "number" },
      { id: "6_d", label: "d) Other (please specify)", type: "text" }
    ]
  },
  {
    id: 7,
    category: "Wait Times",
    kpi: "Wait time (in business days) from referral to service contact by:",
    questions: [
      { id: "7_a", label: "a) same day", type: "number" },
      { id: "7_b", label: "b) 1-2", type: "number" },
      { id: "7_c", label: "c) 3-4", type: "number" },
      { id: "7_d", label: "d) 5-9", type: "number" },
      { id: "7_e", label: "e) 10-14", type: "number" },
      { id: "7_f", label: "f) 15-29", type: "number" },
      { id: "7_g", label: "g) 30+", type: "number" },
      { id: "7_h", label: "h) has not commenced", type: "number" },
      { id: "7_i", label: "i) or not reported", type: "number" }
    ]
  },
  {
    id: 8,
    category: "Service Duration",
    kpi: "Number of clients with a service duration of:",
    questions: [
      { id: "8_a", label: "a) 1 day to 2 weeks", type: "number" },
      { id: "8_b", label: "b) 3-4 weeks", type: "number" },
      { id: "8_c", label: "c) 1 to 3 months", type: "number" },
      { id: "8_d", label: "d) 4-6 months", type: "number" },
      { id: "8_e", label: "e) more then 6 months", type: "number" }
    ]
  },
  {
    id: 9,
    category: "Outcome Monitoring",
    kpi: "Matched pairs of client outcome scores",
    questions: [
      { id: "9_a", label: "a) Number of clients with matched pairs of outcome scores", type: "number" },
      { id: "9_b", label: "b) Number of clients who have not yet completed services", type: "number" },
      { id: "9_c", label: "c) Number of clients with outcome scores not reported because they reported as part of SEWB program participation", type: "number" }
    ]
  },
  {
    id: 10,
    category: "Outcome Changes",
    kpi: "Number of clients with matched pairs of outcome scores who showed",
    questions: [
      { id: "10_a", label: "a) improvement in outcome measure score", type: "number" },
      { id: "10_b", label: "b) deterioration in outcome measure score", type: "number" },
      { id: "10_c", label: "c) No change in outcome measure score", type: "number" },
      { id: "10_d", label: "d) Not reported", type: "number" }
    ]
  },
  {
    id: 11,
    category: "YES PHN Survey",
    kpi: "Clients with recorded YES PHN Survey scores",
    questions: [
      { id: "11_main", label: "Number of clients with a recorded YES PHN Survey score", type: "number" }
    ]
  },
  {
    id: 12,
    category: "YES PHN Experience",
    kpi: "YES PHN Survey Experience and Outcome Score",
    questions: [
      { id: "12_a", label: "a) Average number of clients with an average YES Experience score (C1-C12, minimum 12, maximum 60)", type: "number" },
      { id: "12_b", label: "b) Average number of clients with an average YES Outcome score (C13-C15, minimum 3, maximum 15)", type: "number" },
      { id: "12_c", label: "c) Top 3 themes in response to 'My experience would have been better if...'", type: "textarea" },
      { id: "12_d", label: "d) Top 3 most common themes in responses to 'The best things about this service were...'", type: "textarea" }
    ]
  },
  {
    id: 13,
    category: "Cultural Safety & Partnership",
    kpi: "Cultural Safety and ACCHO partnership",
    questions: [
      { id: "13_header_1", label: "Quarterly Reporting Checklist - Client Care Planning", type: "header" },
      { id: "13_a", label: "a) How many client care planning sessions or case conferences did you attend in partnership with ACCHO staff?", type: "number" },
      { id: "13_b", label: "b) What was your role in these sessions?", type: "text" },
      { id: "13_header_2", label: "ACCHO Involvement in Service Delivery", type: "header" },
      { id: "13_c", label: "c) In what ways were ACCHO staff involved in delivering creative therapy sessions? (e.g., co-facilitation, cultural guidance, family engagement, referral support)", type: "textarea" },
      { id: "13_d", label: "d) What percentage of sessions included ACCHO staff participation?", type: "number" },
      { id: "13_e", label: "e) How has the involvement of Aboriginal cultural therapists and ACCHO staff influenced client engagement, cultural safety, and overall wellbeing outcomes?", type: "textarea" },
      { id: "13_header_3", label: "Cultural Safety Training & Mentoring", type: "header" },
      { id: "13_f", label: "a) Did you participate in cultural safety training, cultural supervision or mentoring activities?", type: "textarea" },
      { id: "13_g", label: "b) How many activities, what were the key learnings and how have they been applied in your practice?", type: "textarea" },
      { id: "13_header_4", label: "Community-Led Activities", type: "header" },
      { id: "13_h", label: "a) Were any creative therapy activities were initiated or co-designed by ACCHO or community members?", type: "textarea" }
    ]
  }
];
