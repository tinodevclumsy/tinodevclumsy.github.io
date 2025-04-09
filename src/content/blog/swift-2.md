---
title: Handling Unexpected nil Issues in SwiftUI .sheet and Solutions
description: ""
pubDate: 2025-03-01T02:29:35.236Z
image: "/images/blog/swift.png"
categories: ["Swift"]
---

## The Problem
In the initial code, when tapping a date, I stored the `currentDate` value in `selectedDate` and changed the `showSheet` state to display a sheet. Inside the sheet, I used an `if-else` statement to handle whether the date was nil. However, a problem occurred where on the first tap, the date was always nil and processed through the else statement.

```swift
@State private var selectedDate: Date? = nil
@State private var showSheet = false
// Date tap handling
.onTapGesture {
    selectedDate = currentDate
    showSheet = true
}
// Sheet display
.sheet(isPresented: $showSheet) {
    if let date = selectedDate {
        // Processing for when date exists
    } else {
        // Processing for nil case
    }
}
```

Searching online, I found quite a few similar situations.
[https://forums.developer.apple.com/forums/thread/694462](https://forums.developer.apple.com/forums/thread/694462)

## Problem Solution
Besides controlling a sheet with a simple boolean value, SwiftUI allows you to directly bind a value to be used in the sheet. The sheet opens when the bound value exists and automatically closes when it becomes nil.

### 1\. Creating an Identifiable Structure (struct)
To use the `.sheet(item:)` modifier, the type must conform to the `Identifiable` protocol. Since the `Date` type doesn't conform to this, I created a wrapper type.

```swift
struct IdentifiableDate: Identifiable {
    let id = UUID()
    let date: Date
}
@State private var selectedDate: IdentifiableDate? = nil
```

### 2\. Modifying onTapGesture
The selected date is wrapped in `IdentifiableDate` before storing.

```swift
// Date tap handling
.onTapGesture {
    // Wrap in IdentifiableDate
    selectedDate = IdentifiableDate(date: currentDate)
}
```

### 3\. Modifying sheet
Using the `item` modifier instead of `isPresented` to manage state.

```swift
// Sheet display
.sheet(item: $selectedDate) { date in
   // Work with date
   // Close sheet after work
   Button("Close") {
        selectedDate = nil
    }
}
```

---
Reference:
[https://developer.apple.com/documentation/swiftui/view/sheet(item:ondismiss:content:)](https://developer.apple.com/documentation/swiftui/view/sheet\(item:ondismiss:content:\))