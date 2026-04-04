# Pritish Dutta Portfolio - Development Plan

## Design Guidelines

### Theme: Zen Garden
- Minimalist, tranquil aesthetic inspired by stone gardens and natural textures
- Serif headings (Noto Serif SC) + Sans body (Noto Sans SC)
- Warm earth tones with subtle green accents

### Color Palette (Light Mode)
- Background: hsl(40 12% 95%) - Warm off-white
- Foreground: hsl(24 10% 15%) - Deep warm brown
- Primary: hsl(24 10% 20%) - Dark earth
- Accent: hsl(75 15% 40%) - Muted olive green
- Muted: hsl(35 10% 90%) - Soft beige
- Card: hsl(40 12% 96%) - Light cream

### Typography
- Headings: 'Noto Serif SC', serif - elegant, traditional
- Body: 'Noto Sans SC', sans-serif - clean, readable
- Letter spacing: 0.05em for zen feel

### Key Component Styles
- Cards: Cream background, subtle border, 0.25rem radius
- Buttons: Dark earth primary, light text
- Sections: Generous padding, breathing room
- Animations: Gentle fade-ins, smooth transitions

### Images to Generate
1. **hero-zen-garden-stones.jpg** - Minimalist zen garden with raked sand and stones, warm earth tones, peaceful atmosphere (photorealistic)
2. **section-bg-bamboo-texture.jpg** - Subtle bamboo texture pattern, muted warm tones, suitable as section background (minimalist)
3. **project-ai-neural-network.jpg** - Abstract neural network visualization, warm earth tones with green accents, representing AI/ML work (minimalist)
4. **project-code-abstract.jpg** - Abstract code/data visualization, clean lines, zen-inspired minimal aesthetic (minimalist)

---

## Development Tasks

1. **Theme Setup** - Apply Zen theme to index.css and tailwind.config.ts
2. **Generate Images** - Create 4 images using ImageCreator
3. **Homepage (Index.tsx)** - Single-page portfolio with all sections:
   - Hero with name, title, contact links
   - About/Profile section
   - Education timeline
   - Skills grid
   - Projects showcase
   - Experience section
   - Achievements & Extracurriculars
   - Footer with contact

## Files to Create/Modify
1. `src/index.css` - Zen theme CSS variables
2. `tailwind.config.ts` - Zen font families and letter spacing
3. `src/pages/Index.tsx` - Main portfolio page (all sections)
4. `src/components/portfolio/HeroSection.tsx` - Hero section
5. `src/components/portfolio/AboutSection.tsx` - Profile/About
6. `src/components/portfolio/EducationSection.tsx` - Education timeline
7. `src/components/portfolio/SkillsSection.tsx` - Technical skills
8. `src/components/portfolio/ProjectsSection.tsx` - Projects showcase + Experience + Achievements + Footer