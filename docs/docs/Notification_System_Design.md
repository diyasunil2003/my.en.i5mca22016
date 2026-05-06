# Notification System Design - Stage 1

## Approach
To maintain the top 10 notifications efficiently, I implemented a custom sorting algorithm that utilizes a weighted ranking system.

## Priority Logic
1. **Categorical Weighting**: Notifications are assigned values (Placement: 3, Result: 2, Event: 1).
2. **Recency Factor**: Within the same category, items are sorted by their timestamps to ensure students see the latest updates first.

## Efficiency
The current implementation uses an O(N log N) sorting approach