---
title: AdMob "No ad to show" Error Solution - Fixing Ad Display Issues with IDFA Test Device Registration
description: ""
pubDate: 2025-07-30T19:58:28.428Z
image: "/images/blog/swift_admob.png"
categories: ["Project"]
---

## Problem Description

About 3 months after launching the app, I discovered that AdMob ads were not displaying properly.
Test ads worked normally, but when testing with actual ad IDs, the following error occurred:

```
Error Domain=com.google.admob Code=1 "Request Error: No ad to show."
```

Despite waiting several days, the situation didn't improve. The AdMob console showed requests being recorded normally, but impressions remained at 0.

## Initial Approach

Initially, I took the "no ad to show" message at face value and considered adding mediation. However, it seemed strange that this phenomenon persisted for several days when the current traffic wasn't particularly high.

After searching through Reddit posts and other developer blogs, I found that many people had similar experiences. In most cases, **"silent policy violations"** were the cause, and test device registration was commonly recommended.

## Solution Attempt: Test Device Registration via IDFA

To solve the problem, I tried to register as an AdMob test device, which required the IDFA value. IDFA (Identifier for Advertisers) is a unique identifier used for ad tracking on iOS, and user consent has been required since iOS 14.

To register team members' devices as test devices as well, I created a View to check the IDFA as follows:

```swift
import SwiftUI
import AdSupport

struct GetIDFAView: View {
    var body: some View {
        let idfa = ASIdentifierManager.shared().advertisingIdentifier.uuidString
        ZStack {
            Text("\(idfa)")
        }
    }
}

#Preview {
    GetIDFAView()
}
```

If the IDFA value appears as all zeros like `00000000-0000-0000-0000-000000000000`, you need to enable the toggle in iPhone Settings: **Settings → Privacy & Security → Tracking → Select App** or **Settings → Apps → Select App → Allow Tracking**.

The obtained IDFA value can be registered in the Google AdMob console by navigating to **Settings → Test Devices → Add Test Device**.

## Results

![Github Issue](/images/blog/post/admob-1.jpeg)

When test devices are properly registered, you can see the "Test mode" text even in actual ads as shown above.

**The timeline was as follows:**

- **July 15th**: Ad impressions suddenly stopped (only requests, 0 impressions)
- **July 19th**: Registered IDFA as test device
- **July 21st**: Ad impressions resumed

While the exact causal relationship isn't clear, ads started showing again just two days after test device registration. Since this problem occurred without receiving any penalty messages or warnings from AdMob, I plan to register test devices from the development stage in future projects.
