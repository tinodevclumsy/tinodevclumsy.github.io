---
title: Implementing Placeholder in SwiftUI TextEditor
description: ""
pubDate: 2025-03-13T21:09:40.463Z
image: "/images/blog/swift.png"
categories: ["Swift"]
---

Unlike TextField, TextEditor does not natively provide a placeholder feature. We'll explore how to add a placeholder to TextEditor using ZStack.

## Problem
TextField allows for simple placeholder configuration:

```swift
TextField("placeholder text", text: $input)
```

Additionally, TextEditor does not provide a default border, requiring developers to manually add .overlay or .border modifiers to visually distinguish the input area. These missing basic elements create inconvenience for developers using TextEditor.

## Solution: Placeholder Implementation Using ZStack
To solve this problem, we can use ZStack to display a placeholder text over the TextEditor and hide it when the user enters text.

```swift
ZStack(alignment: .leading) {
    if note.isEmpty {
        VStack {
            Text("write something...")
                .padding(.top, 15)
                .padding(.leading, 20)
                .foregroundColor(.gray)
            Spacer(minLength: 60)
        }.zIndex(1)
    }

    VStack {
        TextEditor(text: $note)
            .frame(minHeight: 150)
            .padding(.horizontal, 20)
            .padding(.vertical, 5)
        Spacer()
    }.zIndex(0)
}
```

## Code Analysis
Let's examine this implementation step by step:

1. **Using ZStack**: ZStack is a container that stacks views along the z-axis. This allows placing the TextEditor and placeholder text on top of each other.

2. **Conditional Rendering**: The if note.isEmpty condition displays the placeholder only when the input field is empty.

3. **zIndex Setting**: Setting the placeholder text's zIndex to 1 and TextEditor's zIndex to 0 ensures the placeholder appears above the TextEditor.

4. **Alignment and Padding**: Setting ZStack's alignment to .leading and applying appropriate padding ensures the placeholder text appears in the correct position within the TextEditor.

5. **Styling**: Using foregroundColor(.gray) displays the placeholder text in gray, distinguishing it from the actual input text.

## Conclusion
Adding a placeholder to TextEditor is a common task in SwiftUI that is not natively supported. By utilizing ZStack and conditional rendering, this issue can be resolved.

A lingering question is why Apple still hasn't provided a basic placeholder feature for TextEditor. Given that TextField already has this functionality, extending the same API to TextEditor seems logical.