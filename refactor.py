import re

file_path = "c:\\Users\\uasai\\Desktop\\portfolio\\components\\PortfolioApp.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update navItems export and add orderedSections export
content = content.replace(
    'export let navItems: any[] = [',
    'export let desktopSections: any[] = [];\nexport let mobileSections: any[] = [];\nexport let firstDesktopSection: any = null;\nexport let lastDesktopSection: any = null;\nexport let middleDesktopSections: any[] = [];\nexport let navItems: any[] = ['
)

content = content.replace(
    'export let cardSections: any[] = [About, Services, Projects, Skills, Socials, Process];',
    ''
)

# 2. Update Header handleNavClick to use index from map
old_nav_logic = """    const map: Record<string, number> = {};
    navItems.forEach((item, idx) => {
      if (item.href === "#contact") map[item.href] = cardSections.length + 1;
      else map[item.href] = idx + 1;
    });"""

new_nav_logic = """    const map: Record<string, number> = {};
    navItems.forEach((item, idx) => {
      map[item.href] = item.pageIndex;
    });"""

content = content.replace(old_nav_logic, new_nav_logic)

# 3. Update SectionDots to use desktopSections
old_dots_init = """const sectionIds = ["home", "about", "services", "projects", "skills", "socials", "process", "contact"];

function SectionDots() {"""

new_dots_init = """function SectionDots() {
  const sectionIds = desktopSections.map(s => s.id);"""

content = content.replace(old_dots_init, new_dots_init)


# 5. Rewrite PortfolioApp initialization
old_init_block = """    if (dbData.sections) {
      dbSections = dbData.sections;
      const allMiddle = [
        { id: "about", label: "About", href: "#about", comp: About },
        { id: "services", label: "Services", href: "#services", comp: Services },
        { id: "projects", label: "Projects", href: "#projects", comp: Projects },
        { id: "skills", label: "Skills", href: "#skills", comp: Skills },
        { id: "journey", label: "Journey", href: "#journey", comp: Process },
        { id: "socials", label: "Socials", href: "#socials", comp: Socials },
      ];
      const visibleMiddle = allMiddle.filter(item => {
        const sec = dbData.sections.find((s: any) => s.sectionId === item.id);
        return sec ? sec.isVisible : true;
      }).sort((a, b) => {
        const secA = dbData.sections.find((s: any) => s.sectionId === a.id);
        const secB = dbData.sections.find((s: any) => s.sectionId === b.id);
        const orderA = secA ? secA.order : 999;
        const orderB = secB ? secB.order : 999;
        return orderA - orderB;
      });
      cardSections = visibleMiddle.map(item => item.comp);
      navItems = visibleMiddle.map(item => ({ label: item.label, href: item.href }));
      const contactSec = dbData.sections.find((s: any) => s.sectionId === "contact");
      if (!contactSec || contactSec.isVisible) {
        navItems.push({ label: "Contact", href: "#contact" });
      }
    }
  }"""

new_init_block = """    if (dbData.sections) {
      const COMP_MAP: any = {
        hero: { comp: Hero, label: "Home", href: "#home" },
        about: { comp: About, label: "About", href: "#about" },
        services: { comp: Services, label: "Services", href: "#services" },
        projects: { comp: Projects, label: "Projects", href: "#projects" },
        skills: { comp: Skills, label: "Skills", href: "#skills" },
        journey: { comp: Process, label: "Journey", href: "#process" },
        socials: { comp: Socials, label: "Socials", href: "#socials" },
        contact: { comp: Contact, label: "Contact", href: "#contact" }
      };

      const sorted = [...dbData.sections].sort((a: any, b: any) => a.order - b.order);
      
      desktopSections = sorted
        .filter((s: any) => s.isVisible)
        .map((s: any) => ({ id: s.sectionId, ...COMP_MAP[s.sectionId] }))
        .filter((s: any) => s.comp);
        
      mobileSections = sorted
        .filter((s: any) => s.isMobileVisible)
        .map((s: any) => ({ id: s.sectionId, ...COMP_MAP[s.sectionId] }))
        .filter((s: any) => s.comp);

      if (desktopSections.length > 0) {
        firstDesktopSection = desktopSections[0];
        lastDesktopSection = desktopSections.length > 1 ? desktopSections[desktopSections.length - 1] : null;
        middleDesktopSections = desktopSections.slice(1, -1);
      } else {
        firstDesktopSection = { id: 'hero', ...COMP_MAP['hero'] };
        lastDesktopSection = null;
        middleDesktopSections = [];
        desktopSections = [firstDesktopSection];
      }

      navItems = desktopSections.map((s, idx) => ({
        label: s.label,
        href: s.href,
        pageIndex: idx
      })).filter(item => item.label !== "Home"); // Hide home from nav bar text

      scrollController.totalPages = desktopSections.length;
    }
  }"""

content = content.replace(old_init_block, new_init_block)

# 6. Rewrite Mobile Render
old_mobile_render = """  // Mobile: normal scrollable layout (no fullpage controller)
  if (isMobile) {
    return (
      <div className="overflow-x-hidden">
        <CustomCursor />
        <MobileScrollProgress />
        <Header />
        <main className="pt-25">
          <section className="pb-8">
            <Hero />
          </section>
          <div className="px-4 py-12 space-y-20">
            <About />
            <Services />
            <Projects />
            <Skills />
            {/* Socials section completely hidden on mobile as requested */}
            <Process />
          </div>
          <section className="py-16">
            <Contact />
          </section>
        </main>
        <footer className="border-t border-border py-6 px-4 text-center text-sm text-text-muted">
          <p>Ac {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-3">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent" aria-label={link.label}>
                <BrandIcon name={link.name} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </footer>
        <ScrollToTopButton />
      </div>
    );
  }"""

new_mobile_render = """  // Mobile: normal scrollable layout (no fullpage controller)
  if (isMobile) {
    return (
      <div className="overflow-x-hidden">
        <CustomCursor />
        <MobileScrollProgress />
        <Header />
        <main className="pt-25">
          {mobileSections.map((Section, idx) => (
            <div key={Section.id} className={idx === 0 ? "pb-8" : idx === mobileSections.length - 1 ? "py-16" : "px-4 py-12"}>
              <Section.comp />
            </div>
          ))}
        </main>
        <footer className="border-t border-border py-6 px-4 text-center text-sm text-text-muted">
          <p>Ac {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex justify-center gap-4 mt-3">
            {socialLinks.map((link) => (
              <a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent" aria-label={link.label}>
                <BrandIcon name={link.name} className="w-4 h-4" />
              </a>
            ))}
          </div>
        </footer>
        <ScrollToTopButton />
      </div>
    );
  }"""

content = content.replace(old_mobile_render, new_mobile_render)

# 7. Rewrite Desktop Render
old_desktop_vars = """  // Determine what to show
  const isHero = currentPage === 0;
  const isContact = currentPage === 7;"""

content = content.replace(old_desktop_vars, """  // Determine what to show
  const isHero = currentPage === 0;
  const isContact = currentPage === desktopSections.length - 1;""")

old_card_map = """{cardSections.map((Section, index) => {"""
content = content.replace(old_card_map, "{middleDesktopSections.map((SectionInfo, index) => { const Section = SectionInfo.comp;")

old_hero_comp = """<Hero active={isHero} />"""
content = content.replace(old_hero_comp, "{firstDesktopSection && <firstDesktopSection.comp active={isHero} />}")

old_contact_comp = """<Contact active={isContact} />"""
content = content.replace(old_contact_comp, "{lastDesktopSection && <lastDesktopSection.comp active={isContact} />}")

# 8. Fix Hero "Hire me" button mapping
content = content.replace("scrollController.goTo(7);", "scrollController.goTo(scrollController.totalPages - 1);")

# 9. Fix navItems hardcode removal
content = re.sub(r"export let navItems: any\[\] = \[\n.*?\];", "export let navItems: any[] = [];", content, flags=re.DOTALL)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Done.")
