# St. Basil Church Website - Development Guide

Complete web development curriculum for building, testing, optimizing, and deploying the church website.

---

## 📚 DOCUMENTATION

### Phase 7: Testing
- **[PHASE_7_TESTING.md](PHASE_7_TESTING.md)** - Comprehensive testing guide covering:
  - Responsiveness testing
  - Browser compatibility
  - Accessibility (WCAG 2.1)
  - Performance testing
  - SEO testing
  - Broken links testing
  - Forms testing
  - Navigation testing
  - Image optimization

- **[QUICK_TESTING_CHECKLIST.md](QUICK_TESTING_CHECKLIST.md)** - Pre-deployment checklist to use before each deployment

- **[IMAGE_OPTIMIZATION_TESTING.md](IMAGE_OPTIMIZATION_TESTING.md)** - Detailed image optimization guide

- **[AUTOMATED_TESTING.md](AUTOMATED_TESTING.md)** - Jest & React Testing Library examples

### Phase 8-11 (Coming Soon)
- Phase 8: Optimization
- Phase 9: SEO Implementation
- Phase 10: Deployment
- Phase 11: Maintenance

---

## 🚀 QUICK START

### Prerequisites
- Node.js 18+
- npm or yarn
- Modern browser (Chrome, Firefox, Safari, Edge)

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Testing

```bash
# Run linter
npm run lint

# Build production version
npm run build

# Run automated tests
npm test

# Watch mode (re-run on changes)
npm test -- --watch

# Coverage report
npm test -- --coverage
```

---

## 📋 TESTING WORKFLOW

### Before Each Deployment

1. **Run Automated Tests**
   ```bash
   npm run lint
   npm run build
   npm test -- --coverage
   ```

2. **Manual Testing**
   - Use [QUICK_TESTING_CHECKLIST.md](QUICK_TESTING_CHECKLIST.md)
   - Test on desktop, tablet, mobile
   - Test on Chrome, Firefox, Safari, Edge
   - Test all user workflows

3. **Performance Check**
   - Run Lighthouse in Chrome DevTools (F12 → Lighthouse)
   - Target score: ≥ 90
   - Monitor Core Web Vitals

4. **Accessibility Check**
   - Run axe DevTools
   - Test keyboard navigation
   - Verify screen reader compatibility

5. **SEO Check**
   - Verify meta tags
   - Check sitemap.xml
   - Verify robots.txt

---

## 🧪 TESTING TOOLS

### Built-in (Free)

| Tool | What It Does | How to Use |
|------|-------------|-----------|
| **Chrome DevTools** | Debug, inspect, test | Press F12 |
| **Lighthouse** | Performance, SEO, Accessibility | F12 → Lighthouse tab |
| **axe DevTools** | Accessibility violations | Chrome extension |

### Command Line

| Tool | What It Does | Install |
|------|-------------|---------|
| **ESLint** | Code quality | npm run lint |
| **Jest** | Unit tests | npm test |
| **Next.js Build** | Production build | npm run build |

### Online Tools (Free)

| Tool | Purpose | Link |
|------|---------|------|
| **TinyPNG** | Compress images | tinypng.com |
| **Squoosh** | Image optimization | squoosh.app |
| **WebPageTest** | Performance analysis | webpagetest.org |
| **Google Search Console** | SEO monitoring | search.google.com/search-console |

---

## 📊 KEY METRICS TO MONITOR

### Performance (Lighthouse)
- Target: Score ≥ 90
- First Contentful Paint: < 1.8s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

### Accessibility
- Axe violations: 0
- WCAG level AA compliance
- Keyboard navigable
- Screen reader compatible

### SEO
- All pages indexed in Google
- Sitemap.xml submitted
- robots.txt configured
- Meta tags present on all pages

---

## 🔗 QUICK REFERENCE

### Testing on Local Machine

```bash
# Test responsiveness
- Open DevTools (F12)
- Click "Toggle device toolbar" (Ctrl+Shift+M)
- Test viewports: 320px, 768px, 1024px, 1920px

# Test performance
- DevTools → Lighthouse → Performance → Analyze

# Test accessibility
- Install axe DevTools extension
- DevTools → axe DevTools → Scan ALL of my page

# Test links
npm install -g broken-link-checker
blc http://localhost:3000 -r
```

### Before Deployment Checklist

```
Automated:
[ ] npm run lint - passes
[ ] npm run build - succeeds
[ ] npm test - all pass
[ ] Lighthouse score ≥ 90

Manual:
[ ] Test on mobile, tablet, desktop
[ ] Test on Chrome, Firefox, Safari, Edge
[ ] Test all forms
[ ] Test all links
[ ] Check accessibility with axe
[ ] Verify all content is correct
```

---

## 💡 TESTING TIPS

1. **Test Early** - Don't wait until deployment
2. **Test Often** - Run tests after each change
3. **Test Real Devices** - Emulation isn't perfect
4. **Use Checklists** - Use pre-deployment checklist
5. **Automate What You Can** - Use Jest, Lighthouse, axe
6. **Document Issues** - File GitHub issues for bugs
7. **Prioritize Fixes** - Fix: Broken Links > Accessibility > Performance

---

## 📞 TESTING RESOURCES

### Accessibility
- [WCAG 2.1 Standards](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM](https://webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### Performance
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Web.dev](https://web.dev/)
- [Core Web Vitals](https://web.dev/vitals/)

### SEO
- [Google Search Central](https://developers.google.com/search)
- [SEMrush](https://semrush.com/)
- [Ahrefs](https://ahrefs.com/)

### Images
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [CWEBP](https://developers.google.com/speed/webp/docs/cwebp)

---

## 🎯 NEXT PHASES

### Phase 8: Optimization
- Loading speed optimization
- Lighthouse score improvement
- Core Web Vitals optimization
- Image compression
- Lazy loading
- Code splitting
- Caching strategies

### Phase 9: SEO
- Metadata implementation
- Sitemap.xml creation
- robots.txt configuration
- Open Graph tags
- Structured data
- Canonical URLs

### Phase 10: Deployment
- GitHub repository setup
- Deployment platform (Vercel, Netlify, etc.)
- Custom domain configuration
- HTTPS/SSL setup
- DNS configuration
- Production testing

### Phase 11: Maintenance
- Backup strategy
- Regular updates
- Monitoring & analytics
- Security patches
- Performance tracking
- Future improvements

---

## 📝 CODING RULES

Always follow these principles:

1. **Write Clean Code**
   - Use meaningful variable names
   - Keep functions focused (single responsibility)
   - No hardcoded values

2. **Follow SOLID Principles**
   - Single Responsibility Principle
   - Open/Closed Principle
   - Liskov Substitution Principle
   - Interface Segregation Principle
   - Dependency Inversion Principle

3. **Avoid Duplication**
   - Extract reusable components
   - Use utility functions
   - Create shared styles

4. **Use Reusable Components**
   - Build component library
   - Document prop types
   - Make components generic

5. **Meaningful Names**
   - Variable names describe purpose
   - Function names describe action
   - Class names describe type

6. **Comments**
   - Only comment complex logic
   - Explain WHY, not WHAT
   - Keep comments updated

---

## 📄 FILE STRUCTURE

```
st-basil-church-website/
├── public/              # Static assets
│   ├── sitemap.xml
│   ├── robots.txt
│   └── images/
├── src/
│   ├── components/      # Reusable components
│   ├── pages/          # Next.js pages
│   ├── styles/         # Global styles
│   └── utils/          # Helper functions
├── tests/              # Jest tests
├── docs/               # Documentation
│   ├── PHASE_7_TESTING.md
│   ├── QUICK_TESTING_CHECKLIST.md
│   ├── IMAGE_OPTIMIZATION_TESTING.md
│   └── AUTOMATED_TESTING.md
├── package.json
├── jest.config.js
├── jest.setup.js
└── next.config.js
```

---

## 🆘 TROUBLESHOOTING

### Tests Fail with Module Not Found
```bash
# Clear cache and reinstall
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Lighthouse Score Low
1. Check images are optimized (< 200KB each)
2. Verify lazy loading implemented
3. Check for unused JavaScript
4. Minimize CSS/JS bundles

### Accessibility Violations
1. Add alt text to images
2. Add labels to form fields
3. Ensure color contrast is sufficient
4. Make keyboard navigable

---

## ✅ DEPLOYMENT CHECKLIST

Before deploying to production:

- [ ] All tests pass
- [ ] Lighthouse score ≥ 90
- [ ] Axe violations = 0
- [ ] No broken links
- [ ] All images optimized
- [ ] Mobile responsive verified
- [ ] Forms working
- [ ] Content is current
- [ ] No console errors
- [ ] Meta tags configured

---

**Phase 7 Complete!** ✅

You now have comprehensive testing documentation, checklists, and automated test examples. Use these tools and guides to ensure your website is production-ready before deployment.

**Next: Phase 8 - Optimization** ➡️
