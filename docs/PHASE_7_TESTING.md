# Phase 7: Testing Guide
## St. Basil Church Website - Comprehensive Testing Strategy

This guide teaches you how to test the website across all critical dimensions to ensure quality, performance, accessibility, and user experience.

---

## 1. RESPONSIVENESS TESTING

### What & Why
Responsiveness ensures your website displays correctly on all screen sizes: mobile (320px), tablet (768px), desktop (1024px+).

### Testing Methods

#### Manual Testing (Browser DevTools)
```
1. Open Chrome DevTools (F12 or Ctrl+Shift+I)
2. Click "Toggle device toolbar" (Ctrl+Shift+M)
3. Test these viewports:
   - Mobile: 320px, 375px, 414px, 768px
   - Tablet: 768px, 1024px
   - Desktop: 1366px, 1920px, 2560px
4. Check for:
   - Text readability
   - Image scaling
   - Navigation usability
   - Button/link tap targets (min 48px for mobile)
```

#### Automated Testing (Next.js)
```bash
# Install testing tools
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

Create `tests/responsive.test.js`:
```javascript
import { render, screen } from '@testing-library/react';
import HomePage from '@/pages/index';

describe('Responsive Design', () => {
  const viewports = [
    { name: 'Mobile', width: 320 },
    { name: 'Tablet', width: 768 },
    { name: 'Desktop', width: 1024 }
  ];

  viewports.forEach(({ name, width }) => {
    test(`renders correctly on ${name} (${width}px)`, () => {
      global.innerWidth = width;
      render(<HomePage />);
      expect(screen.getByRole('main')).toBeInTheDocument();
    });
  });
});
```

### Checklist: Responsiveness
- [ ] Navigation menu works on mobile (hamburger menu or stacked)
- [ ] Images scale proportionally without distortion
- [ ] Text is readable without zooming on mobile
- [ ] No horizontal scrolling on mobile
- [ ] Forms are touch-friendly (inputs 44px+ tall)
- [ ] Buttons have adequate spacing between them
- [ ] Hero section looks good on all sizes
- [ ] Footer displays correctly on mobile
- [ ] No layout shifts when switching viewports
- [ ] Videos/iframes are responsive

---

## 2. BROWSER COMPATIBILITY TESTING

### What & Why
Different browsers interpret CSS, JavaScript, and HTML differently. Compatibility testing ensures consistent behavior across all major browsers.

### Supported Browsers
- Chrome 90+ (market share ~65%)
- Firefox 88+ (market share ~13%)
- Safari 14+ (market share ~20%)
- Edge 90+ (market share ~4%)

### Testing Methods

#### Manual Browser Testing
```
1. Test on actual browsers:
   - Chrome: Windows, Mac, Linux
   - Firefox: Windows, Mac, Linux
   - Safari: Mac, iOS
   - Edge: Windows

2. Check for:
   - Layout consistency
   - Font rendering
   - Animations/transitions
   - Form validation
   - JavaScript functionality
```

#### Use BrowserStack (Optional - Paid)
```
1. Create BrowserStack account (free trial available)
2. Test live on 1000+ browser/OS combinations
3. No setup required - test in cloud
```

#### Check CanIUse.com
For each CSS/JS feature used:
```
Visit https://caniuse.com/
Example: CSS Grid, Flexbox, Object-fit, etc.
Ensure 95%+ browser support or include fallbacks
```

### Create Browser Compatibility Matrix

Create `docs/browser-compatibility.md`:
```markdown
# Browser Compatibility Matrix

| Feature | Chrome | Firefox | Safari | Edge | Fallback |
|---------|--------|---------|--------|------|----------|
| CSS Grid | ✅ | ✅ | ✅ | ✅ | Flexbox |
| CSS Flexbox | ✅ | ✅ | ✅ | ✅ | Float layout |
| ES6 Classes | ✅ | ✅ | ✅ | ✅ | Transpile |
| Async/Await | ✅ | ✅ | ✅ | ✅ | Transpile |
| Modern Images (WEBP) | ✅ | ✅ | ⚠️ | ✅ | JPG fallback |
```

### Checklist: Browser Compatibility
- [ ] Test on Chrome latest version
- [ ] Test on Firefox latest version
- [ ] Test on Safari (Mac or BrowserStack)
- [ ] Test on Edge latest version
- [ ] CSS displays correctly across browsers
- [ ] JavaScript runs without errors
- [ ] Forms work consistently
- [ ] Images load in all browsers
- [ ] Videos play across browsers
- [ ] Console shows no errors

---

## 3. ACCESSIBILITY TESTING

### What & Why
Accessibility (A11y) ensures everyone can use your website:
- Screen reader users (blind/visually impaired)
- Keyboard-only users (mobility disabilities)
- Color blind users
- Hearing impaired users (captions for audio)
- Cognitive disabilities (clear language, structure)

### WCAG 2.1 Standards (A, AA, AAA)
- **Level A**: Minimum compliance
- **Level AA**: Industry standard (aim for this)
- **Level AAA**: Enhanced accessibility

### Quick Accessibility Wins

1. **Semantic HTML**
```html
<!-- ❌ Bad -->
<div class="header" onclick="navigate()">Home</div>

<!-- ✅ Good -->
<header>
  <nav>
    <a href="/home">Home</a>
  </nav>
</header>
```

2. **Alt Text for Images**
```html
<!-- ❌ Bad -->
<img src="photo.jpg">

<!-- ✅ Good -->
<img src="photo.jpg" alt="Fr. Thomas leading Sunday service">
```

3. **Form Labels**
```html
<!-- ❌ Bad -->
<input type="email" placeholder="Email">

<!-- ✅ Good -->
<label for="email">Email Address</label>
<input id="email" type="email" required>
```

4. **Color Contrast**
```css
/* WCAG AA requires 4.5:1 ratio for normal text */
/* Aim for: dark text on light background or vice versa */
color: #1a1a1a;        /* Dark gray text */
background: #ffffff;    /* White background = high contrast */
```

5. **Keyboard Navigation**
```html
<!-- All interactive elements must be keyboard accessible -->
<button>Send Message</button>  <!-- ✅ Native keyboard support -->
<div role="button" tabindex="0">Send</div>  <!-- ⚠️ Needs event listeners -->
```

### Testing Tools

#### axe DevTools (Chrome Extension)
```
1. Install: chrome.google.com/webstore → search "axe DevTools"
2. Open DevTools (F12)
3. Click "axe DevTools" tab
4. Click "Scan ALL of my page"
5. Review violations and fix issues
```

#### WAVE (WebAIM)
```
1. Install: chrome.google.com/webstore → search "WAVE"
2. Click WAVE icon on any page
3. Review errors (must fix) and warnings (should fix)
```

#### Lighthouse (Built-in Chrome)
```
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Accessibility"
4. Click "Analyze page load"
5. Review score and recommendations
```

#### Screen Reader Testing
```
On Windows:
- NVDA (free): nvaccess.org

On Mac:
- VoiceOver (built-in): Cmd+F5

Testing process:
1. Disable mouse/trackpad
2. Use only keyboard: Tab, Shift+Tab, Arrow keys, Enter
3. Listen to screen reader output
4. Verify all content is readable
```

### Accessibility Checklist
- [ ] All images have descriptive alt text
- [ ] Form inputs have associated labels
- [ ] Color contrast is 4.5:1 or higher (test with WebAIM contrast checker)
- [ ] Website is keyboard navigable (Tab through all interactive elements)
- [ ] Focus indicators are visible (blue outline when using Tab)
- [ ] No content relies solely on color
- [ ] Headings are semantic (h1 → h2 → h3, not skipping levels)
- [ ] Tables have headers (<th> tags)
- [ ] Videos have captions and transcripts
- [ ] Audio has transcripts
- [ ] Links have descriptive text (not "Click here")
- [ ] Error messages are clear and constructive
- [ ] Axe DevTools scan shows 0 errors
- [ ] Lighthouse accessibility score ≥ 90

---

## 4. PERFORMANCE TESTING

### What & Why
Performance testing measures how fast your website loads and responds. Slow websites lose users (1-3 second delays = 40% bounce rate).

### Key Metrics

1. **First Contentful Paint (FCP)** < 1.8s
   - Time until user sees first content
   
2. **Largest Contentful Paint (LCP)** < 2.5s
   - Time until largest element loads
   
3. **Cumulative Layout Shift (CLS)** < 0.1
   - Visual stability (elements moving around)
   
4. **Time to Interactive (TTI)** < 3.8s
   - Time until page becomes fully interactive
   
5. **First Input Delay (FID)** < 100ms
   - Responsiveness to user interaction

### Testing Tools

#### Lighthouse Performance Test
```bash
# In Chrome DevTools:
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Performance"
4. Check desktop and mobile
5. Target: Score ≥ 90
```

#### WebPageTest
```
1. Visit webpagetest.org
2. Enter your URL
3. Select browser and location
4. Run test
5. Review waterfall chart and recommendations
```

#### Test Local Development
```bash
# Start dev server
npm run dev

# Test with Lighthouse via CLI
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

### Performance Optimization
(Covered in detail in Phase 8)

### Performance Checklist
- [ ] Lighthouse Performance score ≥ 85
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total page size < 3MB
- [ ] Images are optimized (covered in Phase 8)
- [ ] No render-blocking resources
- [ ] Code splitting implemented
- [ ] Third-party scripts are deferred
- [ ] Fonts are optimized (WOFF2 format)
- [ ] No console errors or warnings
- [ ] No memory leaks

---

## 5. SEO TESTING

### What & Why
SEO (Search Engine Optimization) ensures your website ranks well in Google, Bing, etc., so people can find it.

### SEO Essentials

1. **Meta Tags**
```html
<head>
  <title>St. Basil Jacobite Syrian Orthodox Church - Melbourne</title>
  <meta name="description" content="Welcome to St. Basil Church. Services, events, and community.">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
```

2. **Structured Data (Schema.org)**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "St. Basil Jacobite Syrian Orthodox Church",
  "image": "https://example.com/logo.png",
  "description": "Orthodox church in Melbourne",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Church St",
    "addressLocality": "Melbourne",
    "postalCode": "3000"
  }
}
</script>
```

3. **Open Graph (Social Sharing)**
```html
<meta property="og:title" content="St. Basil Church">
<meta property="og:description" content="Join our community">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:type" content="website">
```

### Testing SEO

#### Google Search Console
```
1. Visit search.google.com/search-console
2. Add property (your domain)
3. Upload sitemap.xml
4. Monitor:
   - Indexing status
   - Search queries
   - Click-through rates
   - Mobile usability
```

#### Check Sitemap
```
1. Visit yoursite.com/sitemap.xml
2. Verify all important pages are listed
3. Check last modified dates
```

#### Check robots.txt
```
1. Visit yoursite.com/robots.txt
2. Verify settings allow Google bots
```

#### SEO Audit Tools
```
1. SEMrush (free trial): semrush.com
2. Ahrefs (free tools): ahrefs.com/tools
3. MozBar (Chrome extension): moz.com/tools
```

### SEO Checklist
- [ ] Title tags are unique and descriptive (50-60 characters)
- [ ] Meta descriptions present (150-160 characters)
- [ ] H1 tag present (one per page)
- [ ] Headings follow hierarchy (h1 > h2 > h3)
- [ ] Images have alt text
- [ ] Internal links are descriptive
- [ ] URLs are clean and descriptive
- [ ] Sitemap.xml exists and is submitted to Google
- [ ] robots.txt exists and is correct
- [ ] Open Graph tags present
- [ ] Structured data implemented (LocalBusiness schema)
- [ ] Canonical URLs set (especially for duplicates)
- [ ] Mobile-friendly (responsive design)
- [ ] Page speed is good (Lighthouse ≥ 85)
- [ ] No broken links (checked with tool)

---

## 6. BROKEN LINKS TESTING

### What & Why
Broken links frustrate users, hurt SEO, and suggest the site is unmaintained.

### Testing Methods

#### Automated Link Checker Tools

**1. W3C Link Checker (Free)**
```
1. Visit validator.w3.org/checklink
2. Enter your URL
3. Click "Check"
4. Review broken links (404 errors)
```

**2. Broken Link Checker CLI**
```bash
# Install globally
npm install -g broken-link-checker

# Run check
blc http://localhost:3000 -r
```

**3. ScreamingFrog (Free version)**
```
1. Download: screamingfrog.co.uk
2. Enter URL
3. Click "Start"
4. Filter by "Response Codes"
5. Look for 404, 500 errors
```

#### Manual Testing
```
1. Click every link on the homepage
2. Verify destination page loads
3. Check external links still work
4. Verify contact forms send emails
5. Test download links
```

### Broken Links Checklist
- [ ] All internal links return 200 (success)
- [ ] No 404 (page not found) errors
- [ ] No 500 (server error) responses
- [ ] External links are valid
- [ ] Contact forms submit successfully
- [ ] Download links work
- [ ] Social media links are correct
- [ ] No broken image links
- [ ] mailto: links open email client
- [ ] tel: links initiate phone calls

---

## 7. FORMS TESTING

### What & Why
Forms are critical for user engagement (contact, prayer requests, registrations). Testing ensures users can submit data successfully.

### Form Elements to Test

1. **Text Inputs**
```html
<input type="text" name="fullName" required>
<!-- Test: Type text, special characters, numbers -->
```

2. **Email Inputs**
```html
<input type="email" required>
<!-- Test: Valid emails (user@example.com), invalid (user@), empty -->
```

3. **Phone Inputs**
```html
<input type="tel" pattern="[0-9\-\+\(\) ]+" required>
<!-- Test: Various phone formats -->
```

4. **Text Areas**
```html
<textarea name="message" required></textarea>
<!-- Test: Long text, line breaks, special characters -->
```

5. **Dropdowns**
```html
<select name="category" required>
  <option value="">Select an option</option>
  <option value="prayer">Prayer Request</option>
</select>
<!-- Test: Select different options, leave blank -->
```

6. **Checkboxes & Radio Buttons**
```html
<input type="checkbox" name="newsletter"> Subscribe to newsletter
<input type="radio" name="contact" value="email"> Email
<!-- Test: Multiple selections, none selected -->
```

7. **Date Pickers**
```html
<input type="date" name="eventDate">
<!-- Test: Future dates, past dates, specific formats -->
```

### Form Testing Checklist
- [ ] Required fields show error when empty
- [ ] Email validation works (rejects invalid emails)
- [ ] Phone validation works (rejects invalid numbers)
- [ ] Form can't be submitted with errors
- [ ] Success message appears after submission
- [ ] Form resets after successful submission
- [ ] Dropdowns expand and collapse correctly
- [ ] Checkboxes/radios can be selected/deselected
- [ ] File uploads work (if applicable)
- [ ] Date pickers open and select dates
- [ ] Error messages are clear and helpful
- [ ] Form works with keyboard (Tab through fields)
- [ ] Form works on mobile
- [ ] CAPTCHA works (if implemented)
- [ ] Email received on server side
- [ ] Data is sanitized/escaped (no XSS)

### Test Form Submission
```javascript
// Example: Automated form test
describe('Contact Form', () => {
  test('submits valid form data', async () => {
    render(<ContactForm />);
    
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'John Smith' }
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'john@example.com' }
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });
});
```

---

## 8. NAVIGATION TESTING

### What & Why
Navigation is how users move through your website. Poor navigation causes frustration and lost users.

### Key Navigation Elements

1. **Main Menu**
   - Desktop: Horizontal menu bar
   - Mobile: Hamburger menu
   - Active state shows current page

2. **Breadcrumbs**
   - Home > Services > Sunday Service
   - Helps users understand location

3. **Footer Links**
   - Quick access to important pages
   - Consistent across all pages

4. **Internal Links**
   - Descriptive anchor text
   - No "click here" links

5. **Search Functionality** (if applicable)
   - Quick results
   - Autocomplete suggestions

### Navigation Testing Checklist
- [ ] Main menu expands/collapses correctly
- [ ] All menu items have links that work
- [ ] Active page is highlighted in menu
- [ ] Mobile menu hamburger icon works
- [ ] Mobile menu closes when link clicked
- [ ] Breadcrumbs display correctly
- [ ] Breadcrumbs are clickable
- [ ] Footer links work
- [ ] Internal links use descriptive text
- [ ] No broken navigation links
- [ ] Menu is keyboard accessible (Tab, Arrow keys)
- [ ] Menu works on all devices
- [ ] Search (if present) returns results
- [ ] Search is accessible
- [ ] No dead ends (all pages link back)
- [ ] Sitemap page lists all pages

---

## 9. IMAGE OPTIMIZATION TESTING

### What & Why
Images are often the largest files on a webpage. Optimization reduces load time and improves user experience.

### Image Testing Checklist
- [ ] All images have alt text
- [ ] Images are in modern format (WEBP with fallback)
- [ ] Images are properly sized (not scaled in HTML)
- [ ] Image file sizes are < 200KB (for web)
- [ ] Responsive images use `<picture>` tag
- [ ] No blurry/pixelated images
- [ ] Images have descriptive filenames
- [ ] No unused images in code
- [ ] Lazy loading implemented for below-fold images
- [ ] Image compression applied (ImageOptim, TinyPNG)
- [ ] SVG images used for icons
- [ ] Lighthouse scores show image optimization success
- [ ] Images render correctly in all browsers
- [ ] Images don't cause layout shifts

---

## AUTOMATED TESTING SETUP

### Install Testing Framework

```bash
# Install Jest and React Testing Library
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom

# Create jest.config.js
```

Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom'
```

### Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

---

## COMPLETE TESTING WORKFLOW

### 1. Before Deployment
```bash
# 1. Run linter
npm run lint

# 2. Build production version
npm run build

# 3. Run automated tests
npm test -- --coverage

# 4. Start production server
npm start

# 5. Manual testing:
# - Test all pages
# - Check all links
# - Test forms
# - Test navigation
# - Check on mobile
```

### 2. Use Testing Checklist
Create `tests/TEST_CHECKLIST.md`:
```markdown
# Test Checklist Before Each Deployment

## Automated Tests
- [ ] All unit tests pass
- [ ] No console errors
- [ ] Lint passes (npm run lint)
- [ ] Build succeeds (npm run build)

## Responsiveness
- [ ] Mobile (320px)
- [ ] Tablet (768px)
- [ ] Desktop (1024px)

## Browser Compatibility
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## Functionality
- [ ] All pages load
- [ ] All links work
- [ ] Forms submit
- [ ] Navigation works
- [ ] Images load

## Performance
- [ ] Lighthouse score ≥ 85
- [ ] Page size < 3MB
- [ ] Load time < 3s

## SEO
- [ ] Meta tags present
- [ ] Alt text on images
- [ ] Sitemap submitted

## Accessibility
- [ ] Axe DevTools: 0 errors
- [ ] Keyboard navigation works
- [ ] Screen reader friendly

## Final Check
- [ ] Content is correct
- [ ] No typos
- [ ] All features work
- [ ] Matches design
```

---

## KEY TAKEAWAYS

1. **Test Early, Test Often** - Don't wait until deployment
2. **Use Automated Tools** - axe, Lighthouse, Jest save time
3. **Test on Real Devices** - Emulation isn't perfect
4. **Document Issues** - Use bug tracking (GitHub Issues)
5. **Fix High Priority Issues** - Prioritize: Broken Links > Accessibility > Performance
6. **Create Checklists** - Use checklists to ensure nothing is missed
7. **Test Before Deployment** - Always test on production-like environment
8. **Monitor After Launch** - Use analytics and monitoring to catch issues

---

## TOOLS SUMMARY

| Tool | Purpose | Cost | Setup |
|------|---------|------|-------|
| Lighthouse | Performance, Accessibility, SEO | Free | Built into Chrome |
| axe DevTools | Accessibility violations | Free | Chrome extension |
| WAVE | Accessibility issues | Free | Chrome extension |
| Jest | Unit/component tests | Free | npm install |
| React Testing Library | Component testing | Free | npm install |
| Broken Link Checker | Find broken links | Free | CLI or website |
| WebPageTest | Performance waterfall | Free | Online tool |
| Google Search Console | SEO monitoring | Free | setup.google.com |
| BrowserStack | Cross-browser testing | Paid | Online tool |
| ScreamingFrog | Site-wide link checking | Free/Paid | Desktop app |

---

## NEXT STEPS

✅ Phase 7 Complete: Testing framework and checklists created

➡️ **Phase 8: Optimization** - Implement performance improvements based on test results

**Save this document in your project:**
```
docs/PHASE_7_TESTING.md
```

Use these checklists before every deployment!
