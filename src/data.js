export const kpiData = [
  {
    id: 1,
    category: "Mental Health Improvement (K10+/K5)",
    kpi: "Percentage of clients who showed improvement using the K10+/K5 outcome measure",
    questions: [
      { id: "1_total", label: "Number of clients with matched pairs of outcome scores (K10+/K5 or other validated tool)", type: "number" },
      { id: "1_improved", label: "Number of clients with matched pairs who showed improvement", type: "number" },
      { id: "1_not_recorded", label: "Number of clients that didn’t record results (completed as part of SEWB program participation)", type: "number" },
      { id: "1_tool", label: "What outcome measure tool was used?", type: "text" }
    ]
  },
  {
    id: 2,
    category: "Mental Health Improvement (RAS-DS)",
    kpi: "Percentage of clients who showed improvement using the RAS-DS outcome measure",
    questions: [
      { id: "2_total", label: "Number of clients with matched pairs of RAS-DS outcome scores", type: "number" },
      { id: "2_improved", label: "Number of clients with matched pairs who showed improvement", type: "number" },
      { id: "2_not_reported", label: "Number of clients with outcome scores not reported", type: "number" },
      { id: "2_sewb", label: "Number of clients not reported due to SEWB program participation", type: "number" }
    ]
  },
  {
    id: 3,
    category: "Service Delivery - Unique Clients",
    kpi: "Number of clients who received a service",
    questions: [
      { id: "3_gender", label: "Gender breakdown (man/male, woman/female, non-binary, different term, preferred not to answer)", type: "textarea" },
      { id: "3_age", label: "Age group breakdown (0-17, 18-24, 25-44, 45-64, 65+, not reported)", type: "textarea" },
      { id: "3_indigenous", label: "Aboriginal and Torres Strait Islander Status breakdown", type: "textarea" },
      { id: "3_cald", label: "Cultural and linguistic diversity status", type: "textarea" },
      { id: "3_neuro", label: "Neurodevelopmental condition (autism, ADHD, etc.)", type: "textarea" },
      { id: "3_severity", label: "Mental health severity (moderate, severe, not reported)", type: "textarea" },
      { id: "3_unique", label: "Number of unique clients engaged (ie first time clients)", type: "number" }
    ]
  },
  {
    id: 4,
    category: "Service Delivery - Service Contacts",
    kpi: "Number of service contacts (occasions of service) delivered",
    questions: [
      { id: "4_individual", label: "Number of individual service contacts", type: "number" },
      { id: "4_group", label: "Number of group service contacts", type: "number" }
    ]
  },
  {
    id: 5,
    category: "Referrals Received",
    kpi: "Number of referrals received",
    questions: [
      { id: "5_gp", label: "Number of referrals from GP", type: "number" },
      { id: "5_sewb", label: "Number of referrals from SEWB Program staff", type: "number" },
      { id: "5_other", label: "Number of referrals from Other (please specify)", type: "text" }
    ]
  },
  {
    id: 6,
    category: "Referrals Not Accepted",
    kpi: "Number of referrals not accepted",
    questions: [
      { id: "6_criteria", label: "Number: Client does not meet mental health condition eligibility criteria", type: "number" },
      { id: "6_capacity", label: "Number: Workforce and service capacity constraints", type: "number" },
      { id: "6_regional", label: "Number: Limited-service availability in regional and remote area", type: "number" },
      { id: "6_other", label: "Number: Other (please specify)", type: "text" }
    ]
  },
  {
    id: 7,
    category: "Wait Times",
    kpi: "Wait time (in business days) from referral to service contact",
    questions: [
      { id: "7_wait_breakdown", label: "Wait time breakdown (same day, 1-2, 3-4, 5-9, 10-14, 15-29, 30+, has not commenced, or not reported)", type: "textarea" }
    ]
  },
  {
    id: 8,
    category: "Service Duration",
    kpi: "Length of service duration",
    questions: [
      { id: "8_duration_breakdown", label: "Service duration breakdown (1 day-2 wks, 3-4 wks, 1-3 mths, 4-6 mths, > 6 mths)", type: "textarea" }
    ]
  },
  {
    id: 9,
    category: "Outcome Monitoring",
    kpi: "Matched pairs of client outcome scores",
    questions: [
      { id: "9_matched", label: "Number of clients with matched pairs of outcome scores", type: "number" },
      { id: "9_not_completed", label: "Number of clients who have not yet completed services", type: "number" },
      { id: "9_sewb_skipped", label: "Number of clients skipped due to SEWB program participation", type: "number" }
    ]
  },
  {
    id: 10,
    category: "Outcome Changes",
    kpi: "Changes in outcomes scores between service start and service end",
    questions: [
      { id: "10_improved", label: "Number: improvement in outcome measure score", type: "number" },
      { id: "10_deteriorated", label: "Number: deterioration in outcome measure score", type: "number" },
      { id: "10_no_change", label: "Number: No change in outcome measure score", type: "number" },
      { id: "10_not_reported", label: "Number: Not reported", type: "number" }
    ]
  },
  {
    id: 11,
    category: "YES PHN Survey",
    kpi: "Clients with recorded YES PHN Survey scores",
    questions: [
      { id: "11_total", label: "Number of clients with a recorded YES PHN Survey score", type: "number" }
    ]
  },
  {
    id: 12,
    category: "YES PHN Experience",
    kpi: "YES PHN Survey Experience and Outcome Score",
    questions: [
      { id: "12_avg_exp", label: "Average YES Experience score (C1-C12, min 12, max 60)", type: "number" },
      { id: "12_avg_out", label: "Average YES Outcome score (C13-C15, min 3, max 15)", type: "number" },
      { id: "12_better_themes", label: "Top 3 themes: 'My experience would have been better if...'", type: "textarea" },
      { id: "12_best_themes", label: "Top 3 themes: 'The best things about this service were...'", type: "textarea" }
    ]
  },
  {
    id: 13,
    category: "Cultural Safety & Partnership",
    kpi: "Cultural Safety and ACCHO partnership",
    questions: [
      { id: "13_care_sessions", label: "Client Care Planning: How many sessions/conferences attended with ACCHO staff?", type: "number" },
      { id: "13_role", label: "What was your role in these sessions?", type: "text" },
      { id: "13_involvement", label: "Ways ACCHO staff were involved in delivery (co-facilitation, guidance, etc.)", type: "textarea" },
      { id: "13_percentage", label: "Percentage of sessions with ACCHO staff participation (%)", type: "number" },
      { id: "13_influence", label: "Influence of Aboriginal cultural therapists/staff on outcomes", type: "textarea" },
      { id: "13_training", label: "Cultural Safety Training: Did you participate? (Details)", type: "textarea" },
      { id: "13_training_learnings", label: "Key learnings and application in practice", type: "textarea" },
      { id: "13_co_design", label: "Community-Led Activities: Were activities co-designed/initiated by ACCHO? (Details)", type: "textarea" }
    ]
  }
];
