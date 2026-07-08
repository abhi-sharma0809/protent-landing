export type RoleSection = {
  heading: string;
  body?: string;
  items?: string[];
};

export type JobRole = {
  id: string;
  title: string;
  team: string;
  location: string;
  employmentType: 'full-time' | 'internship';
  summary: string;
  sections: RoleSection[];
};

const FLEXIBLE_LOCATION = 'On-site or remote · Full-time';
const FLEXIBLE_LOCATION_INTERN = 'On-site or remote · Internship';

const ABOUT_PROTENT =
  'Protent is real-time video intelligence for law enforcement and security teams. Police departments today pay people to manually watch hundreds of camera streams to catch crime as it happens, and they catch fewer than 1 in 200. We use vision-language models to detect critical incidents in real time. We are already working with law enforcement, critical infrastructure, military, K-12, and university customers. We are backed by Y Combinator and operate in a fast-paced, early-stage environment.';

const FOUNDING_DETAILS = [
  'On-site or remote, depending on what works best for you',
  'Founding team member on a Y Combinator-backed startup',
  'Direct work with the founders',
  'Competitive salary plus cash bonuses and equity bonuses tied to performance',
];

const INTERNSHIP_DETAILS = [
  'On-site or remote, depending on what works best for you',
  'Paid internship with cash bonuses for strong contributors',
  'Direct mentorship from founders and engineers',
  'Strong performers considered for full-time offers',
];

export const FULL_TIME_ROLES: JobRole[] = [
  {
    id: 'video-infrastructure-engineer',
    title: 'Video Infrastructure Engineer',
    team: 'Engineering',
    location: FLEXIBLE_LOCATION,
    employmentType: 'full-time',
    summary:
      'Build the ingestion layer that connects any camera or VMS into the Protent dashboard. This is the bridge between messy, real-world video infrastructure and our real-time AI.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "Every customer's video lives somewhere different: a different camera brand, a different VMS (Genetec, Milestone, Avigilon, Axis, Verkada), a different network, different security rules. Your job is to build the ingestion layer that connects any of those video sources into the Protent dashboard, and to do it as cheaply and securely as possible. This is the bridge between messy, real-world camera infrastructure and our real-time AI. It's the single thing that decides whether we onboard a new department in days or months. You'll be a founding engineer working directly with us, owning this layer end to end.",
      },
      {
        heading: 'Our stack',
        body: 'We run our video pipeline on MediaMTX and FFmpeg today, ingesting RTSP/ONVIF feeds into our cloud and delivering frames to our vision-language models. You\'ll own and scale this layer.',
      },
      {
        heading: "What you'll do",
        items: [
          'Build and operate integrations that pull live and recorded video from a wide range of sources (IP cameras, NVRs/encoders, and major VMS platforms like Genetec Security Center/Omnicast, Milestone XProtect, Avigilon, Axis, and Verkada) into the Protent dashboard',
          'Own and extend our MediaMTX + FFmpeg pipeline: ingest, transcode, multiplex, and route live and recorded streams reliably',
          'Architect distributed, real-time pipelines that connect cameras, the cloud, and end users with low latency and high reliability',
          'Build a transcoding/multiplexing layer that is fault-tolerant and cost-efficient, minimizing bandwidth and cloud compute (smart transcoding, SD-by-default, local/edge filtering, sending only what matters)',
          'Make every connection secure by default: outbound-only / no inbound port forwarding, encrypted transport (TLS, RTSP over HTTPS / SRTP), proper certificate and credential handling, network segmentation',
          'Build lightweight edge connectors that non-technical IT staff at agencies can deploy with minimal friction',
          'Handle the realities of field video: NAT traversal, reconnection, codec quirks (H.264/H.265), clock sync, and stream reliability at scale',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Strong hands-on experience with FFmpeg and MediaMTX (or equivalent RTSP servers / streaming pipelines)',
          'Strong experience with video streaming protocols: RTSP, ONVIF, RTP/SRTP, WebRTC/HLS',
          'Hands-on integration with IP cameras, NVRs/encoders, and at least one major VMS (Genetec, Milestone, Avigilon, Axis, Verkada)',
          'Solid networking fundamentals: IP networking, VLANs, NAT traversal, firewalls, PoE, TLS/certificates, and secure remote-access patterns (reverse tunnels, zero-trust connectors)',
          'A cost-conscious mindset. You instinctively optimize for bandwidth and compute.',
          'Backend proficiency in Go and/or Python (C++/Rust a plus) and cloud infrastructure experience (AWS, Docker, Kubernetes, Porter)',
          'Self-directed and pragmatic. Comfortable in an early-stage environment, remote or on-site.',
        ],
      },
      {
        heading: 'How to stand out',
        items: [
          'Experience deploying into security, government, or regulated/high-trust environments (CJIS familiarity a plus)',
          'Experience with video at scale (hundreds+ of concurrent streams)',
          'Experience with edge/on-device software for cloud-connected cameras',
        ],
      },
      { heading: 'Details', items: FOUNDING_DETAILS },
    ],
  },
  {
    id: 'full-stack-software-engineer',
    title: 'Full-Stack Software Engineer',
    team: 'Engineering',
    location: FLEXIBLE_LOCATION,
    employmentType: 'full-time',
    summary:
      'Build the operator-facing product: real-time alerts, plain-language search, and the dashboard law enforcement teams use every shift.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "Operators live in the Protent dashboard during incidents. You'll own the full stack behind it: the alert queue, live camera walls, plain-language search, and the workflows that let a human verify before anything is dispatched. You'll work directly with founders and early customers to ship fast, iterate on real feedback, and build software that has to work when stakes are high.",
      },
      {
        heading: "What you'll do",
        items: [
          'Design and build the operator dashboard: alert triage, camera context, search, and live feed management',
          'Own features end to end: API design, backend services, and frontend UX in React/TypeScript',
          'Integrate with our real-time video and vision-language pipeline so alerts land with the right context, fast',
          'Work with agency customers and founders to turn field feedback into shipped product',
          'Build for reliability, auditability, and the security expectations of law enforcement environments',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Strong full-stack experience. Comfortable owning features from database to UI.',
          'Proficiency in TypeScript/React and at least one backend language (Python, Go, or similar)',
          'Experience building real-time or data-heavy web applications',
          'Product sense: you care about operator UX, not just clean code',
          'Self-directed and pragmatic. Comfortable in an early-stage environment, remote or on-site.',
        ],
      },
      {
        heading: 'How to stand out',
        items: [
          'Experience building tools for operators, dispatch, security, or other high-stakes workflows',
          'Familiarity with video, streaming, or live data surfaces',
          'Experience shipping in regulated or high-trust environments',
        ],
      },
      { heading: 'Details', items: FOUNDING_DETAILS },
    ],
  },
  {
    id: 'ai-research-scientist',
    title: 'AI Research Scientist',
    team: 'Research',
    location: FLEXIBLE_LOCATION,
    employmentType: 'full-time',
    summary:
      'Fine-tune vision-language models to detect critical activity in live camera feeds. Own the model layer that turns raw video into alerts operators can trust.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "Protent runs on vision-language models that watch live camera feeds and surface the activity operators care about. Your job is to make those models work in the real world: fine-tuning on field video, improving detection quality, and shipping updates that land in production. You'll work directly with founders on the core AI stack, from data curation through evaluation to deployment on live feeds at law enforcement and security customers.",
      },
      {
        heading: 'Our stack',
        body: 'We work with open and commercial VLMs, fine-tuning them with LoRA, supervised fine-tuning (SFT), and related techniques. You will own the training pipeline, evaluation harness, and the loop that turns customer feedback and field data into better models.',
      },
      {
        heading: "What you'll do",
        items: [
          'Fine-tune vision-language models for activity detection on live surveillance video using LoRA, SFT, and related methods',
          'Build and maintain training datasets from real camera footage: labeling workflows, quality control, and domain-specific curation',
          'Design evaluation benchmarks that reflect what operators actually need to catch in the field',
          'Improve model latency, accuracy, and reliability on diverse camera conditions (lighting, angles, codecs, motion)',
          'Collaborate with infrastructure and product engineers to get model updates into production on live feeds',
          'Stay current on VLM research and adapt what works to our use case: defined activity detection, not open-ended prediction',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Hands-on experience fine-tuning large models, including VLMs or multimodal models',
          'Strong practical knowledge of LoRA, supervised fine-tuning (SFT), and modern training workflows (PyTorch, Hugging Face, or similar)',
          'Experience working with video understanding, computer vision, or multimodal AI',
          'Comfort building data pipelines, running experiments, and measuring what actually improves production performance',
          'Python proficiency and familiarity with GPU training infrastructure (cloud or local)',
          'Self-directed and pragmatic. Comfortable in an early-stage environment, remote or on-site.',
        ],
      },
      {
        heading: 'How to stand out',
        items: [
          'Published work or shipped projects involving VLMs, video understanding, or fine-tuning at scale',
          'Experience with efficient fine-tuning (LoRA, QLoRA, adapter methods) on limited compute budgets',
          'Background applying ML in high-stakes or real-time settings where false positives and latency matter',
        ],
      },
      { heading: 'Details', items: FOUNDING_DETAILS },
    ],
  },
  {
    id: 'gtm',
    title: 'Go-to-Market',
    team: 'Go-to-market',
    location: FLEXIBLE_LOCATION,
    employmentType: 'full-time',
    summary:
      'Own how Protent reaches and wins law enforcement and security agencies, from first conversation to signed contract.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "We're early with real traction: paying customers across law enforcement, universities, K-12, and critical infrastructure, backed by Y Combinator, with a product that solves a problem departments feel every day. You'll work directly with the founders to build our go-to-market motion: finding the right agencies, running demos that land, and closing deals. This is a founding GTM role, not a playbook execution job.",
      },
      {
        heading: "What you'll do",
        items: [
          'Build and run outbound and inbound pipeline targeting law enforcement, campus security, and critical infrastructure teams',
          'Lead demos and discovery calls. Translate operator pain into a clear Protent story.',
          'Partner with founders on pricing, positioning, and contract structure for public-sector buyers',
          'Feed customer learnings back to product and engineering so the roadmap stays tied to revenue',
          'Represent Protent at conferences, pilot programs, and agency introductions',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Track record selling technical products, ideally into government, public safety, or security',
          'Comfortable running demos and discovery with command staff, IT, and procurement',
          'Strong written and verbal communication. You can explain complex tech simply.',
          'Hustle and ownership. You build the playbook, not follow one.',
          'Self-directed. Comfortable in an early-stage environment, remote or on-site.',
        ],
      },
      {
        heading: 'How to stand out',
        items: [
          'Existing relationships in law enforcement or public-sector security',
          'Experience selling into CJIS-regulated or RFP-driven environments',
          'Background in video surveillance, VMS, or physical security',
        ],
      },
      { heading: 'Details', items: FOUNDING_DETAILS },
    ],
  },
  {
    id: 'relationship-manager',
    title: 'Relationship Manager',
    team: 'Customer success',
    location: FLEXIBLE_LOCATION,
    employmentType: 'full-time',
    summary:
      'Be the trusted partner for agency customers, from onboarding through daily operations, expansion, and renewals.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "Agencies don't buy software and figure it out alone, especially in public safety. You'll be the primary relationship owner for our customers: guiding onboarding, coordinating with their IT teams, making sure operators get value from day one, and growing accounts as they see results. You'll sit at the intersection of customer trust, deployment success, and revenue retention.",
      },
      {
        heading: "What you'll do",
        items: [
          'Own the customer relationship from signed contract through onboarding, go-live, and ongoing success',
          'Coordinate deployments with customer IT, our engineering team, and agency stakeholders',
          'Run check-ins with command staff and operators to ensure Protent is delivering value on live cameras',
          'Identify expansion opportunities: new sites, feeds, and use cases within existing accounts',
          'Capture feedback and field issues so product and engineering can respond quickly',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Experience in customer success, account management, or implementation, ideally in B2B or public sector',
          'Strong interpersonal skills. Comfortable with command staff, IT directors, and operators.',
          'Organized and proactive. You anticipate problems before customers escalate them.',
          'Technical enough to discuss camera infrastructure, VMS, and network constraints credibly',
          'Self-directed. Comfortable in an early-stage environment, remote or on-site.',
        ],
      },
      {
        heading: 'How to stand out',
        items: [
          'Background in law enforcement, security operations, or government technology',
          'Experience onboarding customers onto video or physical security systems',
          'Familiarity with agency procurement and renewal cycles',
        ],
      },
      { heading: 'Details', items: FOUNDING_DETAILS },
    ],
  },
];

export const INTERNSHIP_ROLES: JobRole[] = [
  {
    id: 'intern-video-infrastructure',
    title: 'Video Infrastructure Engineer',
    team: 'Engineering',
    location: FLEXIBLE_LOCATION_INTERN,
    employmentType: 'internship',
    summary:
      'Help build and test integrations that connect IP cameras and VMS platforms into Protent\'s real-time video pipeline.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "You'll work alongside our founding engineers on the ingestion layer, the systems that pull live RTSP/ONVIF feeds from cameras and VMS platforms into our cloud. Great fit if you want hands-on experience with FFmpeg, streaming protocols, and real-world video infrastructure.",
      },
      {
        heading: "What you'll do",
        items: [
          'Assist in building and testing camera and VMS integrations (Genetec, Milestone, Avigilon, Axis, Verkada, and others)',
          'Debug stream reliability issues: reconnection, codec quirks, NAT traversal',
          'Help improve our MediaMTX + FFmpeg pipeline and edge connector tooling',
          'Document integration patterns and deployment steps for agency IT teams',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Coursework or project experience with video streaming, networking, or systems programming',
          'Familiarity with FFmpeg, RTSP, or ONVIF (or strong motivation to learn quickly)',
          'Comfortable in Python or Go',
          'Curious, self-directed, and eager to work on real production infrastructure',
        ],
      },
      { heading: 'Details', items: INTERNSHIP_DETAILS },
    ],
  },
  {
    id: 'intern-full-stack',
    title: 'Full-Stack Software Engineer',
    team: 'Engineering',
    location: FLEXIBLE_LOCATION_INTERN,
    employmentType: 'internship',
    summary:
      'Ship features on the operator dashboard: alerts, search, and the tools law enforcement teams use during live incidents.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "You'll contribute to the product surface operators use every day: alert workflows, camera views, and plain-language search. You'll work with full-time engineers and founders on scoped projects that ship to production.",
      },
      {
        heading: "What you'll do",
        items: [
          'Build and improve dashboard features in React/TypeScript',
          'Work on backend APIs and services that power alerts and search',
          'Participate in code review, customer feedback sessions, and sprint planning',
          'Ship a meaningful project end to end during your internship',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Strong fundamentals in web development (JavaScript/TypeScript, React, or similar)',
          'Some backend experience or willingness to work across the stack',
          'Portfolio, coursework, or side projects that show you can ship',
          'Interest in product UX and real-world impact',
        ],
      },
      { heading: 'Details', items: INTERNSHIP_DETAILS },
    ],
  },
  {
    id: 'intern-ai-research-scientist',
    title: 'AI Research Scientist',
    team: 'Research',
    location: FLEXIBLE_LOCATION_INTERN,
    employmentType: 'internship',
    summary:
      'Help fine-tune vision-language models for real-time activity detection on live camera feeds.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "You'll work with our research and engineering team on the VLM stack that powers Protent: fine-tuning models with LoRA and supervised fine-tuning (SFT), curating training data from field video, and running experiments to improve detection quality. Good fit if you want hands-on experience shipping ML research into a product that runs on live cameras.",
      },
      {
        heading: "What you'll do",
        items: [
          'Assist with fine-tuning vision-language models using LoRA, SFT, and related techniques',
          'Help build and clean training datasets from surveillance and security video',
          'Run evaluation experiments and compare model performance across activity types and camera conditions',
          'Support the pipeline from trained checkpoint to inference on live feeds',
          'Read and summarize relevant VLM research for the team',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Coursework or project experience in machine learning, computer vision, or multimodal AI',
          'Familiarity with PyTorch and at least one fine-tuning workflow (LoRA, SFT, or similar)',
          'Interest in vision-language models and applying them to real-world video',
          'Curious, self-directed, and comfortable working with messy, real-world data',
        ],
      },
      { heading: 'Details', items: INTERNSHIP_DETAILS },
    ],
  },
  {
    id: 'intern-gtm',
    title: 'Go-to-Market',
    team: 'Go-to-market',
    location: FLEXIBLE_LOCATION_INTERN,
    employmentType: 'internship',
    summary:
      'Support pipeline building, outreach, and demos as Protent grows among law enforcement and security agencies.',
    sections: [
      { heading: 'About Protent', body: ABOUT_PROTENT },
      {
        heading: 'The role',
        body: "You'll work directly with the founders on go-to-market: researching target agencies, supporting outreach, preparing demo materials, and learning how a technical product gets sold into public safety.",
      },
      {
        heading: "What you'll do",
        items: [
          'Research and qualify law enforcement, campus security, and infrastructure prospects',
          'Support outbound campaigns and inbound lead follow-up',
          'Help prepare demo environments and customer-facing materials',
          'Join discovery calls and demos to learn how agencies evaluate video intelligence tools',
          'Track pipeline metrics and summarize customer feedback for the team',
        ],
      },
      {
        heading: "What we're looking for",
        items: [
          'Strong communication and writing skills',
          'Interest in sales, marketing, or business development at an early-stage company',
          'Organized and proactive. You follow through without constant direction.',
          'Genuine curiosity about public safety technology and how agencies buy software',
        ],
      },
      { heading: 'Details', items: INTERNSHIP_DETAILS },
    ],
  },
];
