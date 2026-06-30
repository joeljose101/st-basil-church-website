# Automated Testing Examples
## Jest & React Testing Library Setup for St. Basil Church Website

This guide shows how to write automated tests for your website components and pages.

---

## SETUP (One-time)

### Install Dependencies

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event jest-environment-jsdom
```

### Create jest.config.js

Create file: `jest.config.js`

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
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

### Create jest.setup.js

Create file: `jest.setup.js`

```javascript
import '@testing-library/jest-dom'
```

### Update package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Create tests directory

```bash
mkdir -p tests
```

---

## RUNNING TESTS

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-run on file changes)
npm test:watch

# Generate coverage report (% of code tested)
npm test:coverage
```

---

## TEST EXAMPLES

### Test 1: Responsive Navigation

Create file: `tests/navigation.test.js`

```javascript
import { render, screen, fireEvent } from '@testing-library/react'
import Navigation from '@/components/Navigation'

describe('Navigation Component', () => {
  describe('Desktop Navigation', () => {
    test('displays all menu items', () => {
      render(<Navigation />)
      
      expect(screen.getByText('Home')).toBeInTheDocument()
      expect(screen.getByText('About')).toBeInTheDocument()
      expect(screen.getByText('Services')).toBeInTheDocument()
      expect(screen.getByText('Contact')).toBeInTheDocument()
    })

    test('menu links are clickable', () => {
      render(<Navigation />)
      const homeLink = screen.getByRole('link', { name: /home/i })
      
      expect(homeLink).toHaveAttribute('href', '/')
      expect(homeLink).toBeInTheDocument()
    })
  })

  describe('Mobile Navigation', () => {
    test('hamburger menu exists on small screens', () => {
      // Set viewport to mobile size
      global.innerWidth = 375
      global.dispatchEvent(new Event('resize'))
      
      render(<Navigation />)
      const hamburgerButton = screen.getByRole('button', { name: /menu/i })
      
      expect(hamburgerButton).toBeInTheDocument()
    })

    test('hamburger menu toggles navigation', () => {
      global.innerWidth = 375
      render(<Navigation />)
      
      const hamburgerButton = screen.getByRole('button', { name: /menu/i })
      const navMenu = screen.getByRole('navigation')
      
      // Initially hidden
      expect(navMenu).not.toHaveClass('open')
      
      // Click hamburger
      fireEvent.click(hamburgerButton)
      
      // Now visible
      expect(navMenu).toHaveClass('open')
      
      // Click again to close
      fireEvent.click(hamburgerButton)
      
      // Hidden again
      expect(navMenu).not.toHaveClass('open')
    })
  })
})
```

### Test 2: Contact Form Validation

Create file: `tests/contact-form.test.js`

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from '@/components/ContactForm'

describe('Contact Form', () => {
  test('renders all form fields', () => {
    render(<ContactForm />)
    
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()
  })

  test('shows error when name is empty', async () => {
    render(<ContactForm />)
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
  })

  test('shows error for invalid email', async () => {
    render(<ContactForm />)
    
    const emailInput = screen.getByLabelText(/email/i)
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/valid email/i)).toBeInTheDocument()
    })
  })

  test('submits form with valid data', async () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    const emailInput = screen.getByLabelText(/email/i)
    const messageInput = screen.getByLabelText(/message/i)
    const submitButton = screen.getByRole('button', { name: /submit/i })
    
    fireEvent.change(nameInput, { target: { value: 'John Smith' } })
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } })
    fireEvent.change(messageInput, { target: { value: 'Hello, I have a question.' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument()
    })
  })

  test('form resets after successful submission', async () => {
    render(<ContactForm />)
    
    const nameInput = screen.getByLabelText(/name/i)
    fireEvent.change(nameInput, { target: { value: 'John Smith' } })
    
    expect(nameInput.value).toBe('John Smith')
    
    const submitButton = screen.getByRole('button', { name: /submit/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
    })
  })
})
```

### Test 3: Accessibility (axe-core)

Create file: `tests/accessibility.test.js`

```javascript
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import HomePage from '@/pages/index'

// Add axe matcher
expect.extend(toHaveNoViolations)

// First: npm install --save-dev jest-axe

describe('Accessibility', () => {
  test('HomePage has no accessibility violations', async () => {
    const { container } = render(<HomePage />)
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  test('all images have alt text', () => {
    const { container } = render(<HomePage />)
    
    const images = container.querySelectorAll('img')
    images.forEach(img => {
      expect(img).toHaveAttribute('alt')
      expect(img.getAttribute('alt')).not.toBe('')
    })
  })

  test('all form inputs have labels', () => {
    const { container } = render(<HomePage />)
    
    const inputs = container.querySelectorAll('input, textarea, select')
    inputs.forEach(input => {
      const label = container.querySelector(`label[for="${input.id}"]`)
      expect(label).toBeInTheDocument()
    })
  })

  test('heading hierarchy is correct', () => {
    const { container } = render(<HomePage />)
    
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    let previousLevel = 0
    
    headings.forEach(heading => {
      const currentLevel = parseInt(heading.tagName[1])
      // Don't skip heading levels (h1 > h3 is bad)
      expect(currentLevel - previousLevel).toBeLessThanOrEqual(1)
      previousLevel = currentLevel
    })
  })
})
```

### Test 4: Links and Navigation

Create file: `tests/links.test.js`

```javascript
import { render, screen } from '@testing-library/react'
import HomePage from '@/pages/index'

describe('Links', () => {
  test('all internal links have href attribute', () => {
    const { container } = render(<HomePage />)
    
    const links = container.querySelectorAll('a')
    links.forEach(link => {
      expect(link).toHaveAttribute('href')
    })
  })

  test('no links have empty href', () => {
    const { container } = render(<HomePage />)
    
    const links = container.querySelectorAll('a')
    links.forEach(link => {
      const href = link.getAttribute('href')
      expect(href).not.toBe('')
      expect(href).not.toBe('#')
    })
  })

  test('external links have descriptive text', () => {
    const { container } = render(<HomePage />)
    
    const externalLinks = container.querySelectorAll('a[href^="http"]')
    externalLinks.forEach(link => {
      expect(link.textContent).not.toBe('Click here')
      expect(link.textContent).not.toBe('Link')
      expect(link.textContent.length).toBeGreaterThan(0)
    })
  })

  test('mailto links work', () => {
    const { container } = render(<HomePage />)
    
    const mailtoLinks = container.querySelectorAll('a[href^="mailto:"]')
    expect(mailtoLinks.length).toBeGreaterThan(0)
    
    mailtoLinks.forEach(link => {
      expect(link.href).toMatch(/^mailto:/)
    })
  })
})
```

### Test 5: Performance / Image Optimization

Create file: `tests/performance.test.js`

```javascript
import { render } from '@testing-library/react'
import HomePage from '@/pages/index'

describe('Performance', () => {
  test('uses optimized image formats', () => {
    const { container } = render(<HomePage />)
    
    const images = container.querySelectorAll('img, picture')
    // Check for WebP support via picture tag
    const pictureElements = container.querySelectorAll('picture')
    
    pictureElements.forEach(picture => {
      const sources = picture.querySelectorAll('source')
      const hasWebP = Array.from(sources).some(s => 
        s.getAttribute('type') === 'image/webp'
      )
      expect(hasWebP).toBe(true)
    })
  })

  test('images have lazy loading attribute', () => {
    const { container } = render(<HomePage />)
    
    const images = container.querySelectorAll('img')
    images.forEach((img, index) => {
      // First image (hero) should have priority/eager loading
      // Other images should have lazy loading
      if (index === 0) {
        const loading = img.getAttribute('loading')
        expect(['eager', null]).toContain(loading)
      } else {
        expect(img.getAttribute('loading')).toBe('lazy')
      }
    })
  })

  test('no inline styles (use CSS classes instead)', () => {
    const { container } = render(<HomePage />)
    
    const elementsWithInlineStyles = container.querySelectorAll('[style]')
    // Allow some inline styles, but not too many
    expect(elementsWithInlineStyles.length).toBeLessThan(5)
  })
})
```

### Test 6: SEO Metadata

Create file: `tests/seo.test.js`

```javascript
import { render } from '@testing-library/react'
import HomePage from '@/pages/index'

describe('SEO', () => {
  test('page has title tag', () => {
    render(<HomePage />)
    
    expect(document.title).toBeTruthy()
    expect(document.title.length).toBeGreaterThan(5)
    expect(document.title.length).toBeLessThan(60)
  })

  test('page has meta description', () => {
    render(<HomePage />)
    
    const description = document.querySelector('meta[name="description"]')
    expect(description).toBeInTheDocument()
    expect(description?.getAttribute('content')).toBeTruthy()
    expect(description?.getAttribute('content')?.length).toBeGreaterThan(50)
  })

  test('page has Open Graph tags', () => {
    render(<HomePage />)
    
    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    const ogImage = document.querySelector('meta[property="og:image"]')
    
    expect(ogTitle).toBeInTheDocument()
    expect(ogDescription).toBeInTheDocument()
    expect(ogImage).toBeInTheDocument()
  })

  test('page has canonical URL', () => {
    render(<HomePage />)
    
    const canonical = document.querySelector('link[rel="canonical"]')
    expect(canonical).toBeInTheDocument()
    expect(canonical?.getAttribute('href')).toBeTruthy()
  })

  test('heading structure starts with h1', () => {
    const { container } = render(<HomePage />)
    
    const firstHeading = container.querySelector('h1')
    expect(firstHeading).toBeInTheDocument()
  })
})
```

---

## RUNNING SPECIFIC TESTS

```bash
# Run only navigation tests
npm test -- navigation.test.js

# Run only tests matching "form"
npm test -- --testNamePattern="form"

# Run in watch mode (re-run on file changes)
npm test:watch

# Generate coverage report
npm test:coverage
```

---

## EXAMPLE OUTPUT

```bash
$ npm test

 PASS  tests/navigation.test.js
  Navigation Component
    Desktop Navigation
      ✓ displays all menu items (45ms)
      ✓ menu links are clickable (22ms)
    Mobile Navigation
      ✓ hamburger menu exists on small screens (18ms)
      ✓ hamburger menu toggles navigation (35ms)

 PASS  tests/contact-form.test.js
  Contact Form
    ✓ renders all form fields (28ms)
    ✓ shows error when name is empty (52ms)
    ✓ shows error for invalid email (48ms)
    ✓ submits form with valid data (61ms)
    ✓ form resets after successful submission (44ms)

 PASS  tests/accessibility.test.js
  Accessibility
    ✓ HomePage has no accessibility violations (128ms)
    ✓ all images have alt text (15ms)
    ✓ all form inputs have labels (12ms)
    ✓ heading hierarchy is correct (18ms)

 PASS  tests/links.test.js
  Links
    ✓ all internal links have href attribute (22ms)
    ✓ no links have empty href (19ms)
    ✓ external links have descriptive text (25ms)
    ✓ mailto links work (18ms)

 PASS  tests/performance.test.js
  Performance
    ✓ uses optimized image formats (31ms)
    ✓ images have lazy loading attribute (24ms)
    ✓ no inline styles (21ms)

 PASS  tests/seo.test.js
  SEO
    ✓ page has title tag (15ms)
    ✓ page has meta description (14ms)
    ✓ page has Open Graph tags (22ms)
    ✓ page has canonical URL (18ms)
    ✓ heading structure starts with h1 (16ms)

Test Suites: 6 passed, 6 total
Tests:       34 passed, 34 total
Snapshots:   0 total
Time:        8.542s
```

---

## CONTINUOUS INTEGRATION (CI)

### GitHub Actions Setup

Create file: `.github/workflows/tests.yml`

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - run: npm install
      
      - run: npm run lint
      
      - run: npm run build
      
      - run: npm test -- --coverage
      
      - uses: codecov/codecov-action@v2
        with:
          files: ./coverage/coverage-final.json
```

---

## TESTING BEST PRACTICES

1. **Test User Behavior** - Test what users do, not implementation details
2. **Use Semantic Queries** - Use `getByRole`, `getByLabelText`, not `getByTestId`
3. **Test Accessibility** - Use axe-core to catch violations automatically
4. **Test Happy Path First** - Test successful scenarios before error cases
5. **Avoid Implementation Details** - Don't test internal state, test outputs
6. **Keep Tests Simple** - One test should test one thing
7. **Use Descriptive Names** - Test name should explain what's being tested
8. **Mock Slowly** - Only mock when necessary (API calls, timers, etc.)

---

## GOOD TEST NAMES

```javascript
// ✅ Good - Clear what's being tested
test('displays success message after form submission')
test('hamburger menu closes when link is clicked')
test('email validation rejects invalid format')

// ❌ Bad - Unclear what's being tested
test('works')
test('component renders')
test('test form')
```

---

## NEXT STEPS

1. ✅ Run `npm install` for testing dependencies
2. ✅ Create `jest.config.js` and `jest.setup.js`
3. ✅ Create `tests/` directory
4. ✅ Copy test examples from this guide
5. ✅ Run `npm test` to verify
6. ✅ Add more tests for your specific components
7. ✅ Run `npm test:coverage` to see coverage
8. ✅ Set up GitHub Actions for CI/CD

---

**Result: Automated tests catch bugs before deployment!**
