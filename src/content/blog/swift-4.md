---
title: Exporting CoreData to JSON for Simulator Usage
description: ""
pubDate: 2025-09-14T00:36:45.253Z
image: "/images/blog/swift.png"
categories: ["Swift"]
---

## Problem

While preparing iPad support and taking App Store screenshots I found an annoying issue. My app has many calendar records but I haven't implemented device sync yet. This means I had to manually input all my iPhone data into the iPad simulator every time.

## Solution: CoreData Export Using JSON

You cannot directly export/import CoreData between real device and simulator. Instead I solved this by converting CoreData to JSON format and using JSON instead of CoreData in the simulator environment.

### Step 1: Export CoreData to JSON

First I wrote a function to convert all CoreData to JSON format on the real device:

```swift
import CoreData

func exportCoreDataToJSON() {
    let fetchRequest: NSFetchRequest<YourEntity> = YourEntity.fetchRequest()

    do {
        let objects = try context.fetch(fetchRequest)

        let jsonArray = objects.map { object in
            return [
                // Map according to your CoreData Attributes
            ]
        }

        let jsonData = try JSONSerialization.data(withJSONObject: jsonArray, options: .prettyPrinted)

        // Print JSON to console
        if let jsonString = String(data: jsonData, encoding: .utf8) {
            print(jsonString)
        }

    } catch {
        print("Export failed: \(error)")
    }
}
```

I considered saving the JSON file directly but finding the target folder on the device was also troublesome. Instead I decided to print the JSON to console and copy it manually. Then I created the JSON file directly in the project root and included it in the Bundle.

### Step 2: Environment-based Branching

In the ViewModel I implemented different data sources based on the execution environment:

```swift
private func fetchData(for date: Date) {
    #if targetEnvironment(simulator)
        loadDataFromJSON(for: date)
    #else
        fetchDataFromCoreData(for: date)
    #endif
}
```

Using the `#if targetEnvironment(simulator)` compiler directive I distinguished the execution environment at build time. The simulator loads data from JSON while the real device loads from CoreData.

### Step 3: JSON Data Loading and Mapping

I implemented logic to read JSON files included in the Bundle and convert them to Swift objects:

```swift
private func loadDataFromJSON(for date: Date) {
    // Load JSON file from Bundle, exported_data = json filename
    guard let fileURL = Bundle.main.url(forResource: "exported_data", withExtension: "json") else {
        print("Cannot find JSON file")
        self.entries = []
        return
    }

    do {
        let jsonData = try Data(contentsOf: fileURL)
        let jsonArray = try JSONSerialization.jsonObject(with: jsonData) as? [[String: Any]]

        // Convert JSON to Swift objects
        let filteredEntries = jsonArray?.compactMap { dict -> YourEntry? in
            guard //...
                // Data mapping
            else {
                return nil
            }

            return YourEntry(
                // Mapped data
            )
        } ?? []

        self.entries = filteredEntries.sorted { $0.date < $1.date }

    } catch {
        print("Failed to load JSON: \(error)")
        self.entries = []
    }
}
```

## Conclusion

Using this method of converting real device CoreData to JSON for simulator usage greatly improved my App Store submission preparation process.

Later I created language-specific JSON files which reduced the hassle of writing and deleting diary entries for different languages and saved time preparing previews. Additionally since I store Color data the content between previews became more consistent.

This approach helped me streamline the development workflow and create better App Store screenshots with realistic data.