export const profileLinks = [
  ['LinkedIn', 'https://www.linkedin.com/in/naveedkhan0266'],
  ['GitHub', 'https://github.com/khannaveed2020'],
  ['Credly', 'https://www.credly.com/users/naveed-khan.bc5811d0/badges'],
  ['PowerShell Gallery', 'https://www.powershellgallery.com/profiles/TheLastHorcrux'],
] as const

// Received LinkedIn recommendations verified in the profile UI on 5 October 2026.
// Short verbatim excerpts only; no inferred company endorsements or rewritten quotes.
export const testimonials = [
  {
    name: 'Ratnavo Dutta',
    title: 'Senior Infrastructure & Cloud Network Engineer',
    relationship: 'Worked together on the same team at Microsoft',
    date: '2026-01-10',
    displayDate: '10 January 2026',
    quote: 'His positive attitude and professionalism make him a dependable team member.',
    profile: 'https://www.linkedin.com/in/ratnavo-dutta-933517113/',
  },
  {
    name: 'Ankush G',
    title: 'Cloud and Cyber Security Consultant',
    relationship: 'Worked together on the same team',
    date: '2025-09-22',
    displayDate: '22 September 2025',
    quote: 'a true team player, always bringing a positive attitude, clear communication',
    profile: 'https://www.linkedin.com/in/ankush-g-2b62a3150/',
  },
] as const

export const recommendationsUrl = 'https://www.linkedin.com/in/naveedkhan0266/details/recommendations/'

export const experience = [
  { company: 'Microsoft', date: 'May 2024 — Present', role: 'Senior Support Escalation Engineer', summary: 'Complex Azure networking escalations, engineering investigations and customer communication.', bullets: [
    'Resolve complex Azure networking escalations for strategic enterprise customers and coordinate frontline support and engineering investigations to diagnose production failures and restore service.',
    'Lead high-impact incident analysis and customer communication across hybrid connectivity, routing, DNS, VPN, firewall, load-balancing and application-delivery scenarios.',
    'Analyse traffic and platform logs, maintain risk registers and provide capacity-planning guidance during customer reviews.',
    'Mentor engineers, contribute Azure networking knowledge to Microsoft Copilot training and build AI agents with Copilot Studio to automate internal tasks and improve engineering workflows.',
  ] },
  { company: 'Microsoft', date: 'Apr 2022 — Apr 2024', role: 'Support Escalation Engineer', summary: 'Outage resolution and investigations shaped around customer business priorities.', bullets: [
    'Drove outage and large-scale incident resolution, coordinating engineering investigations around customer business priorities.',
    'Managed incident, configuration and process-management activities for complex customer situations and production incidents.',
    'Used Azure diagnostic data, traffic evidence and packet analysis to isolate faults and provide clear remediation guidance.',
  ] },
  { company: 'Microsoft', date: 'Mar 2020 — Apr 2022', role: 'Azure Network Engineer', summary: 'Azure networking deployment, diagnostics and technical readiness.', bullets: [
    'Deployed, configured and diagnosed Azure networking PaaS services: Virtual Network, VPN Gateway, ExpressRoute, Load Balancer, Application Gateway, Azure Firewall and DNS.',
    'Reproduced production issues using PowerShell, Azure CLI and ARM templates; advised customers on cloud onboarding and coached engineers on systematic network troubleshooting and support readiness.',
  ] },
  { company: 'Mphasis', date: 'Jan 2017 — Mar 2020', role: 'Senior Principal Infrastructure Engineer', summary: 'Global infrastructure support across 800+ network devices and 400+ firewall upgrades.', bullets: [
    'Administered 800+ network devices globally across Check Point and Fortinet firewalls, Blue Coat proxies, and HP routers and switches.',
    'Completed 400+ firewall operating-system upgrades across research and development labs and global data centres; deployed patches, implemented policy changes and resolved VPN faults.',
    'Isolated infrastructure faults using ArcSight, firewall logs and NNMi while maintaining change and ticket records in HP Service Manager.',
    'Provided Tier 2 and Tier 3 infrastructure support and received quarterly awards for customer-focused delivery.',
  ] },
  { company: 'HCL Infotech', date: 'Oct 2015 — Jan 2017', role: 'Senior Security Analyst', summary: 'Firewall operations, change implementation and multi-vendor troubleshooting.', bullets: [
    'Administered 150+ firewalls across data centres and resolved Tier 2 and Tier 3 incidents on Check Point Gaia R77.3, Juniper SRX and NetScreen.',
    'Implemented firewall policies, routing, NAT and VPN changes through Check Point Provider-1, NSM and JUNOS Space.',
    'Traced connection failures using STRM and NSM logs and optimised firewall rule bases with Tufin SecureTrack.',
    'Documented changes in Remedy for peer and vendor review and supported firewall clean-up and rule optimisation work.',
  ] },
  { company: 'Wipro Infotech', date: 'Oct 2010 — Oct 2015', role: 'Senior Network and Security Engineer', summary: '24/7 managed security services for more than 30 global customers.', bullets: [
    'Delivered 24/7 managed security services to 30+ global customers across Check Point, Cisco, Juniper, Fortinet, Palo Alto and web and email security platforms.',
    'Configured firewall policies, NAT, VPN tunnels and high-availability clusters and investigated network and security incidents.',
    'Performed first-level incident analysis, handled user-access management requests and investigated network and security alerts using monitoring tools.',
    'Coordinated root-cause analysis with vendors, maintained service availability and produced monthly MIS reports covering infrastructure changes and production impact against SLA commitments.',
    'Created ITIL-aligned operating procedures and trained Level 1 and Level 2 engineers.',
  ] },
]

export const expertise = [
  ['Azure networking', 'Virtual Network, ExpressRoute, VPN Gateway, Application Gateway/WAF, Azure Firewall, Load Balancer, Private Link, Front Door, Traffic Manager, Bastion, Azure NAT Gateway, DNS, DDoS Protection and hybrid IaaS/PaaS connectivity.'],
  ['Enterprise networking', 'TCP/IP, routing, switching, BGP, OSPF, VLANs, VPN, NAT, high availability, packet analysis, capacity review and service restoration.'],
  ['Network security', 'Check Point, Fortinet, Juniper SRX and NetScreen, Palo Alto, Cisco, HP and Blue Coat; firewall policy, rule-base review, web and email security, and multi-vendor troubleshooting.'],
  ['Support & operations', 'Strategic escalations, major incidents, outage coordination, root-cause analysis, problem and change management, ITIL, SLA delivery, risk documentation, customer communication and engineer mentoring.'],
  ['Tools & automation', 'PowerShell, Azure CLI, ARM templates, Wireshark, Log Analytics, ArcSight, Tufin SecureTrack, NNMi, HP Service Manager, Remedy, STRM, NSM and JUNOS Space.'],
] as const

export const credentials = [
  ['Microsoft', 'AZ-700 Azure Network Engineer Associate; AZ-104 Azure Administrator Associate; AZ-720 Azure Support Engineer for Connectivity Specialty; AZ-900 Azure Fundamentals; AI-900 Azure AI Fundamentals; AB-730 AI Business Professional; AB-731 AI Transformation Leader.'],
  ['Security & networking', 'ISC2 Certified in Cybersecurity; Check Point CCSA R77; Cisco CCNA; CCNA Security; Cisco Certified Specialist — Web Content Security.'],
  ['Professional development', 'Kepner-Tregoe Problem Solver; Linux Academy and Linux Foundation learning; Wireshark.'],
] as const

// Source inspected 5 October 2026: README, detector.py, search.py, pyproject.toml.
// Public-source hackathon prototype. No repository licence is declared.
export const roadLens = {
  title: 'RoadLens — Intelligent Car Dashcam',
  url: 'https://github.com/khannaveed2020/intelligent-car-dashcam',
  demo: 'https://github.com/khannaveed2020/intelligent-car-dashcam/blob/main/demo/RoadLens_demo.mp4',
  summary: 'A local hackathon prototype that turns short dashcam clips into searchable object detections. Upload an MP4, process sampled frames and find people or vehicles with simple keyword queries.',
  technologies: ['Python', 'Streamlit', 'YOLO', 'OpenCV', 'Docker'],
  details: [
    'Uses Ultralytics YOLO to detect people, bicycles, cars, motorcycles, buses and trucks in sampled video frames.',
    'Maps supported query terms to object labels and returns results in timestamp order. Search is deterministic keyword matching, not an LLM or unrestricted natural-language search.',
    'Packages the demo with Docker Compose, cross-platform setup scripts and an installable Python package. Includes pytest tests and Ruff checks.',
    'Videos and thumbnails stay on the local machine. The demo can run offline after dependencies and model weights are prepared; Clear session removes local session data.',
  ],
  limitation: 'Hackathon MVP, not a production safety system. Model detections are not verified facts. No face recognition, identity inference or collision detection.',
} as const
