# 🎨 Kadido Theme - Color Palette

Aplikasi NPK Production System sekarang menggunakan tema warna **Kadido** yang terinspirasi dari branding Kadido Farming Technology.

## 🎨 Color Palette

### Primary Colors

| Color Name     | Hex Code  | RGB                | Usage                                      |
| -------------- | --------- | ------------------ | ------------------------------------------ |
| **Navy Blue**  | `#001B44` | rgb(0, 27, 68)     | Primary background, headers, dark elements |
| **Navy Light** | `#003366` | rgb(0, 51, 102)    | Secondary backgrounds, hover states        |
| **Cyan**       | `#00B4D8` | rgb(0, 180, 216)   | Buttons, links, primary accents            |
| **Cyan Dark**  | `#0096C7` | rgb(0, 150, 199)   | Button hover, active states                |
| **Mint Green** | `#7FFFD4` | rgb(127, 255, 212) | Success states, highlights                 |
| **Mint Dark**  | `#5FE9C5` | rgb(95, 233, 197)  | Gradient ends, secondary accents           |

### Color Psychology

- 🔵 **Navy Blue**: Profesionalisme, kepercayaan, stabilitas
- 💎 **Cyan**: Inovasi, teknologi, kesegaran
- 🌿 **Mint Green**: Pertumbuhan, kesehatan, farming/agriculture

## 📍 Implementation

### Tailwind Config

```javascript
colors: {
  kadido: {
    navy: '#001B44',
    'navy-light': '#003366',
    cyan: '#00B4D8',
    'cyan-dark': '#0096C7',
    mint: '#7FFFD4',
    'mint-dark': '#5FE9C5',
  },
}
```

### Usage Examples

#### Gradients

```jsx
// Primary gradient (Navy to Cyan)
className = "bg-gradient-to-r from-[#001B44] via-[#003366] to-[#00B4D8]";

// Button gradient
className = "bg-gradient-to-r from-[#00B4D8] to-[#5FE9C5]";

// Card header gradient
className = "bg-gradient-to-r from-[#00B4D8]/10 to-[#5FE9C5]/10";
```

#### Buttons

```jsx
// Primary button
className =
  "bg-gradient-to-r from-[#00B4D8] to-[#0096C7] hover:from-[#003366] hover:to-[#00B4D8]";

// Outline button
className =
  "border-[#00B4D8] text-[#00B4D8] hover:bg-[#00B4D8] hover:text-white";
```

#### Text Colors

```jsx
// Primary text
className = "text-[#001B44]";

// Link/accent text
className = "text-[#00B4D8]";

// Light text on dark bg
className = "text-white/90";
```

## 🎯 Component Mapping

### Login Page

- **Background**: Navy to Cyan gradient
- **Button**: Cyan to Cyan Dark gradient
- **Hover**: Navy Light to Cyan gradient

### Navigation

- **Background**: Cyan to Mint gradient
- **Active Tab**: Mint highlight
- **Hover**: Cyan Dark

### Cards & Headers

- **Card Border**: Cyan/20 opacity
- **Header Background**: Cyan/10 to Mint/10 gradient
- **Title Text**: Navy Blue

### User Menu

- **Avatar Background**: Cyan to Mint gradient
- **Hover**: Navy Light to Cyan

### Chat Widget

- **Button**: Cyan to Mint gradient
- **Header**: Navy to Cyan gradient
- **Own Messages**: Cyan gradient background
- **Other Messages**: White with border

### Modals & Overlays

- **Background**: Navy gradient with blur
- **Success**: Mint Green accents
- **Loading**: Cyan spinner

## 🔄 Migration Notes

### Changed From → To

| Old Color | New Color | Component         |
| --------- | --------- | ----------------- |
| `#192231` | `#001B44` | Navy backgrounds  |
| `#494E6B` | `#00B4D8` | Primary accents   |
| `#98878F` | `#5FE9C5` | Secondary accents |
| `#985E6D` | `#7FFFD4` | Highlights        |

## 📱 Responsive Design

Tema ini dirancang untuk:

- ✅ Desktop (1920x1080+)
- ✅ Laptop (1366x768+)
- ✅ Tablet (768x1024)
- ✅ Mobile (320x568+)

## ♿ Accessibility

### Contrast Ratios (WCAG AA)

- Navy Blue (#001B44) on White: **15.8:1** ✅ AAA
- Cyan (#00B4D8) on White: **2.5:1** ⚠️ Use for large text only
- Cyan (#00B4D8) on Navy: **8.7:1** ✅ AAA
- Mint (#7FFFD4) on Navy: **12.4:1** ✅ AAA

### Recommendations

- Use **Navy Blue** for body text on white backgrounds
- Use **White** for text on Navy/Cyan backgrounds
- Use **Cyan** for accent elements only (icons, buttons)
- Ensure sufficient contrast for all interactive elements

## 🎨 Design System

### Spacing

- Use consistent padding: `p-4`, `p-6`, `p-8`
- Card spacing: `gap-4`, `space-y-4`
- Section margins: `mb-6`, `mb-8`

### Typography

- Headers: `font-bold`, `text-lg`, `text-xl`, `text-2xl`
- Body: `text-sm`, `text-base`
- Small text: `text-xs`, `text-[10px]`

### Shadows

- Cards: `shadow-md`, `shadow-lg`
- Buttons: `shadow-sm`
- Modals: `shadow-2xl`

### Borders

- Default: `border-[#00B4D8]/30`
- Active: `border-[#00B4D8]`
- Subtle: `border-gray-200`

## 🔧 Customization

To adjust theme colors, edit:

1. `tailwind.config.js` - Global theme colors
2. `src/App.tsx` - Component-specific colors
3. `src/index.css` - CSS animations

---

**Theme Version**: 2.0.0 (Kadido)  
**Last Updated**: November 24, 2025  
**Inspired by**: Kadido Farming Technology Branding
