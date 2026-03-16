// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('Portfolio Website Tests', () => {
  
  // Run before each test - navigate to homepage
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test.describe('Page Load and Structure', () => {
    
    test('has correct title and logo', async ({ page }) => {
      await expect(page).toHaveTitle('Anas Bougraine | Portfolio');
      await expect(page.getByText('Anas Bougraine').first()).toBeVisible();
    });

    test('displays all navigation links', async ({ page }) => {
      await expect(page.locator('nav').getByRole('link', { name: 'Home' })).toBeVisible();
      await expect(page.locator('nav').getByRole('link', { name: 'About' })).toBeVisible();
      await expect(page.locator('nav').getByRole('link', { name: 'Skills' })).toBeVisible();
      await expect(page.locator('nav').getByRole('link', { name: 'Projects' })).toBeVisible();
      await expect(page.locator('nav').getByRole('link', { name: 'Contact' })).toBeVisible();
    });

    test('has all main sections present', async ({ page }) => {
      await expect(page.locator('.home')).toBeVisible();
      await expect(page.locator('#about')).toBeVisible();
      await expect(page.locator('#skills')).toBeVisible();
      await expect(page.locator('#projects')).toBeVisible();
      await expect(page.locator('#contact')).toBeVisible();
    });

    test('has proper heading hierarchy', async ({ page }) => {
      // Should have only one h1
      const h1Count = await page.getByRole('heading', { level: 1 }).count();
      expect(h1Count).toBe(1);
      
      // Should have multiple h2 headings
      const h2Count = await page.getByRole('heading', { level: 2 }).count();
      expect(h2Count).toBeGreaterThan(0);
    });

    test('loads external CSS and JavaScript files', async ({ page }) => {
      const cssLink = page.locator('link[href="src/styles.css"]');
      await expect(cssLink).toHaveAttribute('rel', 'stylesheet');
      
      const scriptTag = page.locator('script[src="src/script.js"]');
      await expect(scriptTag).toHaveCount(1);
    });

    test('has proper meta tags', async ({ page }) => {
      const charset = await page.locator('meta[charset]').getAttribute('charset');
      expect(charset).toBe('UTF-8');
      
      const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
      expect(viewport).toContain('width=device-width');
    });
  });

  test.describe('Home Section', () => {
    
    test('displays profile image', async ({ page }) => {
      const profileImg = page.locator('.home-img img');
      await expect(profileImg).toBeVisible();
      await expect(profileImg).toHaveAttribute('src', 'assets/me.jpeg');
      await expect(profileImg).toHaveAttribute('alt', 'Anas Bougraine');
    });

    test('displays typing animation', async ({ page }) => {
      const typingText = page.locator('.typing-text');
      await expect(typingText).toBeVisible();
      
      // Wait for typing effect and verify text appears
      await page.waitForTimeout(2000);
      const text = await typingText.textContent();
      expect(text).toBeTruthy();
      expect(text?.length).toBeGreaterThan(0);
    });

    test('displays social media links', async ({ page }) => {
      const linkedinLink = page.locator('.social-icons a[href*="linkedin"]');
      const githubLink = page.locator('.social-icons a[href*="github"]');
      
      await expect(linkedinLink).toBeVisible();
      await expect(githubLink).toBeVisible();
    });

    test('has working Contact Me button', async ({ page }) => {
      const contactBtn = page.getByRole('link', { name: 'Contact me' });
      await expect(contactBtn).toBeVisible();
      
      await contactBtn.click();
      await page.waitForTimeout(1000);
      
      // Should scroll to contact section
      await expect(page.locator('#contact')).toBeInViewport();
    });
  });

  test.describe('Navigation', () => {
    
    test('navigates to About section', async ({ page }) => {
      await page.getByRole('link', { name: 'About' }).click();
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#about')).toBeInViewport();
    });

    test('navigates to Skills section', async ({ page }) => {
      await page.getByRole('link', { name: 'Skills' }).click();
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#skills')).toBeInViewport();
    });

    test('navigates to Projects section', async ({ page }) => {
      await page.getByRole('link', { name: 'Projects' }).click();
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#projects')).toBeInViewport();
    });

    test('navigates to Contact section', async ({ page }) => {
      await page.locator('nav').getByRole('link', { name: 'Contact' }).click();
      await page.waitForTimeout(1000);
      
      await expect(page.locator('#contact')).toBeInViewport();
    });
  });

  test.describe('Skills Section', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.getByRole('link', { name: 'Skills' }).click();
      await page.waitForTimeout(1000);
    });

    test('displays all skill categories', async ({ page }) => {
      await expect(page.getByRole('heading', { name: 'Languages' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Web Development' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'DevOps & Tools' })).toBeVisible();
    });

    test('displays skill items', async ({ page }) => {
      await expect(page.locator('#skills').getByText('Python').first()).toBeVisible();
      await expect(page.locator('#skills').getByText('Java').first()).toBeVisible();
      await expect(page.locator('#skills').getByText('JavaScript').first()).toBeVisible();
    });
  });

  test.describe('Projects Section', () => {
    
    test('displays project titles and tech stacks', async ({ page }) => {
      await page.getByRole('link', { name: 'Projects' }).click();
      await page.waitForTimeout(1000);
      
      await expect(page.getByText('🏥 HealthNexus')).toBeVisible();
      await expect(page.getByText('🛡️ CyberGuard')).toBeVisible();
      await expect(page.getByText('📡 QAM Modem Design')).toBeVisible();
      await expect(page.getByText('🔄 Modulation Techniques')).toBeVisible();
    });

    test('displays project preview on hover', async ({ page }) => {
      await page.getByRole('link', { name: 'Projects' }).click();
      await page.waitForTimeout(1000);
      
      const projectItem = page.locator('.project-item').first();
      const projectPreview = page.locator('.project-preview');
      
      await projectItem.hover();
      await page.waitForTimeout(500);
      
      await expect(projectPreview).toHaveClass(/active/);
    });
  });

  test.describe('Contact Section', () => {
    
    test.beforeEach(async ({ page }) => {
      await page.locator('nav').getByRole('link', { name: 'Contact' }).click();
      await page.waitForTimeout(1000);
    });

    test('displays contact information', async ({ page }) => {
      await expect(page.locator('.contact-item').filter({ hasText: '+212' })).toBeVisible();
      await expect(page.locator('.contact-item').filter({ hasText: 'anassbougraine644@gmail.com' })).toBeVisible();
      await expect(page.locator('.contact-item').filter({ hasText: 'Tetouan' })).toBeVisible();
      await expect(page.locator('.contact-item').filter({ hasText: 'ENSA Tétouan' })).toBeVisible();
    });

    test('displays contact icons', async ({ page }) => {
      const phoneIcon = page.locator('.contact-item .fa-phone');
      const emailIcon = page.locator('.contact-item .fa-envelope');
      const locationIcon = page.locator('.contact-item .fa-map-marker-alt');
      const schoolIcon = page.locator('.contact-item .fa-graduation-cap');
      
      await expect(phoneIcon).toBeVisible();
      await expect(emailIcon).toBeVisible();
      await expect(locationIcon).toBeVisible();
      await expect(schoolIcon).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    
    test('mobile menu toggles correctly', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      const menuToggle = page.locator('.menu-toggle');
      const nav = page.locator('nav');
      
      await expect(menuToggle).toBeVisible();
      
      // Open menu
      await menuToggle.click();
      await page.waitForTimeout(300);
      await expect(nav).toHaveClass(/active/);
      
      // Close menu
      await menuToggle.click();
      await page.waitForTimeout(300);
      await expect(nav).not.toHaveClass(/active/);
    });

    test('displays correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      await expect(page.locator('.logo')).toBeVisible();
      await expect(page.locator('.home-img img')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });

    test('displays correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      
      await expect(page.locator('.logo')).toBeVisible();
      await expect(page.locator('.home-img img')).toBeVisible();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    });
  });

  test.describe('Accessibility', () => {
    
    test('supports keyboard navigation', async ({ page }) => {
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName || 'BODY');
      expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
    });

    test('has accessible image alt text', async ({ page }) => {
      const profileImg = page.locator('.home-img img');
      await expect(profileImg).toHaveAttribute('alt');
    });

    test('external links are accessible', async ({ page }) => {
      const externalLinks = page.locator('a[href*="github.com"], a[href*="linkedin.com"]');
      const count = await externalLinks.count();
      
      expect(count).toBeGreaterThan(0);
      
      for (let i = 0; i < count; i++) {
        await expect(externalLinks.nth(i)).toBeVisible();
      }
    });
  });
});
