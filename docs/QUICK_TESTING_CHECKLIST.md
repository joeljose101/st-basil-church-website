# QUICK TESTING CHECKLIST
## St. Basil Church Website - Pre-Deployment Checklist

Use this checklist every time before deploying. Print or copy to a text editor.

---

## ✅ AUTOMATED TESTS (5 min)

```
Date: ___________
Tester: ___________

[ ] npm run lint → Passes with no errors
[ ] npm run build → Succeeds
[ ] npm test → All tests pass
[ ] No console errors in DevTools
```

---

## ✅ RESPONSIVENESS (10 min)

Test on: Chrome DevTools Toggle Device Toolbar (Ctrl+Shift+M)

```
Mobile (320px):
[ ] Header/menu displays correctly
[ ] Text is readable
[ ] Images are properly sized
[ ] Forms are usable (touch targets 48px+)
[ ] No horizontal scrolling
[ ] Footer visible

Tablet (768px):
[ ] Layout is appropriate
[ ] Navigation changes correctly
[ ] All content is visible

Desktop (1024px+):
[ ] Full layout displays
[ ] Multi-column layouts work
[ ] Spacing is balanced
```

---

## ✅ BROWSER COMPATIBILITY (10 min)

Test in each browser:

```
Chrome:
[ ] Page loads
[ ] No console errors
[ ] All features work
[ ] Forms submit

Firefox:
[ ] Page loads
[ ] Layout matches Chrome
[ ] No console errors
[ ] All features work

Safari (use BrowserStack if no Mac):
[ ] Page loads
[ ] Images display
[ ] Styling is correct

Edge:
[ ] Page loads
[ ] Layout matches Chrome
[ ] All features work
```

---

## ✅ FUNCTIONALITY (10 min)

```
Navigation:
[ ] All menu links work
[ ] Active page highlighted
[ ] Mobile hamburger menu works
[ ] Breadcrumbs work (if present)

Links:
[ ] All internal links work (no 404s)
[ ] External links open correctly
[ ] Social media links work

Forms:
[ ] Contact form can be filled out
[ ] Submit button works
[ ] Success message appears
[ ] Email is received

Content:
[ ] All images load
[ ] All text displays correctly
[ ] No missing content
[ ] No typos or grammatical errors
```

---

## ✅ ACCESSIBILITY (10 min)

```
[ ] Use keyboard Tab key to navigate all interactive elements
[ ] All form fields have labels
[ ] Images have alt text (right-click > Inspect)
[ ] Links have descriptive text (not "click here")
[ ] Headings use proper hierarchy (h1, h2, h3)
[ ] Color contrast is good (text readable)

Run axe DevTools (Chrome extension):
[ ] Open DevTools (F12)
[ ] Click axe DevTools tab
[ ] Click "Scan ALL of my page"
[ ] No violations shown (errors = 0)
[ ] No alerts for warnings
```

---

## ✅ PERFORMANCE (5 min)

Run Lighthouse in Chrome DevTools:

```
[ ] Open DevTools (F12)
[ ] Click "Lighthouse" tab
[ ] Select "Performance"
[ ] Click "Analyze page load"
[ ] Score ≥ 85
[ ] First Contentful Paint < 1.8s
[ ] Largest Contentful Paint < 2.5s
[ ] Cumulative Layout Shift < 0.1

Performance Observations:
[ ] Page loads quickly (feels instant)
[ ] No layout shifts (elements moving around)
[ ] No janky scrolling
[ ] Buttons respond immediately
[ ] Images load progressively
```

---

## ✅ BROKEN LINKS (5 min)

Use Broken Link Checker:

```bash
npm install -g broken-link-checker  (one-time setup)
blc http://localhost:3000 -r        (run on local server)
```

Or manually:
```
[ ] Click 5-10 different links
[ ] All load successfully
[ ] No 404 errors
[ ] External links still work
```

---

## ✅ SEO (5 min)

```
On homepage, right-click > Inspect > Head section:
[ ] <title> tag present and descriptive
[ ] <meta name="description"> present
[ ] <meta name="viewport"> present
[ ] Open Graph tags present (og:title, og:description, og:image)
[ ] Structured data implemented (schema.org)

Files present:
[ ] /public/sitemap.xml exists
[ ] /public/robots.txt exists
[ ] Sitemap submitted to Google Search Console
```

---

## ✅ MOBILE SPECIFIC (5 min)

Test on actual mobile phone (or Chrome mobile emulation):

```
[ ] Page is readable without zooming
[ ] Buttons are tappable (not too small)
[ ] Forms are usable
[ ] Navigation works
[ ] No horizontal scrolling
[ ] Images load (data usage reasonable)
[ ] Videos play
[ ] Touch gestures work (if applicable)
```

---

## ✅ CONTENT VERIFICATION (5 min)

```
[ ] All text is current and accurate
[ ] All contact information is correct
[ ] All service times are accurate
[ ] All links point to correct pages
[ ] Images are appropriate and high quality
[ ] No placeholder text remaining
[ ] No Lorem Ipsum text
```

---

## ✅ CROSS-PAGE TESTING (10 min)

Visit these key pages and verify:

```
Page: ________________
[ ] Header/footer display correctly
[ ] Navigation highlights active page
[ ] Content loads
[ ] All links work
[ ] Forms function
[ ] Images load

Page: ________________
[ ] Header/footer display correctly
[ ] Navigation highlights active page
[ ] Content loads
[ ] All links work
[ ] Forms function
[ ] Images load

Page: ________________
[ ] Header/footer display correctly
[ ] Navigation highlights active page
[ ] Content loads
[ ] All links work
[ ] Forms function
[ ] Images load
```

---

## ✅ FORMS TESTING (if applicable)

For each form (Contact, Prayer Request, etc.):

```
Form: Contact Form

[ ] All fields display correctly
[ ] Required fields marked
[ ] Name field accepts input
[ ] Email field accepts valid emails
[ ] Phone field accepts phone numbers
[ ] Message/textarea field accepts text
[ ] Submit button is clickable
[ ] Success message appears after submit
[ ] Email received on server side
[ ] Form clears after successful submission
[ ] Error message appears if email is invalid
[ ] Can't submit empty required fields
[ ] Mobile: Form is usable on small screen
```

---

## ⚠️ KNOWN ISSUES / BLOCKERS

```
Issue 1: ___________________________________
Status: Fixed [ ] Pending [ ] Won't Fix [ ]
Severity: Critical [ ] High [ ] Medium [ ] Low [ ]

Issue 2: ___________________________________
Status: Fixed [ ] Pending [ ] Won't Fix [ ]
Severity: Critical [ ] High [ ] Medium [ ] Low [ ]
```

---

## 📊 OVERALL ASSESSMENT

```
Date Tested: _______________
Tested By: _______________
Environment: Local [ ] Staging [ ] Production [ ]

Automated Tests: ✅ Pass [ ] Fail [ ]
Responsiveness: ✅ Pass [ ] Fail [ ]
Accessibility: ✅ Pass [ ] Fail [ ]
Performance: ✅ Pass [ ] Fail [ ]
Functionality: ✅ Pass [ ] Fail [ ]

READY FOR DEPLOYMENT? 
[ ] YES - All checks passed
[ ] NO - Fix issues above

Approval: _______________
```

---

## 💡 TIPS

1. **Test methodically** - Go page by page, link by link
2. **Use DevTools** - F12 in Chrome is your best friend
3. **Test on real device** - Mobile emulation isn't perfect
4. **Check console** - F12 → Console tab, should show no errors
5. **Record issues** - Write down every problem found
6. **Fix high priority first** - Broken links, accessibility, then optimization
7. **Re-test after fixes** - Verify fixes don't break other pages
8. **Create screenshots** - Document issues with screenshots
9. **Test performance** - Lighthouse should be ≥ 85
10. **Celebrate success** - When all checks pass, you're ready to deploy!

---

## 🔗 HELPFUL TOOLS

```
Chrome DevTools:     F12
Device Emulation:    Ctrl+Shift+M
axe DevTools:        Chrome Extension
WAVE:               Chrome Extension
Lighthouse:         DevTools → Lighthouse tab
Broken Link Check:   blc http://localhost:3000 -r
Performance:         WebPageTest.org
SEO Audit:          semrush.com or ahrefs.com
Color Contrast:     WebAIM.org/resources/contrastchecker
```

---

**Print this page or copy to a text file. Use before every deployment!**
