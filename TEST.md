# Testing Strategy

## Test Pyramid

### Unit Tests
**Flask (pytest)**
- `wmata_client.get()` — verify retry logic on 429, 500, 502, 503, 504
- `get_train_arrivals()` — verify grouping logic by `{LocationCode}-{Group}`
- `Station.to_summary()` and `Station.to_detail()` — verify correct response shape

**Expo (Vitest + React Testing Library)**
- `StationsDropdown` — verify dropdown renders with provided stations
- `NextTrainsTable` — verify table renders correct rows for given arrivals
- `handleFetch` — verify error state is set on failure

**Component Development (Storybook)**
- Develop and document `NextTrainsTable` and `StationsDropdown` in isolation

### Integration Tests
- Server ↔ Database — verify seeding and station queries
- Server ↔ WMATA API — verify transformation and grouping of arrival predictions
- Client ↔ Server — verify correct rendering and error handling

### End-to-End Tests (Playwright)
```typescript
test('user looks up train arrivals', async ({ page }) => {
  await page.goto('http://localhost:8081');
  await page.getByLabel('Stations dropdown').selectOption('Metro Center');
  await expect(page.getByRole('table')).toBeVisible();
});

test('API is unavailable', async ({ page }) => {
  await page.goto('http://localhost:8081');
  await page.route('**/api/stations', route => route.abort());
  await expect(page.getByText('Failed to fetch stations')).toBeVisible();
});
```

### Visual Regression Tests
- Applitools on top of E2E tests to catch unintended UI changes