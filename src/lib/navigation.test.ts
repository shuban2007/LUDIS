// Ludis — Navigation Matching Validation Test Suite
// Verifies that for every authenticated route, EXACTLY ONE primary navigation item is active.

import {
  athleteNavItems,
  coachNavItems,
  isNavItemActive,
  validateActiveNavItemCount,
} from './navigation';

export function runNavigationTests(): { passed: boolean; log: string[] } {
  const log: string[] = [];
  let passed = true;

  const athleteTestMatrix = [
    { route: '/athlete', expectedActive: 'Dashboard' },
    { route: '/athlete/performance', expectedActive: 'Performance' },
    { route: '/athlete/performance/history', expectedActive: 'Performance' },
    { route: '/athlete/recovery', expectedActive: 'Recovery' },
    { route: '/athlete/fatigue', expectedActive: 'Fatigue' },
    { route: '/athlete/insights', expectedActive: 'Insights' },
    { route: '/athlete/events', expectedActive: 'Events' },
    { route: '/athlete/events/123', expectedActive: 'Events' },
    { route: '/athlete/progress', expectedActive: 'Progress' },
    { route: '/athlete/notifications', expectedActive: 'Notifications' },
    { route: '/athlete/profile', expectedActive: 'Profile' },
    { route: '/athlete/profile/settings', expectedActive: 'Profile' },
  ];

  const coachTestMatrix = [
    { route: '/coach', expectedActive: 'Dashboard' },
    { route: '/coach/teams', expectedActive: 'Teams' },
    { route: '/coach/athletes', expectedActive: 'Athletes' },
    { route: '/coach/athletes/usr-001', expectedActive: 'Athletes' },
    { route: '/coach/events', expectedActive: 'Events' },
    { route: '/coach/notifications', expectedActive: 'Notifications' },
    { route: '/coach/profile', expectedActive: 'Profile' },
  ];

  log.push('--- RUNNING ATHLETE NAVIGATION TESTS ---');
  for (const test of athleteTestMatrix) {
    const activeCount = validateActiveNavItemCount(test.route, athleteNavItems);
    const activeItems = athleteNavItems
      .filter((item) => isNavItemActive(test.route, item))
      .map((item) => item.label);

    const isMatch = activeItems.length === 1 && activeItems[0] === test.expectedActive;
    if (!isMatch) {
      passed = false;
      log.push(
        `[FAIL] Route "${test.route}": expected 1 active item ("${test.expectedActive}"), got count ${activeCount} (${activeItems.join(', ')})`
      );
    } else {
      log.push(`[PASS] Route "${test.route}" -> Active: "${activeItems[0]}" (Count: 1)`);
    }
  }

  log.push('--- RUNNING COACH NAVIGATION TESTS ---');
  for (const test of coachTestMatrix) {
    const activeCount = validateActiveNavItemCount(test.route, coachNavItems);
    const activeItems = coachNavItems
      .filter((item) => isNavItemActive(test.route, item))
      .map((item) => item.label);

    const isMatch = activeItems.length === 1 && activeItems[0] === test.expectedActive;
    if (!isMatch) {
      passed = false;
      log.push(
        `[FAIL] Route "${test.route}": expected 1 active item ("${test.expectedActive}"), got count ${activeCount} (${activeItems.join(', ')})`
      );
    } else {
      log.push(`[PASS] Route "${test.route}" -> Active: "${activeItems[0]}" (Count: 1)`);
    }
  }

  return { passed, log };
}

// Auto-run when executed directly via ts-node / node if needed
if (typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
  const result = runNavigationTests();
  console.log(result.log.join('\n'));
  if (!result.passed) process.exit(1);
}
