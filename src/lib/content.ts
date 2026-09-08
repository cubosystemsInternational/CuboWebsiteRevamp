export type Service = { n: string; title: string; desc: string };
export type Solution = { n: string; title: string; desc: string };
export type TechCategory = 'Frontend' | 'Backend' | 'Mobile' | 'Cloud & Infrastructure' | 'AI & Data';
export type TechItem = { src: string; name: string; desc: string };
export type Testimonial = { name: string; quote: string };
export type Stat = { value: number; suffix: string; label: string };
export type NavLink = { label: string; id: string };

export const navLinks: NavLink[] = [
  { label: 'About', id: 'about' },
  { label: 'What we do', id: 'services' },
  { label: 'Solutions', id: 'solutions' },
  { label: 'Process', id: 'process' },
  { label: 'Technology', id: 'technology' },
  { label: 'Contact', id: 'contact' },
];

export const services: Service[] = [
  { n: '01', title: 'Product Innovation & Technology Management', desc: 'Cloud-ready products and technology roadmaps built around your business priorities.' },
  { n: '02', title: 'Consultancy & Process Management', desc: 'Practical guidance that makes complex processes simpler, faster and more reliable.' },
  { n: '03', title: 'Advanced BI & Analytics', desc: 'Convert business data into clear, decision-ready intelligence.' },
  { n: '04', title: 'AI, Blockchain & IoT', desc: 'Apply emerging technologies where they create genuine operational value.' },
  { n: '05', title: 'Software Engineering & Development', desc: 'Design, build, test and deploy resilient digital products.' },
  { n: '06', title: 'Research & Development', desc: 'Continuously explore better technologies and more effective solutions.' },
];

export const solutions: Solution[] = [
  { n: '01', title: 'Business Transformation', desc: 'Modernise systems and improve the processes that keep your business moving.' },
  { n: '02', title: 'Automation', desc: 'Reduce repetitive work with reliable, scalable workflows.' },
  { n: '03', title: 'Data & Intelligence', desc: 'Turn complex data into insight your teams can act on.' },
  { n: '04', title: 'Integration', desc: 'Connect platforms, APIs and applications into one coherent operation.' },
];

export const stack: Record<TechCategory, TechItem[]> = {
  Frontend: [
    { src: '/media/5w5fqx4n/14.png', name: 'AngularJS', desc: 'A structural framework for building dynamic single-page web applications.' },
    { src: '/media/kcjbi1iz/15.png', name: 'jQuery', desc: 'A fast, lightweight library for DOM manipulation and event handling.' },
    { src: '/media/ypvhjbwp/17.png', name: 'Joomla', desc: 'An open-source content management system for building websites.' },
    { src: '/media/yjznrong/18.png', name: 'JavaScript', desc: 'The core scripting language of the web, used across browsers and servers.' },
    { src: '/media/pkifq4nm/20.png', name: 'Knockout', desc: 'A JavaScript library that implements the MVVM pattern for rich UIs.' },
    { src: '/media/bvnmkoud/bootstrap.png', name: 'Bootstrap', desc: 'A component library for building responsive, mobile-first interfaces.' },
  ],
  Backend: [
    { src: '/media/xrbgf0eh/8.png', name: 'Java', desc: 'A widely used, class-based language for building portable, scalable systems.' },
    { src: '/media/hq3hsuei/9.png', name: 'Java EE', desc: 'An enterprise extension of Java for building large-scale server applications.' },
    { src: '/media/p2gonffj/23.png', name: 'PHP', desc: 'A server-side scripting language used to build dynamic web applications.' },
    { src: '/media/tgsjhpqp/27.png', name: 'Python', desc: 'A general-purpose language known for readability and a broad ecosystem.' },
  ],
  Mobile: [
    { src: '/media/xbugkcew/16.png', name: 'Flutter', desc: 'A UI toolkit for building natively compiled mobile apps from one codebase.' },
    { src: '/media/3ejj3dsm/26.png', name: 'React Native', desc: 'A framework for building native mobile apps using React.' },
  ],
  'Cloud & Infrastructure': [
    { src: '/media/11djacpv/2.png', name: '.NET Core', desc: 'A cross-platform framework for building high-performance applications.' },
    { src: '/media/xyummodr/4.png', name: 'Azure', desc: "Microsoft's cloud platform for hosting, compute and infrastructure services." },
    { src: '/media/tkiaukmx/5.png', name: 'Visual Studio', desc: 'An integrated development environment for building and debugging software.' },
    { src: '/media/vtips0op/7.png', name: 'SharePoint', desc: 'A platform for document management and enterprise collaboration.' },
    { src: '/media/sccjo4pl/10.png', name: 'Spring', desc: 'A Java framework for building enterprise-grade backend applications.' },
  ],
  'AI & Data': [
    { src: '/media/3gxkvvij/36.png', name: 'Artificial Intelligence', desc: 'Systems and models that support automation, prediction and insight.' },
    { src: '/media/12zpizhw/37.png', name: 'Google AI', desc: "Tooling and services from Google's applied AI ecosystem." },
    { src: '/media/pw4jq5st/untitled-1.png', name: 'Machine Learning', desc: 'Algorithms that learn patterns from data to inform decisions.' },
    { src: '/media/51spk1lh/3.png', name: 'Microsoft SQL Server', desc: 'A relational database engine for structured data management.' },
    { src: '/media/zxeprsh2/6.png', name: 'Power BI', desc: 'A business analytics tool for visualising and sharing data insight.' },
    { src: '/media/sygp30ef/19.png', name: 'Hadoop', desc: 'A framework for distributed storage and processing of large datasets.' },
  ],
};

export const testimonials: Testimonial[] = [
  { name: 'ThyssenKrupp Aerospace', quote: 'You guys helped solve million dollar problems. We hope to continue work with you all using your expertise.' },
  { name: 'Hakitaak', quote: 'They have been a very reliable partner throughout the project. We appreciate their technology skills, creative problem solving, straightforward communication, flexibility and dedication to the project.' },
  { name: 'Meetingrooms.com', quote: 'Extremely efficient and logical team to work with. Highly motivated and handles projects in a very efficient manner. Great working with CUBO team.' },
  { name: 'Office Freedom', quote: 'We have worked with Cubo for 10+ years. They looked after our CRM and website and helped us a lot over this time.' },
  { name: 'Nanekma', quote: 'Excellent partner to work with, smooth transition. Takes ownership and delivers high-tech solutions.' },
];

export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Clients' },
  { value: 80, suffix: '+', label: 'Projects' },
  { value: 5, suffix: '', label: 'Awards' },
  { value: 40, suffix: '+', label: 'Employees' },
];

export const whyCubo = [
  { n: '01', label: 'Business-first thinking' },
  { n: '02', label: 'Deep technical expertise' },
  { n: '03', label: 'Long-term partnerships' },
  { n: '04', label: 'Practical innovation' },
];

export const process = [
  { title: 'Discover', desc: 'We listen, learn and understand the opportunity.' },
  { title: 'Define', desc: 'We shape a clear, viable path forward.' },
  { title: 'Design', desc: 'We create useful, intuitive digital experiences.' },
  { title: 'Develop', desc: 'We engineer scalable solutions with care.' },
  { title: 'Deliver', desc: 'We launch, refine and support lasting impact.' },
];

export const footerGroups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Explore',
    links: navLinks
      .filter((l) => l.id !== 'about' && l.id !== 'contact')
      .map((l) => ({ label: l.label, href: '#' + l.id })),
  },
  {
    title: 'Services',
    links: services.map((s) => ({ label: s.title, href: '#services' })),
  },
];
