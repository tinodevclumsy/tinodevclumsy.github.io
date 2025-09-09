---
title: PHP Floating Point Issues and Safe Progress Calculation
description: ""
pubDate: 2025-09-09T21:11:52.341Z
image: ""
categories: ["Bug Fixes"]
---

## Problem
We got a bug report: a student completed all lessons but progress showed 99%. The actual data was 73/73, but the result was 99%. After checking, we found **floating point** was the cause.

## What is Floating Point Problem?
Computers use binary to store decimal numbers, which can cause small errors.

```php
var_dump(0.1 + 0.2); // float(0.30000000000000004)
```

## Why the Original Code Has Errors

1. **Division (`/`)** - `73 / 73 = 1.0` should be exact, but internally it might become `0.9999999999999999`

2. **Multiplication (`* 100`)** - Multiplying an already wrong number by 100 makes the error bigger (`0.9999999999999999 * 100 = 99.99999999999999`)

3. **Operation Order** - **(divide → multiply)** makes errors worse. A small division error becomes 100x bigger after multiplication

4. **round() Function Limit** - `round(99.99999999999999)` → `99`. Rounding an already wrong number gives wrong results

## Original Code
```php
$progressRate = round(($processedItemQty / $totalItemQty) * 100);
```
- $processedItemQty = 73, $totalItemQty = 73
- Should be 100% but got **99%**

## Fixed Safe Code
```php
// Multiply first, divide later to reduce errors
$progressRate = ($totalItemQty > 0) ? round(($processedItemQty * 100) / $totalItemQty) : 0;

// Keep result between 0-100%
return max(0, min(100, $progressRate));
```

### How is it Safe?

**1. Multiply First, Divide Later**
```php
// Original: (73 / 73) * 100
// Fixed: (73 * 100) / 73
```
- **Original**: `73 ÷ 73 = 0.9999999999999999` → `* 100 = 99.99999999999999` → `round() = 99`
- **Fixed**: `73 × 100 = 7300` (exact integer) → `÷ 73 = 100.0` → `round() = 100`

**2. Keep 0-100% Range**
- **max(0, ...)**: Prevents negative numbers (e.g., -1% → 0%)  
- **min(100, ...)**: Prevents over 100% (e.g., 101% → 100%)

**3. Prevent Division by Zero**
- `($totalItemQty > 0) ? ... : 0` → Returns 0% instead of error when dividing by zero

## Summary
1. **Multiply first, divide later** → Reduces floating point errors
2. **Use max/min for range limit** → Guarantees 0-100%

This method fixes the 99% problem and ensures 73/73 correctly shows 100%.