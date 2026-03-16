import { test, expect } from '@playwright/test';

test.describe('Genre Picker', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the heading and description', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Avalanches Genre Picker' })).toBeVisible();
    await expect(page.getByText('Hit the button, get a random genre')).toBeVisible();
  });

  test('shows the logo image', async ({ page }) => {
    await expect(page.getByAltText('Ava Avalanches logo')).toBeVisible();
  });

  test('pick button is enabled by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Pick random Spotify genre' })).toBeEnabled();
  });

  test('settings panel opens and closes via gear icon', async ({ page }) => {
    const settingsButton = page.getByRole('button', { name: 'Open genre settings' });

    await expect(page.locator('#genre-settings')).not.toBeVisible();

    await settingsButton.click();
    await expect(page.locator('#genre-settings')).toBeVisible();

    await settingsButton.click();
    await expect(page.locator('#genre-settings')).not.toBeVisible();
  });

  test('settings panel shows correct genre count by default', async ({ page }) => {
    await page.getByRole('button', { name: 'Open genre settings' }).click();
    // 12 genres are selected by default out of 58 total
    await expect(page.getByText(/Genre settings \(12\/58\)/)).toBeVisible();
  });

  test('deselect all disables the pick button', async ({ page }) => {
    await page.getByRole('button', { name: 'Open genre settings' }).click();
    await page.getByRole('button', { name: 'Deselect all' }).click();

    await expect(page.getByRole('button', { name: /Select at least one genre/ })).toBeDisabled();
    await expect(page.getByText(/Genre settings \(0\/58\)/)).toBeVisible();
  });

  test('select all re-enables the pick button', async ({ page }) => {
    await page.getByRole('button', { name: 'Open genre settings' }).click();
    await page.getByRole('button', { name: 'Deselect all' }).click();
    await page.getByRole('button', { name: 'Select all', exact: true }).click();

    await expect(page.getByText(/Genre settings \(58\/58\)/)).toBeVisible();
    await page.getByRole('button', { name: 'Open genre settings' }).click();
    await expect(page.getByRole('button', { name: 'Pick random Spotify genre' })).toBeEnabled();
  });

  test('individual genre checkbox can be toggled', async ({ page }) => {
    await page.getByRole('button', { name: 'Open genre settings' }).click();

    const alternativeCheckbox = page.getByLabel('Alternative');
    await expect(alternativeCheckbox).toBeChecked();

    await alternativeCheckbox.click();
    await expect(alternativeCheckbox).not.toBeChecked();

    await alternativeCheckbox.click();
    await expect(alternativeCheckbox).toBeChecked();
  });

  test('picking a genre shows the reveal overlay', async ({ page }) => {
    // Override window.open to return a truthy value so the fallback window.location.href is not triggered
    await page.evaluate(() => { window.open = () => window; });

    await page.getByRole('button', { name: 'Pick random Spotify genre' }).click();

    await expect(page.getByText('Opening in Spotify')).toBeVisible();
  });

  test('shows last pick label after the reveal animation completes', async ({ page }) => {
    await page.evaluate(() => { window.open = () => window; });

    await page.getByRole('button', { name: 'Pick random Spotify genre' }).click();
    // Wait for the 1500ms reveal animation to finish
    await page.waitForTimeout(2000);

    await expect(page.getByText(/Last pick:/)).toBeVisible();
  });

  test('button changes to "Try another genre" after first pick', async ({ page }) => {
    await page.evaluate(() => { window.open = () => window; });

    await page.getByRole('button', { name: 'Pick random Spotify genre' }).click();
    await page.waitForTimeout(2000);

    await expect(page.getByRole('button', { name: 'Try another genre' })).toBeEnabled();
  });

  test('opens a Spotify genre URL via window.open', async ({ page }) => {
    await page.evaluate(() => {
      (window as any).__openCalls = [];
      window.open = (url?: string | URL | null) => {
        (window as any).__openCalls.push(String(url));
        return window;
      };
    });

    await page.getByRole('button', { name: 'Pick random Spotify genre' }).click();
    await page.waitForTimeout(2000);

    const openedUrl = await page.evaluate(() => (window as any).__openCalls[0]);
    expect(openedUrl).toMatch(/^https:\/\/open\.spotify\.com\/genre\//);
  });

  test('can pick multiple genres in sequence', async ({ page }) => {
    await page.evaluate(() => { window.open = () => window; });

    await page.getByRole('button', { name: 'Pick random Spotify genre' }).click();
    await page.waitForTimeout(2000);

    await page.getByRole('button', { name: 'Try another genre' }).click();
    await expect(page.getByText('Opening in Spotify')).toBeVisible();
    await page.waitForTimeout(2000);

    await expect(page.getByText(/Last pick:/)).toBeVisible();
  });
});
