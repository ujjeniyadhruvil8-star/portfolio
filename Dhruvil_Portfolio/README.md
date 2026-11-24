# Dhruvil_2603842047_Portfolio

Personal portfolio website for **Dhruvil Ujjeniya** (Roll Number: `2603842047`, Division: `DD`), built using pure **HTML5**, **CSS3**, and **Vanilla JavaScript** for Web Technology academic requirements.

## Project Preview

![Portfolio Preview](images/portfolio-screenshot.png)

## Features

- Semantic HTML5 structure (`header`, `nav`, `main`, `section`, `footer`)
- Responsive dark/light theme toggle with `localStorage` persistence
- Software-engineer background particle & code-symbol canvas animation
- Scroll-triggered reveal animations & active navigation scroll spy
- Interactive project category filters & accessible project detail modal
- Front-end contact form validation with honest static-site feedback
- Accessible keyboard navigation, skip link, and `prefers-reduced-motion` support
- Centralized `PORTFOLIO_DATA` configuration in `script.js` for easy editing

## Folder Structure

```text
Dhruvil_2603842047_Portfolio/
├── index.html
├── style.css
├── script.js
├── README.md
├── assets/
├── images/
│   ├── chemai-preview.jpg
│   ├── hangman-preview.jpg
│   └── portfolio-screenshot.png
├── projects/
│   ├── chemai.html
│   └── hangman.html
└── documents/
    └── README.txt
```

## How to Customize

1. Open `script.js` and edit the `PORTFOLIO_DATA` object at the top of the file to add your GitHub URL, LinkedIn URL, email address, and CV file path.
2. Place your resume PDF inside `documents/` (for example, `documents/Dhruvil_Ujjeniya_CV.pdf`) and set `documents.cvUrl` in `script.js`.
3. Update project details or add new entries inside `index.html` and `PORTFOLIO_DATA.projects`.

## Suggested GitHub Setup (5+ Meaningful Commits)

```bash
git init
git add index.html
git commit -m "feat: add semantic HTML5 portfolio structure"
git add style.css
git commit -m "style: add responsive layout, themes, and animations"
git add script.js
git commit -m "feat: add theme toggle, form validation, and interactive modal"
git add images/ projects/ documents/ assets/
git commit -m "assets: add project illustrations, detail pages, and folder structure"
git add README.md
git commit -m "docs: add README with setup instructions and screenshot"
```
