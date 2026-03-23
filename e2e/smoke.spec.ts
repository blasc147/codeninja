import { test, expect } from '@playwright/test';

test('home page loads with key content', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Aprendé a programar/i })).toBeVisible();
  await expect(page.getByText('CodeNinja').first()).toBeVisible();
  await expect(page.getByText('Ing. Blas Cabas Geat').first()).toBeVisible();
});

test('navbar links navigate correctly', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Cursos' }).first().click();
  await expect(page).toHaveURL('/cursos');
  await expect(page.getByText('En construcción')).toBeVisible();
});

test('playground page shows coming soon', async ({ page }) => {
  await page.goto('/playground');
  await expect(page.getByText('En construcción')).toBeVisible();
  await expect(page.getByText(/asistente de IA/i)).toBeVisible();
});

test('API endpoint returns 200', async ({ request }) => {
  const response = await request.post('/api/chat', {
    data: { message: 'test' },
  });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).toHaveProperty('reply');
});
