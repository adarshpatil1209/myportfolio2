# Adarsh Patil - Professional Portfolio Website

A modern, fully responsive portfolio website built for an AI/ML specialist with a professional dark aesthetic, minimalist design, and high-contrast UI.

## ✨ Features

### Design & Aesthetics
- **Dark Mode Theme**: Pitch-black background (#0A0A0A) with high contrast
- **Mesh Pattern Background**: Subtle, tech-focused geometric texture overlay
- **Professional Teal Accent**: High-contrast teal (#14B8A6) for CTAs and highlights
- **Minimalist Design**: Clean, uncluttered layout with semantic spacing
- **Professional Typography**: Inter font family for optimal readability

### Sections
1. **Navigation Bar**: Fixed, sticky navigation with smooth transitions
   - Quick links to all sections (About, Skills, Projects, Contact)
   - "Get in Touch" CTA button
   - Mobile-responsive hamburger menu

2. **Hero Section**: Compelling introduction
   - Large, bold heading with name
   - Subtitle with education details
   - Tagline describing expertise
   - Dual CTA buttons (Explore Projects, Get in Touch)

3. **About Me Section**: Personal introduction with picture placeholder
   - 2-column grid layout (responsive)
   - Engaging biography highlighting education and passion
   - Growth-oriented narrative

4. **Skills & Expertise Section**: 3-column card layout
   - **Technical Skills**: C, HTML/CSS, Web Dev, AI/ML, Responsive UI
   - **AI & ML**: ML Foundations, Model Experimentation, Problem Solving
   - **Soft Skills**: Communication, Critical Thinking, Teamwork, Leadership
   - Hover effects with teal accent borders and shadows

5. **Featured Projects Section**: Grid showcase of work
   - Project cards with descriptions and tags
   - Placeholder images with icons
   - Links to full project details
   - Smooth hover animations

6. **Contact Section**: Call-to-action and communication hub
   - Contact information (Email, LinkedIn, GitHub)
   - Functional contact form (Name, Email, Message)
   - Form validation and user feedback
   - Professional icon integration

7. **Footer**: Copyright and site info

### Interactive Features
- ✅ Smooth scroll navigation
- ✅ Mobile menu toggle
- ✅ Form validation
- ✅ Hover animations and effects
- ✅ Intersection Observer for fade-in animations
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Accessibility support (keyboard navigation, high contrast)
- ✅ Active nav link highlighting on scroll
- ✅ Reduced motion support for accessibility

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools required - pure HTML, CSS, and JavaScript

### Installation & Running

#### Option 1: Direct Browser Open
Simply open `index.html` in your browser:
```bash
cd /workspaces/myportfolio2
open index.html  # macOS
# or
start index.html  # Windows
# or
xdg-open index.html  # Linux
```

#### Option 2: Local Server (Recommended)
```bash
cd /workspaces/myportfolio2

# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Node.js (if installed)
npx http-server
```

Then open: `http://localhost:8000`

#### Option 3: Using npm scripts
```bash
npm run start
# or
npm run dev
```

## 📁 Project Structure

```
myportfolio2/
├── index.html          # Main HTML file with all content and structure
├── styles.css          # Custom CSS with dark theme, mesh pattern, animations
├── script.js           # JavaScript for interactivity and smooth scrolling
├── package.json        # Project metadata
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

## 🎨 Customization

### Colors & Theme
Edit the color values in `styles.css` and `index.html`:
- **Primary Black**: `#0A0A0A`
- **Accent Teal**: `#14B8A6` (hex) or `#1E8449` for darker variant
- **Secondary Text**: `#E0E0E0` or `rgb(209, 213, 219)`

### Content Personalization
1. **Replace in `index.html`**:
   - Name: "Adarsh Patil"
   - Email: "adarshpatil862@gmail.com"
   - LinkedIn/GitHub URLs
   - Project descriptions and links
   - About me text

2. **Update Profile Picture**:
   - Replace the placeholder icon with an actual image:
   ```html
   <img src="your-image.jpg" alt="Profile" class="rounded-2xl">
   ```

### Font Customization
Change the font in `styles.css`:
```css
* {
    font-family: 'Your Font', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (full-width, stacked layout)
- **Tablet**: 640px - 1024px (grid adjustments)
- **Desktop**: > 1024px (full multi-column layout)

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ High contrast colors (WCAG AA compliant)
- ✅ Focus indicators on interactive elements
- ✅ Reduced motion support (`prefers-reduced-motion`)
- ✅ Alt text for images
- ✅ Proper heading hierarchy

## 📊 Performance Optimizations

- No external JavaScript libraries (vanilla JS only)
- Single CSS file (no build process needed)
- Minimal HTTP requests
- Optimized animations using CSS transforms
- Intersection Observer for efficient animations
- Lazy loading support-ready

## 🔗 External Dependencies

- **Tailwind CSS CDN**: For utility classes
- **Google Fonts**: Inter typeface
- **Font Awesome 6.4**: Icons for skills and contact

All loaded via CDN - no npm install needed!

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Custom styles, animations, grid, flexbox
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: No frameworks or libraries
- **Font Awesome**: Icon library

## 📝 Form Handling

The contact form currently:
- Validates name, email, and message
- Provides visual feedback on submission
- Shows success/error messages
- Resets form after successful submission

**To make it functional**, integrate with:
- Backend API (Node.js, Python, PHP, etc.)
- Email service (SendGrid, Mailgun, AWS SES)
- Form backend service (Formspree, Basin, EmailJS)

Example with EmailJS:
```javascript
// Add EmailJS CDN and update the form handler
```

## 🚀 Deployment

### GitHub Pages
```bash
git add .
git commit -m "Initial portfolio"
git push origin main
```
Then enable GitHub Pages in repository settings.

### Netlify
- Drag and drop the folder, or
- Connect GitHub repository for auto-deployment

### Vercel
- Import the repository
- Deploy in one click

### Traditional Hosting
- Upload files via FTP to any web host
- Works on any server with HTTP support

## 🐛 Troubleshooting

### Issues with Colors or Styling
- Clear browser cache (Ctrl+Shift+Delete)
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check if Tailwind CDN is loaded

### Mobile Menu Not Working
- Ensure JavaScript is enabled
- Check browser console for errors (F12)

### Form Not Submitting
- Currently is a demo - see "Form Handling" section above
- Check browser console for validation errors

### Smooth Scroll Not Working
- Check if `scroll-behavior: smooth` is supported
- Fallback to JavaScript scroll works in all browsers

## 📄 License

MIT License - Feel free to use this portfolio as a template!

## 👤 Author

**Adarsh Patil**
- Email: adarshpatil862@gmail.com
- GitHub: [adarshpatil1209](https://github.com/adarshpatil1209)
- Portfolio: This website!

## 🤝 Contributing

Feel free to fork this repository and customize it for your own portfolio!

## 📞 Support & Contact

For questions or suggestions, reach out via:
- Email: adarshpatil862@gmail.com
- GitHub Issues: [Create an issue](https://github.com/adarshpatil1209/myportfolio2/issues)

---

**Built with ❤️ for the AI/ML community**

*Last updated: November 2025*
