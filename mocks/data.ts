import type {
  Article,
  GalleryItem,
  Testimony,
  Partner,
  Report,
  Program,
  Center,
  DashboardStats,
  User,
  SiteSettings,
  Message,
  Donation,
  ChildRecord,
  Category,
  UploadedFile,
} from "@/lib/types"

export const mockPrograms: Program[] = [
  {
    id: "1",
    title: "Integration sociale",
    titleEn: "Social Integration",
    description:
      "Nous accompagnons les enfants de la rue dans leur reinsertion sociale a travers un ensemble d'activites adaptees a leurs besoins.",
    descriptionEn:
      "We support street children in their social reintegration through activities adapted to their needs.",
    icon: "Users",
    activities: [
      { label: "Animation de rue", labelEn: "Street animation" },
      { label: "Accueil et ecoute", labelEn: "Reception and listening" },
      { label: "Mediation familiale", labelEn: "Family mediation" },
      { label: "Hebergement transitoire", labelEn: "Transitional housing" },
      { label: "Soutien psychosocial", labelEn: "Psychosocial support" },
      {
        label: "Activites sportives et recreatives",
        labelEn: "Sports and recreational activities",
      },
    ],
  },
  {
    id: "2",
    title: "Formation professionnelle",
    titleEn: "Vocational Training",
    description:
      "Nous offrons des formations professionnelles pour doter les jeunes de competences pratiques leur permettant de s'integrer dans le monde du travail.",
    descriptionEn:
      "We provide vocational training to equip young people with practical skills for the job market.",
    icon: "GraduationCap",
    activities: [
      {
        label: "Alphabetisation fonctionnelle",
        labelEn: "Functional literacy",
      },
      {
        label: "Apprentissages des metiers dans les ateliers du PEDER",
        labelEn: "Trade apprenticeship in PEDER workshops",
      },
      {
        label: "Placement en apprentissage chez les maitres artisans",
        labelEn: "Apprenticeship placement with master craftsmen",
      },
      {
        label: "Suivi des jeunes en formation",
        labelEn: "Monitoring youth in training",
      },
    ],
  },
  {
    id: "3",
    title: "Orientation scolaire",
    titleEn: "School Guidance",
    description:
      "Nous facilitons le retour a l'ecole des enfants de la rue en leur offrant un encadrement scolaire adapte.",
    descriptionEn:
      "We facilitate the return to school for street children with adapted academic support.",
    icon: "BookOpen",
    activities: [
      { label: "Rattrapage scolaire", labelEn: "Academic catch-up" },
      { label: "Reinsertion scolaire", labelEn: "School reintegration" },
      { label: "Suivi pedagogique", labelEn: "Pedagogical monitoring" },
    ],
  },
  {
    id: "4",
    title: "Insertion professionnelle",
    titleEn: "Professional Integration",
    description:
      "Nous aidons les jeunes formes a trouver un emploi ou a creer leur propre activite economique.",
    descriptionEn:
      "We help trained youth find employment or create their own economic activity.",
    icon: "Briefcase",
    activities: [
      { label: "Appui a l'auto-emploi", labelEn: "Self-employment support" },
      {
        label: "Soutien a l'acces a un emploi en entreprise",
        labelEn: "Support for employment access",
      },
      { label: "Suivi post-insertion", labelEn: "Post-insertion monitoring" },
    ],
  },
  {
    id: "5",
    title: "Soutien aux familles",
    titleEn: "Family Support",
    description:
      "Nous renforcons les capacites economiques des familles pour prevenir l'errance des enfants.",
    descriptionEn:
      "We strengthen the economic capacities of families to prevent children from wandering.",
    icon: "Home",
    activities: [
      { label: "Microcredit", labelEn: "Microcredit" },
      {
        label: "Activites Generatrices de Revenus (AGR)",
        labelEn: "Income-Generating Activities",
      },
      {
        label: "Epargne communautaire",
        labelEn: "Community savings",
      },
    ],
  },
  {
    id: "6",
    title: "Assistance juridique aux enfants vulnerables",
    titleEn: "Legal Assistance for Vulnerable Children",
    description:
      "Nous offrons un accompagnement juridique pour proteger les droits des enfants en situation de vulnerabilite.",
    descriptionEn:
      "We provide legal support to protect the rights of vulnerable children.",
    icon: "Scale",
    activities: [
      {
        label: "Assistance devant le tribunal pour enfants",
        labelEn: "Assistance before the children's court",
      },
      {
        label: "Accompagnement des enfants en detention",
        labelEn: "Support for children in detention",
      },
      {
        label: "Protection contre les abus",
        labelEn: "Protection against abuse",
      },
      { label: "Mediation sociale", labelEn: "Social mediation" },
    ],
  },
]

export const mockCenters: Center[] = [
  {
    id: "1",
    name: "Centre Ibanda",
    nameEn: "Ibanda Center",
    location: "Commune d'Ibanda, Bukavu",
    description:
      "Le Centre Ibanda est le siege principal du PEDER. Il accueille les enfants de la rue et leur offre un cadre securise pour leur reinsertion sociale.",
    descriptionEn:
      "The Ibanda Center is the main headquarters of PEDER. It welcomes street children and offers them a secure environment for social reintegration.",
    image: "/images/center-ibanda.jpg",
  },
  {
    id: "2",
    name: "Centre Kadutu",
    nameEn: "Kadutu Center",
    location: "Commune de Kadutu, Bukavu",
    description:
      "Le Centre Kadutu offre des programmes de formation professionnelle et d'alphabetisation aux jeunes de la commune.",
    descriptionEn:
      "The Kadutu Center offers vocational training and literacy programs for youth in the commune.",
    image: "/images/center-kadutu.jpg",
  },
  {
    id: "3",
    name: "Centre Bagira",
    nameEn: "Bagira Center",
    location: "Commune de Bagira, Bukavu",
    description:
      "Le Centre Bagira se concentre sur le soutien aux familles et les activites generatrices de revenus.",
    descriptionEn:
      "The Bagira Center focuses on family support and income-generating activities.",
    image: "/images/center-bagira.jpg",
  },
  {
    id: "4",
    name: "Centre de Transit, d'Ecoute et d'Orientation",
    nameEn: "Transit, Listening and Orientation Center",
    location: "Bukavu Centre",
    description:
      "Ce centre offre un premier accueil aux enfants nouvellement identifies dans les rues de Bukavu. Il assure l'ecoute, l'orientation et le suivi des cas.",
    descriptionEn:
      "This center provides initial reception for newly identified children on the streets of Bukavu. It ensures listening, orientation and case follow-up.",
    image: "/images/center-transit.jpg",
  },
]

export const mockArticles: Article[] = [
  {
    id: "1",
    title: "Journee de l'enfant africain : le PEDER celebre avec les enfants",
    titleEn: "African Child Day: PEDER celebrates with children",
    slug: "journee-enfant-africain-2025",
    excerpt:
      "Le PEDER a organise une grande celebration a l'occasion de la Journee de l'enfant africain avec des activites recreatives et educatives.",
    excerptEn:
      "PEDER organized a grand celebration for the African Child Day with recreational and educational activities.",
    content:
      "Le 16 juin 2025, le PEDER a celebre la Journee de l'enfant africain sous le theme 'L'education pour tous les enfants en Afrique'. Plus de 200 enfants ont participe a des activites sportives, artistiques et educatives dans nos centres de Bukavu. Les enfants ont pu exprimer leurs reves et aspirations a travers des dessins, des chants et des presentations theatrales. La ceremonie a ete honoree par la presence du Maire de la ville de Bukavu et de plusieurs partenaires du PEDER.",
    contentEn:
      "On June 16, 2025, PEDER celebrated the African Child Day under the theme 'Education for all children in Africa'. Over 200 children participated in sports, artistic and educational activities at our centers in Bukavu.",
    image: "/images/article-1.jpg",
    category: "celebration",
    author: "Clarisse Bahati",
    publishedAt: "2025-06-16",
    status: "published",
  },
  {
    id: "2",
    title: "Campagne de sensibilisation dans les quartiers de Kadutu",
    titleEn: "Awareness campaign in Kadutu neighborhoods",
    slug: "sensibilisation-kadutu-2025",
    excerpt:
      "Le PEDER a mene une campagne de sensibilisation communautaire dans la commune de Kadutu pour la protection de l'enfant.",
    excerptEn:
      "PEDER led a community awareness campaign in the commune of Kadutu for child protection.",
    content:
      "Du 1er au 15 mai 2025, l'equipe du PEDER a realise une campagne de sensibilisation dans 12 quartiers de la commune de Kadutu. L'objectif etait de sensibiliser les familles sur les droits de l'enfant et les consequences du vagabondage. Plus de 500 familles ont ete touchees directement par cette campagne. Les animateurs du PEDER ont egalement identifie 45 nouveaux cas d'enfants en situation de rue necessitant une prise en charge.",
    contentEn:
      "From May 1 to 15, 2025, the PEDER team conducted an awareness campaign in 12 neighborhoods of the Kadutu commune, reaching over 500 families.",
    image: "/images/article-2.jpg",
    category: "sensibilisation",
    author: "Patrick Ilunga",
    publishedAt: "2025-05-20",
    status: "published",
  },
  {
    id: "3",
    title: "Remise de kits de demarrage aux jeunes formes par le PEDER",
    titleEn: "Distribution of starter kits to PEDER-trained youth",
    slug: "remise-kits-demarrage-2025",
    excerpt:
      "15 jeunes ayant termine leur formation professionnelle ont recu des kits de demarrage pour lancer leurs propres activites.",
    excerptEn:
      "15 youth who completed vocational training received starter kits to launch their own activities.",
    content:
      "Le PEDER a procede a la remise officielle de kits de demarrage a 15 jeunes ayant termine avec succes leur formation professionnelle. Les kits comprennent des outils et du materiel adapte a chaque metier : couture, menuiserie, mecanique et coiffure. Cette ceremonie marque une etape importante dans le processus de reinsertion professionnelle de ces jeunes issus des rues de Bukavu.",
    contentEn:
      "PEDER officially distributed starter kits to 15 youth who successfully completed their vocational training, including tools for tailoring, carpentry, mechanics and hairdressing.",
    image: "/images/article-3.jpg",
    category: "activites",
    author: "Jean-Baptiste Mukwege",
    publishedAt: "2025-04-10",
    status: "published",
  },
  {
    id: "4",
    title: "Portes ouvertes au Centre Ibanda",
    titleEn: "Open doors at Ibanda Center",
    slug: "portes-ouvertes-ibanda-2025",
    excerpt:
      "Le Centre Ibanda a ouvert ses portes au public pour faire decouvrir les activites du PEDER.",
    excerptEn:
      "The Ibanda Center opened its doors to the public to showcase PEDER activities.",
    content:
      "Le Centre Ibanda a organise une journee portes ouvertes le 20 mars 2025. Plus de 300 visiteurs ont pu decouvrir les ateliers de formation, les salles de classe et les espaces d'accueil des enfants. Les visiteurs ont assiste a des demonstrations de couture, menuiserie et autres metiers enseignes au PEDER.",
    contentEn:
      "The Ibanda Center organized an open house on March 20, 2025 with over 300 visitors discovering training workshops and classrooms.",
    image: "/images/article-4.jpg",
    category: "portes-ouvertes",
    author: "Clarisse Bahati",
    publishedAt: "2025-03-20",
    status: "published",
  },
  {
    id: "5",
    title: "Atelier de formation sur les droits de l'enfant",
    titleEn: "Training workshop on children's rights",
    slug: "formation-droits-enfant-2025",
    excerpt:
      "Le PEDER a organise un atelier de renforcement des capacites sur les droits de l'enfant pour ses animateurs.",
    excerptEn:
      "PEDER organized a capacity-building workshop on children's rights for its animators.",
    content:
      "Un atelier de trois jours sur les droits de l'enfant a ete organise au siege du PEDER a Bukavu. 25 animateurs et travailleurs sociaux y ont participe. L'atelier a couvert les instruments juridiques nationaux et internationaux de protection de l'enfant, les techniques d'animation et les approches de mediation.",
    contentEn:
      "A three-day workshop on children's rights was organized at PEDER headquarters in Bukavu with 25 social workers participating.",
    image: "/images/article-5.jpg",
    category: "activites",
    author: "Patrick Ilunga",
    publishedAt: "2025-02-15",
    status: "published",
  },
  {
    id: "6",
    title: "Bilan annuel 2024 : des resultats encourageants",
    titleEn: "2024 Annual review: encouraging results",
    slug: "bilan-annuel-2024",
    excerpt:
      "Le PEDER dresse le bilan de l'annee 2024 avec des resultats significatifs en termes de prise en charge des enfants.",
    excerptEn:
      "PEDER reviews 2024 with significant results in child care.",
    content:
      "L'annee 2024 a ete marquee par la prise en charge de 450 enfants de la rue dans nos differents centres. 120 enfants ont ete reinseres en famille, 85 ont ete reinseres a l'ecole et 35 jeunes ont termine une formation professionnelle. Le PEDER a egalement renforce ses activites de travail de rue avec la creation de 3 nouvelles equipes mobiles.",
    contentEn:
      "2024 was marked by the care of 450 street children in our centers. 120 children were reintegrated into families, 85 returned to school and 35 youth completed vocational training.",
    image: "/images/article-6.jpg",
    category: "activites",
    author: "Sr. Marie Josephine",
    publishedAt: "2025-01-10",
    status: "published",
  },
]

export const mockGallery: GalleryItem[] = [
  {
    id: "1",
    title: "Activites sportives au Centre Ibanda",
    titleEn: "Sports activities at Ibanda Center",
    type: "photo",
    url: "/images/gallery-1.jpg",
    thumbnail: "/images/gallery-1.jpg",
    description: "Les enfants jouent au football dans la cour du Centre Ibanda.",
    descriptionEn: "Children play football in the courtyard of Ibanda Center.",
    category: "activites",
    createdAt: "2025-05-10",
  },
  {
    id: "2",
    title: "Atelier de couture",
    titleEn: "Sewing workshop",
    type: "photo",
    url: "/images/gallery-2.jpg",
    thumbnail: "/images/gallery-2.jpg",
    description: "Les jeunes apprennent la couture dans l'atelier du PEDER.",
    descriptionEn: "Youth learn sewing in the PEDER workshop.",
    category: "formation",
    createdAt: "2025-04-20",
  },
  {
    id: "3",
    title: "Celebration de Noel avec les enfants",
    titleEn: "Christmas celebration with children",
    type: "photo",
    url: "/images/gallery-3.jpg",
    thumbnail: "/images/gallery-3.jpg",
    description: "Les enfants du PEDER celebrent Noel ensemble.",
    descriptionEn: "PEDER children celebrate Christmas together.",
    category: "celebrations",
    createdAt: "2024-12-25",
  },
  {
    id: "4",
    title: "Sensibilisation communautaire",
    titleEn: "Community awareness",
    type: "photo",
    url: "/images/gallery-4.jpg",
    thumbnail: "/images/gallery-4.jpg",
    description: "Campagne de sensibilisation dans les quartiers de Bukavu.",
    descriptionEn: "Awareness campaign in Bukavu neighborhoods.",
    category: "sensibilisation",
    createdAt: "2025-03-15",
  },
  {
    id: "5",
    title: "Remise des diplomes de formation",
    titleEn: "Training graduation ceremony",
    type: "photo",
    url: "/images/gallery-5.jpg",
    thumbnail: "/images/gallery-5.jpg",
    description: "Ceremonie de remise de diplomes aux jeunes ayant termine leur formation.",
    descriptionEn: "Graduation ceremony for youth who completed training.",
    category: "formation",
    createdAt: "2025-06-01",
  },
  {
    id: "6",
    title: "Travail de rue a Kadutu",
    titleEn: "Street work in Kadutu",
    type: "photo",
    url: "/images/gallery-6.jpg",
    thumbnail: "/images/gallery-6.jpg",
    description: "Equipe mobile du PEDER en action dans les rues de Kadutu.",
    descriptionEn: "PEDER mobile team in action in the streets of Kadutu.",
    category: "activites",
    createdAt: "2025-02-28",
  },
  {
    id: "7",
    title: "Documentaire PEDER 2024",
    titleEn: "PEDER Documentary 2024",
    type: "video",
    url: "https://www.youtube.com/watch?v=example1",
    thumbnail: "/images/gallery-video-1.jpg",
    description: "Documentaire presentant les activites du PEDER en 2024.",
    descriptionEn: "Documentary presenting PEDER activities in 2024.",
    category: "documentaire",
    createdAt: "2024-11-15",
  },
  {
    id: "8",
    title: "Temoignages d'enfants reinseres",
    titleEn: "Testimonies of reintegrated children",
    type: "video",
    url: "https://www.youtube.com/watch?v=example2",
    thumbnail: "/images/gallery-video-2.jpg",
    description: "Temoignages video d'enfants ayant beneficie des programmes du PEDER.",
    descriptionEn: "Video testimonies of children who benefited from PEDER programs.",
    category: "temoignages",
    createdAt: "2025-01-20",
  },
]

export const mockTestimonies: Testimony[] = [
  {
    id: "1",
    name: "Amani K.",
    age: 16,
    story:
      "J'avais 10 ans quand je suis arrive dans les rues de Bukavu. Le PEDER m'a accueilli et m'a aide a retourner a l'ecole. Aujourd'hui, je suis en 4eme annee secondaire et je reve de devenir medecin pour soigner les enfants comme moi.",
    storyEn:
      "I was 10 when I arrived on the streets of Bukavu. PEDER welcomed me and helped me return to school. Today, I am in my 4th year of secondary school and I dream of becoming a doctor to care for children like me.",
    image: "/images/testimony-1.jpg",
    program: "Orientation scolaire",
    year: "2021",
    status: "published",
  },
  {
    id: "2",
    name: "Esperance M.",
    age: 19,
    story:
      "Grace au PEDER, j'ai appris la couture. Aujourd'hui, j'ai mon propre atelier dans le quartier Nyalukemba. Je gagne ma vie dignement et je peux aider ma famille. Le PEDER m'a donne une seconde chance.",
    storyEn:
      "Thanks to PEDER, I learned sewing. Today, I have my own workshop in the Nyalukemba neighborhood. I earn a dignified living and can help my family. PEDER gave me a second chance.",
    image: "/images/testimony-2.jpg",
    program: "Formation professionnelle",
    year: "2020",
    status: "published",
  },
  {
    id: "3",
    name: "Patient B.",
    age: 17,
    story:
      "Le PEDER a retrouve ma famille a Uvira apres 3 ans de separation. Grace a la mediation familiale, j'ai pu retourner chez mes parents. Maintenant je suis apprenti menuisier et je prepare mon avenir.",
    storyEn:
      "PEDER found my family in Uvira after 3 years of separation. Thanks to family mediation, I was able to return to my parents. Now I am a carpentry apprentice preparing my future.",
    image: "/images/testimony-3.jpg",
    program: "Integration sociale",
    year: "2022",
    status: "published",
  },
  {
    id: "4",
    name: "Grace N.",
    age: 15,
    story:
      "Quand j'etais dans la rue, je n'avais aucun espoir. Les animateurs du PEDER m'ont approchee et m'ont convaincue de venir au centre. Ils m'ont aide a retrouver confiance en moi. Aujourd'hui, je suis de retour a l'ecole et je suis parmi les meilleures de ma classe.",
    storyEn:
      "When I was on the street, I had no hope. PEDER animators approached me and convinced me to come to the center. They helped me regain confidence. Today, I am back in school and among the best in my class.",
    image: "/images/testimony-4.jpg",
    program: "Orientation scolaire",
    year: "2023",
    status: "published",
  },
  {
    id: "5",
    name: "Josue L.",
    age: 20,
    story:
      "Le PEDER m'a forme en mecanique automobile pendant 2 ans. A la fin de ma formation, j'ai recu un kit de demarrage. Aujourd'hui, je travaille dans un garage a Bukavu et je suis autonome financierement.",
    storyEn:
      "PEDER trained me in auto mechanics for 2 years. At the end of my training, I received a starter kit. Today, I work in a garage in Bukavu and am financially independent.",
    image: "/images/testimony-5.jpg",
    program: "Insertion professionnelle",
    year: "2022",
    status: "published",
  },
]

export const mockPartners: Partner[] = [
  {
    id: "1",
    name: "UNICEF",
    logo: "/images/partner-unicef.png",
    country: "International",
    website: "https://www.unicef.org",
    description:
      "Le Fonds des Nations Unies pour l'enfance soutient le PEDER dans ses programmes de protection de l'enfance.",
    descriptionEn:
      "The United Nations Children's Fund supports PEDER in its child protection programs.",
    type: "international",
  },
  {
    id: "2",
    name: "MAEJT",
    logo: "/images/partner-maejt.png",
    country: "Afrique",
    website: "https://maejt.org",
    description:
      "Le Mouvement africain des enfants et jeunes travailleurs collabore avec le PEDER pour la promotion des droits des enfants travailleurs.",
    descriptionEn:
      "The African Movement of Working Children and Youth collaborates with PEDER to promote the rights of working children.",
    type: "international",
  },
  {
    id: "3",
    name: "BICE",
    logo: "/images/partner-bice.png",
    country: "Suisse",
    website: "https://bfrce.org",
    description:
      "Le Bureau International Catholique de l'Enfance appuie le PEDER dans ses programmes de reinsertion sociale.",
    descriptionEn:
      "The International Catholic Child Bureau supports PEDER in its social reintegration programs.",
    type: "international",
  },
  {
    id: "4",
    name: "MISEREOR",
    logo: "/images/partner-misereor.png",
    country: "Allemagne",
    website: "https://www.misereor.de",
    description:
      "MISEREOR finance plusieurs projets du PEDER lies a la formation professionnelle des jeunes.",
    descriptionEn:
      "MISEREOR funds several PEDER projects related to youth vocational training.",
    type: "international",
  },
  {
    id: "5",
    name: "SIGN OF HOPE",
    logo: "/images/partner-signofhope.png",
    country: "Allemagne",
    website: "https://www.sign-of-hope.org",
    description:
      "Sign of Hope soutient les actions d'urgence et de rehabilitation du PEDER.",
    descriptionEn:
      "Sign of Hope supports PEDER's emergency and rehabilitation actions.",
    type: "international",
  },
  {
    id: "6",
    name: "CSC (Consortium for Street Children)",
    logo: "/images/partner-csc.png",
    country: "Grande-Bretagne",
    website: "https://www.streetchildren.org",
    description:
      "Le Consortium pour les enfants de la rue est un reseau mondial dont le PEDER est membre actif.",
    descriptionEn:
      "The Consortium for Street Children is a global network of which PEDER is an active member.",
    type: "international",
  },
  {
    id: "7",
    name: "AAPT",
    logo: "/images/partner-aapt.png",
    country: "Suisse",
    website: "#",
    description:
      "L'Association des amis du Pere Tony soutient financierement les activites du PEDER.",
    descriptionEn:
      "The Association of Friends of Father Tony financially supports PEDER's activities.",
    type: "international",
  },
  {
    id: "8",
    name: "IDAY",
    logo: "/images/partner-iday.png",
    country: "Senegal",
    website: "#",
    description:
      "IDAY-Senegal collabore avec le PEDER dans le cadre du plaidoyer pour les droits des enfants.",
    descriptionEn:
      "IDAY-Senegal collaborates with PEDER in advocating for children's rights.",
    type: "international",
  },
]

export const mockReports: Report[] = [
  {
    id: "1",
    title: "Rapport annuel 2024",
    titleEn: "Annual Report 2024",
    type: "annual",
    year: "2024",
    fileUrl: "#",
    description:
      "Bilan complet des activites du PEDER pour l'annee 2024, incluant les resultats, les defis et les perspectives.",
    descriptionEn:
      "Complete review of PEDER activities for 2024, including results, challenges and perspectives.",
    publishedAt: "2025-02-01",
  },
  {
    id: "2",
    title: "Rapport annuel 2023",
    titleEn: "Annual Report 2023",
    type: "annual",
    year: "2023",
    fileUrl: "#",
    description:
      "Synthese des interventions et resultats du PEDER en 2023.",
    descriptionEn:
      "Summary of PEDER interventions and results in 2023.",
    publishedAt: "2024-02-15",
  },
  {
    id: "3",
    title: "Projet de reinsertion scolaire 2024-2025",
    titleEn: "School Reintegration Project 2024-2025",
    type: "project",
    year: "2024",
    fileUrl: "#",
    description:
      "Rapport du projet de reinsertion scolaire finance par UNICEF pour la periode 2024-2025.",
    descriptionEn:
      "Report on the school reintegration project funded by UNICEF for the 2024-2025 period.",
    publishedAt: "2025-01-20",
  },
  {
    id: "4",
    title: "Etude sur les enfants de la rue a Bukavu",
    titleEn: "Study on Street Children in Bukavu",
    type: "research",
    year: "2023",
    fileUrl: "#",
    description:
      "Recherche sur les profils, les causes et les besoins des enfants de la rue a Bukavu.",
    descriptionEn:
      "Research on profiles, causes and needs of street children in Bukavu.",
    publishedAt: "2023-09-10",
  },
  {
    id: "5",
    title: "Guide de l'animateur de rue",
    titleEn: "Street Worker's Guide",
    type: "guide",
    year: "2022",
    fileUrl: "#",
    description:
      "Guide pratique pour les animateurs de rue du PEDER, couvrant les techniques d'approche et d'accompagnement.",
    descriptionEn:
      "Practical guide for PEDER street workers covering approach and support techniques.",
    publishedAt: "2022-06-15",
  },
  {
    id: "6",
    title: "L'enfant de la rue : comprendre et agir",
    titleEn: "The Street Child: Understanding and Acting",
    type: "book",
    year: "2021",
    fileUrl: "#",
    description:
      "Ouvrage de reference sur la problematique des enfants de la rue en Republique Democratique du Congo.",
    descriptionEn:
      "Reference book on the issue of street children in the Democratic Republic of Congo.",
    publishedAt: "2021-11-20",
  },
]

export const mockDashboardStats: DashboardStats = {
  totalChildren: 2847,
  activePrograms: 6,
  totalPartners: 8,
  successRate: 78,
  childrenByYear: [
    { year: "2019", count: 180 },
    { year: "2020", count: 210 },
    { year: "2021", count: 285 },
    { year: "2022", count: 350 },
    { year: "2023", count: 420 },
    { year: "2024", count: 450 },
    { year: "2025", count: 320 },
  ],
  programDistribution: [
    { name: "Integration sociale", value: 35 },
    { name: "Formation prof.", value: 25 },
    { name: "Orientation scolaire", value: 20 },
    { name: "Soutien familles", value: 10 },
    { name: "Assistance juridique", value: 10 },
  ],
  recentActivities: [
    {
      id: "1",
      action: "Nouvel article publie : Journee de l'enfant africain",
      date: "2025-06-16",
      user: "Clarisse Bahati",
    },
    {
      id: "2",
      action: "Photo ajoutee a la galerie",
      date: "2025-06-15",
      user: "Patrick Ilunga",
    },
    {
      id: "3",
      action: "Nouveau temoignage publie",
      date: "2025-06-14",
      user: "Jean-Baptiste Mukwege",
    },
    {
      id: "4",
      action: "Rapport annuel 2024 uploade",
      date: "2025-06-12",
      user: "Sr. Marie Josephine",
    },
    {
      id: "5",
      action: "Mise a jour des informations partenaires",
      date: "2025-06-10",
      user: "Jean-Baptiste Mukwege",
    },
  ],
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Mirco Rubambura",
    email: "admin@pederdrc.org",
    role: "superadmin",
    createdAt: "2020-01-15",
  },
  {
    id: "2",
    name: "Jean-Baptiste Mukwege",
    email: "jean.mukwege@pederdrc.org",
    role: "admin",
    createdAt: "2021-06-20",
  },
  {
    id: "3",
    name: "Isaac Akonkwa",
    email: "isaac.akonkwa@pederdrc.org",
    role: "redacteur",
    createdAt: "2022-03-10",
  },
  {
    id: "4",
    name: "Patrick Ilunga",
    email: "patrick.ilunga@pederdrc.org",
    role: "redacteur",
    createdAt: "2022-08-05",
  },
  {
    id: "5",
    name: "Francoise Amani",
    email: "francoise.amani@pederdrc.org",
    role: "admin",
    createdAt: "2023-01-18",
  },
]

export const mockSiteSettings: SiteSettings = {
  siteName: "PEDER",
  siteDescription:
    "Programme d'Encadrement des Enfants de la Rue - Bukavu, RDC",
  contactEmail: "pderbkv@gmail.com",
  contactPhone: "+243 992 355 009",
  contactEmails: ["pderbkv@gmail.com", "contact@pederdrc.org"],
  contactPhones: ["+243 992 355 009", "+243 851 234 567"],
  address:
    "B.P. : 2525 Bukavu / Ibanda / Lundula / Nyalukemba / Numero 15 - RDC",
  socialLinks: {
    facebook: "https://facebook.com/pederdrc",
    twitter: "https://twitter.com/pederdrc",
    instagram: "https://instagram.com/pederdrc",
    youtube: "https://youtube.com/pederdrc",
  },
}

export const mockMessages: Message[] = [
  {
    id: "1",
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    subject: "Demande de partenariat",
    message:
      "Bonjour, notre organisation souhaite etablir un partenariat avec le PEDER pour soutenir vos programmes de reinsertion scolaire. Pouvons-nous planifier un appel pour en discuter ?",
    read: false,
    createdAt: "2025-06-20",
    replies: [],
  },
  {
    id: "2",
    name: "Pierre Martin",
    email: "pierre.martin@example.com",
    subject: "Demande d'information sur le benevolat",
    message:
      "Bonjour, je suis un etudiant en travail social et je souhaiterais effectuer un stage de 3 mois au sein du PEDER. Quelles sont les demarches a suivre ?",
    read: true,
    createdAt: "2025-06-18",
    replies: [
      {
        id: "r1",
        content: "Bonjour Pierre, merci pour votre interet. Veuillez nous envoyer votre CV et une lettre de motivation a contact@pederdrc.org.",
        author: "Sr. Marie Josephine",
        createdAt: "2025-06-19",
      },
    ],
  },
  {
    id: "3",
    name: "Jean-Claude Kabongo",
    email: "jckabongo@example.com",
    subject: "Don pour le PEDER",
    message:
      "Je souhaite faire un don au PEDER. Quelles sont les modalites de don ? Acceptez-vous les transferts internationaux ?",
    read: false,
    createdAt: "2025-06-15",
    replies: [],
  },
  {
    id: "4",
    name: "Sarah Weber",
    email: "sarah.weber@ong-soutien.org",
    subject: "Invitation conference internationale",
    message:
      "Nous organisons une conference internationale sur la protection de l'enfance a Geneve en septembre 2025. Nous aimerions inviter un representant du PEDER a y participer.",
    read: true,
    createdAt: "2025-06-10",
    replies: [
      {
        id: "r2",
        content: "Chere Sarah, nous serions ravis de participer a cette conference. Pouvez-vous nous envoyer les details logistiques ?",
        author: "Jean-Baptiste Mukwege",
        createdAt: "2025-06-11",
      },
      {
        id: "r3",
        content: "Bien sur ! Je vous envoie le programme detaille et les informations de voyage par email. Nous prendrons en charge vos frais.",
        author: "Sarah Weber",
        createdAt: "2025-06-12",
      },
    ],
  },
]

export const mockDonations: Donation[] = [
  {
    id: "1",
    donorName: "Fondation Jean-Pierre Bemba",
    donorEmail: "fondation@example.com",
    amount: 5000,
    currency: "USD",
    method: "bank",
    reference: "DON-2025-001",
    date: "2025-06-20",
    status: "completed",
    note: "Don pour le programme d'orientation scolaire",
  },
  {
    id: "2",
    donorName: "Marie Dupont",
    donorEmail: "marie.dupont@example.com",
    amount: 1000,
    currency: "EUR",
    method: "online",
    reference: "DON-2025-002",
    date: "2025-06-15",
    status: "completed",
    note: "Soutien general",
  },
  {
    id: "3",
    donorName: "Jean-Claude Kabongo",
    donorEmail: "jckabongo@example.com",
    amount: 500000,
    currency: "CDF",
    method: "mobile_money",
    reference: "DON-2025-003",
    date: "2025-06-10",
    status: "completed",
    note: "Don via M-Pesa",
  },
  {
    id: "4",
    donorName: "ONG Hope for Children",
    donorEmail: "info@hopeforchildren.org",
    amount: 10000,
    currency: "USD",
    method: "bank",
    reference: "DON-2025-004",
    date: "2025-05-28",
    status: "completed",
    note: "Financement projet formation professionnelle 2025",
  },
  {
    id: "5",
    donorName: "Anonymous Donor",
    donorEmail: "anonymous@example.com",
    amount: 200,
    currency: "USD",
    method: "online",
    reference: "DON-2025-005",
    date: "2025-05-20",
    status: "pending",
  },
]

export const mockChildren: ChildRecord[] = [
  {
    id: "1", firstName: "Patrick", lastName: "Mulume", gender: "M", birthDate: "2012-03-15", age: 13,
    photo: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop",
    program: "Integration sociale", center: "Centre Tumaini", status: "active", enrollmentDate: "2023-01-10",
    parentContact: "+243 812 345 678", notes: "Patrick est tres motive et progresse bien dans le programme.",
    history: [
      { id: "e1", date: "2023-01-10", type: "enrollment", description: "Admission au Centre Tumaini via le programme d'integration sociale.", author: "Sr. Marie Josephine" },
      { id: "e2", date: "2023-03-20", type: "medical", description: "Visite medicale annuelle. Bonne sante generale.", author: "Dr. Amani" },
      { id: "e3", date: "2023-09-01", type: "education", description: "Inscription en 5eme primaire a l'ecole Tupendane.", author: "Jean-Baptiste Mukwege" },
      { id: "e4", date: "2024-06-15", type: "note", description: "Excellent bulletin scolaire. Premier de classe.", author: "Jean-Baptiste Mukwege" },
    ],
  },
  {
    id: "2", firstName: "Esther", lastName: "Nabintu", gender: "F", birthDate: "2010-07-22", age: 15,
    photo: "https://images.unsplash.com/photo-1531947398206-60f73e4cada1?w=200&h=200&fit=crop",
    program: "Formation professionnelle", center: "Centre Mapendo", status: "in_training", enrollmentDate: "2021-06-05",
    notes: "Esther apprend la couture et montre des aptitudes remarquables.",
    history: [
      { id: "e5", date: "2021-06-05", type: "enrollment", description: "Admission au programme de formation professionnelle.", author: "Sr. Marie Josephine" },
      { id: "e6", date: "2022-01-15", type: "education", description: "Debut de la formation en couture.", author: "Jean-Baptiste Mukwege" },
      { id: "e7", date: "2024-02-10", type: "family", description: "Visite familiale reussie. La famille est prete a l'accueillir.", author: "Assistante sociale" },
    ],
  },
  {
    id: "3", firstName: "David", lastName: "Baguma", gender: "M", birthDate: "2008-11-03", age: 17,
    program: "Insertion professionnelle", center: "Centre Tumaini", status: "reinserted", enrollmentDate: "2019-02-20", exitDate: "2024-12-01",
    notes: "David a ete insere avec succes comme apprenti menuisier.",
    history: [
      { id: "e8", date: "2019-02-20", type: "enrollment", description: "Admission au Centre Tumaini.", author: "Sr. Marie Josephine" },
      { id: "e9", date: "2022-09-01", type: "education", description: "Debut apprentissage menuiserie.", author: "Jean-Baptiste Mukwege" },
      { id: "e10", date: "2024-12-01", type: "exit", description: "Reinsertion reussie. David travaille maintenant comme menuisier.", author: "Sr. Marie Josephine" },
    ],
  },
  {
    id: "4", firstName: "Grace", lastName: "Sifa", gender: "F", birthDate: "2013-05-18", age: 12,
    photo: "https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?w=200&h=200&fit=crop",
    program: "Orientation scolaire", center: "Centre Mapendo", status: "active", enrollmentDate: "2024-01-15",
    parentContact: "+243 995 678 123", notes: "Grace est en rattrapage scolaire et fait de bons progres.",
    history: [
      { id: "e11", date: "2024-01-15", type: "enrollment", description: "Admission au programme d'orientation scolaire.", author: "Assistante sociale" },
      { id: "e12", date: "2024-09-01", type: "education", description: "Reinscription en 3eme primaire apres le rattrapage.", author: "Jean-Baptiste Mukwege" },
    ],
  },
  {
    id: "5", firstName: "Samuel", lastName: "Irenge", gender: "M", birthDate: "2011-09-30", age: 14,
    program: "Integration sociale", center: "Centre Tumaini", status: "active", enrollmentDate: "2023-08-01",
    notes: "Samuel participe activement aux activites sportives.",
    history: [
      { id: "e13", date: "2023-08-01", type: "enrollment", description: "Accueil au Centre Tumaini suite a la mediation de rue.", author: "Animateur de rue" },
      { id: "e14", date: "2024-03-10", type: "medical", description: "Suivi medical. Vaccination a jour.", author: "Dr. Amani" },
    ],
  },
]

export const mockCategories: Category[] = [
  { id: "1", name: "Activites", slug: "activites", description: "Articles sur les activites du PEDER", type: "article", count: 3, createdAt: "2024-01-01" },
  { id: "2", name: "Sensibilisation", slug: "sensibilisation", description: "Campagnes de sensibilisation", type: "article", count: 2, createdAt: "2024-01-01" },
  { id: "3", name: "Celebration", slug: "celebration", description: "Evenements et celebrations", type: "article", count: 1, createdAt: "2024-01-01" },
  { id: "4", name: "Portes ouvertes", slug: "portes-ouvertes", description: "Journees portes ouvertes", type: "article", count: 1, createdAt: "2024-01-01" },
  { id: "5", name: "Photos", slug: "photos", description: "Photos des activites", type: "gallery", count: 8, createdAt: "2024-01-01" },
  { id: "6", name: "Videos", slug: "videos", description: "Videos des activites", type: "gallery", count: 2, createdAt: "2024-01-01" },
  { id: "7", name: "Rapports annuels", slug: "rapports-annuels", description: "Rapports annuels du PEDER", type: "report", count: 3, createdAt: "2024-01-01" },
  { id: "8", name: "Etudes", slug: "etudes", description: "Etudes et recherches", type: "report", count: 2, createdAt: "2024-01-01" },
]

export const mockUploadedFiles: UploadedFile[] = [
  { id: "1", name: "rapport-annuel-2024.pdf", type: "document", mimeType: "application/pdf", size: "2.4 MB", url: "#", uploadedBy: "Admin", uploadedAt: "2025-06-20", folder: "/" },
  { id: "2", name: "photo-centre-tumaini.jpg", type: "image", mimeType: "image/jpeg", size: "1.2 MB", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400", uploadedBy: "Admin", uploadedAt: "2025-06-18", folder: "/images" },
  { id: "3", name: "logo-peder.png", type: "image", mimeType: "image/png", size: "345 KB", url: "#", uploadedBy: "Admin", uploadedAt: "2025-06-15", folder: "/images" },
  { id: "4", name: "brochure-2025.pdf", type: "document", mimeType: "application/pdf", size: "5.1 MB", url: "#", uploadedBy: "Jean-Baptiste", uploadedAt: "2025-06-10", folder: "/documents" },
  { id: "5", name: "video-journee-portes-ouvertes.mp4", type: "video", mimeType: "video/mp4", size: "120 MB", url: "#", uploadedBy: "Admin", uploadedAt: "2025-05-28", folder: "/videos" },
  { id: "6", name: "temoignage-patrick.jpg", type: "image", mimeType: "image/jpeg", size: "890 KB", url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400", uploadedBy: "Admin", uploadedAt: "2025-05-20", folder: "/images/temoignages" },
  { id: "7", name: "formulaire-inscription.pdf", type: "document", mimeType: "application/pdf", size: "156 KB", url: "#", uploadedBy: "Admin", uploadedAt: "2025-05-15", folder: "/documents" },
  { id: "8", name: "photo-formation-couture.jpg", type: "image", mimeType: "image/jpeg", size: "1.5 MB", url: "https://images.unsplash.com/photo-1531947398206-60f73e4cada1?w=400", uploadedBy: "Jean-Baptiste", uploadedAt: "2025-05-10", folder: "/images/formations" },
  { id: "9", name: "presentation-peder.pptx", type: "document", mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation", size: "8.3 MB", url: "#", uploadedBy: "Admin", uploadedAt: "2025-04-20", folder: "/documents" },
  { id: "10", name: "rapport-projet-2024.pdf", type: "document", mimeType: "application/pdf", size: "3.7 MB", url: "#", uploadedBy: "Jean-Baptiste", uploadedAt: "2025-04-10", folder: "/documents/rapports" },
]
