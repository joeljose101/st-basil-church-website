# Image Optimization Testing Guide
## St. Basil Church Website

This guide teaches how to test and optimize images for web.

---

## WHY IMAGE OPTIMIZATION MATTERS

- **Faster Loading**: Optimized images reduce page load time by 40-60%
- **Lower Bandwidth**: Saves data for mobile users (important for members on limited plans)
- **Better SEO**: Fast pages rank higher in Google
- **Better UX**: Users won't wait for slow pages to load
- **Accessibility**: Proper alt text helps screen readers

---

## IMAGE FORMATS FOR WEB

### WEBP (Modern, Best)
- 25-35% smaller than JPEG
- Supports transparency (like PNG)
- Supported by: Chrome, Firefox, Edge, Safari 16+
- **Use for**: Photos, complex images

### JPEG
- Good for photos and complex images
- Large file sizes
- No transparency
- **Use for**: Fallback for older browsers

### PNG
- Good for graphics, logos, screenshots
- Supports transparency
- Larger than JPEG
- **Use for**: Icons, logos, screenshots with transparency

### SVG
- Scalable, never blurry
- Smallest for simple graphics
- **Use for**: Icons, logos, simple illustrations

### WebP with JPEG Fallback (Best Practice)
```html
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description">
</picture>
```

---

## TESTING IMAGE OPTIMIZATION

### 1. File Size Check

```bash
# Check original image size
# Windows: Right-click file → Properties → Size
# Mac: Right-click file → Get Info → Size

# Goal:
- Hero images: < 500KB
- Content images: < 200KB
- Thumbnails: < 100KB
- Icons: < 50KB
```

### 2. Dimension Check

Never use oversized images. Example:
```
❌ Bad: 4000x3000px image on a 400x300px display
✅ Good: Save as 800x600px (2x for retina displays)
```

**Testing Steps:**
```
1. Open DevTools (F12)
2. Right-click image → Inspect
3. Note width/height in pixels
4. Calculate image file size ÷ (width × height)
5. Should be < 1KB per pixel for photos
```

### 3. Visual Quality Test

```
1. View image full size
2. Check for:
   [ ] Clarity (not blurry)
   [ ] Colors (not washed out)
   [ ] No visible compression artifacts
   [ ] Text readable (if present)
   [ ] Details clear
```

### 4. Load Time Test

```bash
# Check in DevTools Network tab:
1. Open DevTools (F12)
2. Click "Network" tab
3. Reload page (Ctrl+R)
4. Find images in list
5. Check "Size" column
6. Total images should be < 5MB for entire page
```

### 5. Format Check

```
1. Right-click image → Inspect
2. Check src attribute
3. Verify format: .webp (modern), .jpg (fallback), .png (if needed)
```

---

## OPTIMIZING IMAGES

### Option 1: Online Tools (Easiest - No Installation)

**TinyPNG/TinyJPG**
```
1. Visit tinypng.com or tinyjpg.com
2. Upload image
3. Download optimized version
4. Saves 50-80% file size!
```

**ImageOptim Online**
```
1. Visit imageoptim.com
2. Upload image
3. Download optimized
```

**Squoosh (Google)**
```
1. Visit squoosh.app
2. Upload image
3. Adjust quality slider
4. Download optimized
5. Try different formats (WebP, JPEG, etc.)
```

### Option 2: Command Line Tools (Advanced)

**Install ImageMagick**
```bash
# Windows (using Chocolatey):
choco install imagemagick

# Mac (using Homebrew):
brew install imagemagick

# Then convert image:
convert input.jpg -quality 85 -resize 1920x1080 output.jpg
```

**Install CJPEG/WebP Tools**
```bash
# Convert to WebP
cwebp input.jpg -o output.webp -quality 80

# Compress JPEG
cjpeg -quality 85 input.jpg > output.jpg
```

### Option 3: Next.js Built-in Optimization

```javascript
// pages/index.js
import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/church.jpg"
      alt="St. Basil Church"
      width={800}
      height={600}
      priority={true}  // Load early
      placeholder="blur"  // Show blurred while loading
    />
  )
}
```

Next.js automatically:
- Serves WebP to modern browsers
- Resizes images for different devices
- Lazy loads images below the fold
- Compresses images

---

## IMAGE OPTIMIZATION WORKFLOW

### Step 1: Export from Design (Figma, Photoshop, etc.)

```
[ ] Save as PNG first (preserves quality)
[ ] Set size to 2x intended display size
[ ] Example: For 600px wide display, export 1200px wide
```

### Step 2: Optimize with Tool

```bash
# Use TinyPNG or Squoosh
1. Upload PNG
2. Download JPEG version (usually smaller)
3. Save both JPEG and PNG versions
```

### Step 3: Convert to WebP

```bash
# Using command line
cwebp image.jpg -o image.webp -quality 80

# Or use Squoosh.app:
1. Upload JPEG
2. Select "WebP" format
3. Set quality to 75-80
4. Download
```

### Step 4: Create Picture Element

```html
<!-- In your Next.js component -->
<picture>
  <source srcset="/images/church.webp" type="image/webp">
  <source srcset="/images/church.jpg" type="image/jpeg">
  <img src="/images/church.jpg" alt="St. Basil Church exterior">
</picture>

<!-- Or use Next.js Image component -->
<Image
  src="/church.jpg"
  alt="St. Basil Church"
  width={800}
  height={600}
  quality={80}
/>
```

### Step 5: Test

```
1. View in browser
2. Check DevTools Network tab
3. Verify image loads (not broken)
4. Check file size
5. Visual quality should look good
```

---

## IMAGE TESTING CHECKLIST

For each image on your site:

```
Image File: _____________________

[ ] File exists and loads
[ ] File size is appropriate (< 200KB for content images)
[ ] Format is correct (WebP > JPEG > PNG)
[ ] Dimensions match display size (not oversized)
[ ] Alt text present and descriptive
[ ] Visual quality is good (not blurry)
[ ] No compression artifacts visible
[ ] Loads quickly (< 2 seconds)
[ ] Responsive (looks good on mobile)
[ ] SEO: Filename is descriptive (not IMG_2024.jpg)
[ ] Accessibility: Alt text describes image
```

---

## LIGHTHOUSE IMAGE AUDIT

### Run Lighthouse Report

```
1. Open DevTools (F12)
2. Click "Lighthouse" tab
3. Select "Performance"
4. Click "Analyze page load"
5. Under "Diagnostics", check "Properly sized images"
6. Under "Opportunities", check "Serve images in next-gen formats"
```

### Common Issues

**"Properly sized images"**
- Images are larger than display size
- **Fix**: Resize images to match CSS dimensions

**"Serve images in next-gen formats"**
- Using JPEG instead of WebP
- **Fix**: Convert to WebP using squoosh.app or cwebp

**"Defer offscreen images"**
- Images load before viewport
- **Fix**: Add lazy loading
```html
<img src="image.jpg" loading="lazy" alt="...">
```

---

## RESPONSIVE IMAGES

### Problem
Same image on desktop (1920px) and mobile (320px) wastes bandwidth.

### Solution: Responsive Image Syntax

```html
<!-- Show different images on different screen sizes -->
<picture>
  <!-- Large screen (1920px+) -->
  <source srcset="/church-large.jpg 1920w" media="(min-width: 1200px)">
  <!-- Medium screen (768px-1199px) -->
  <source srcset="/church-medium.jpg 768w" media="(min-width: 768px)">
  <!-- Mobile (< 768px) -->
  <source srcset="/church-small.jpg 320w">
  <!-- Fallback -->
  <img src="/church-medium.jpg" alt="St. Basil Church">
</picture>
```

### Using Next.js (Easier)

```javascript
import Image from 'next/image'

export default function ChurchPhoto() {
  return (
    <Image
      src="/church.jpg"
      alt="St. Basil Church"
      width={1200}
      height={800}
      responsive={true}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

---

## LAZY LOADING

### Problem
All images load even if user never scrolls down.

### Solution: Lazy Load Images Below Fold

```html
<!-- Load image only when user scrolls to it -->
<img src="image.jpg" loading="lazy" alt="Description">
```

### Next.js Lazy Loading

```javascript
import Image from 'next/image'

export default function Home() {
  return (
    <Image
      src="/image.jpg"
      alt="Description"
      width={800}
      height={600}
      loading="lazy"  // Don't load until user scrolls
    />
  )
}
```

---

## IMAGE COMPRESSION SETTINGS

### JPEG Quality Settings

```
Quality 90-100:  Near lossless, large file (150-200KB for web)
Quality 80-89:   High quality, good size (100-150KB)
Quality 70-79:   Good quality, smaller size (50-100KB) ← RECOMMENDED
Quality 60-69:   Acceptable, small size (30-50KB)
Quality < 60:    Visible artifacts, very small size (avoid)
```

**Recommendation**: Use quality 75-80 for JPEG

### PNG Optimization

```
Tool: PNGQuant (reduces colors while preserving quality)
Usage: pngquant 256 image.png -o image-compressed.png

Result: Usually 50-70% smaller than original
```

### WebP Compression

```
Quality 80: Good balance of size and quality (RECOMMENDED)

cwebp image.jpg -o image.webp -quality 80 -m 6
```

---

## EXAMPLE: OPTIMIZE HERO IMAGE

### Before Optimization
```
File: hero-image.jpg
Size: 2.5MB
Dimensions: 4000 x 2667px
Display size: 1200 x 800px (wasting space!)
Format: JPEG only (no WebP)
```

### After Optimization
```
File 1: hero-image.webp
Size: 180KB (85% smaller!)
Dimensions: 1200 x 800px (perfect for web)

File 2: hero-image.jpg (fallback)
Size: 220KB (92% smaller)
Dimensions: 1200 x 800px

Result:
- Hero loads in 0.2s instead of 3s
- Users on slow connection save 2.28MB
- Lighthouse score improves significantly
```

### Optimization Steps

```bash
1. Export from Photoshop as 1200x800px PNG
2. Open squoosh.app
3. Upload PNG
4. Download JPEG (80 quality)
5. Use squoosh to convert to WebP (80 quality)
6. Create <picture> tag with WebP + JPEG
7. Test in browser
8. Verify Lighthouse scores improved
```

---

## TOOLS & RESOURCES

| Tool | Purpose | Cost | Link |
|------|---------|------|------|
| TinyPNG | Compress JPEG/PNG | Free | tinypng.com |
| Squoosh | Web-based optimizer | Free | squoosh.app |
| ImageOptim | Mac image optimizer | Free | imageoptim.com |
| CWEBP | CLI WebP converter | Free | developers.google.com/speed/webp |
| FFmpeg | Image/video tools | Free | ffmpeg.org |
| Next.js Image | Auto optimization | Free | nextjs.org/docs/api-reference/next/image |
| Lighthouse | Performance audit | Free | Chrome DevTools |

---

## QUICK REFERENCE

```
JPEG Quality: 75-80 (good balance)
PNG: Use TinyPNG.com
WebP: Use Squoosh.app
Next.js: Use <Image> component
Lazy load: loading="lazy"
Display size: 2x device size (600px image on 300px display)
Mobile image: Same source, sized by CSS
File size goal: < 200KB for content images

Test in DevTools (F12):
- Network tab: Check file sizes
- Lighthouse: Check performance score
- Console: Check for broken images
```

---

## NEXT STEPS

1. ✅ Audit current images on website
2. ✅ Identify oversized images
3. ✅ Compress using TinyPNG or Squoosh
4. ✅ Convert to WebP format
5. ✅ Update HTML with <picture> tags
6. ✅ Test in browser
7. ✅ Run Lighthouse
8. ✅ Celebrate 20+ point improvement!

---

**Result: Faster website = Happier users = Better SEO!**
