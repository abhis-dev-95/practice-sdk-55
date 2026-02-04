import { DatePicker, Picker, Section, Text } from "@expo/ui/swift-ui";
import { cornerRadius, datePickerStyle, font, frame, pickerStyle, tag } from "@expo/ui/swift-ui/modifiers";
import React, { use, useState } from "react";
import { AppContext } from "./AppContext";
import { AppState } from "./types";

export function DateTimeSection() {
  const { selectedDate, setSelectedDate } = use(AppContext) as AppState;
  const [pickerType, setPickerType] = useState(0);
  const [displayStyle, setDisplayStyle] = useState(0);

  const displayOptions = ["automatic", "compact", "graphical", "wheel"] as const;
  const typeOptions = ["date", "hourAndMinute", "dateAndTime"] as const;

  const getDisplayedComponents = () => {
    switch (typeOptions[pickerType]) {
      case "date":
        return ["date"] as const;
      case "hourAndMinute":
        return ["hourAndMinute"] as const;
      case "dateAndTime":
        return ["date", "hourAndMinute"] as const;
      default:
        return ["date"] as const;
    }
  };

  return (
    <Section title="📅 Date & Time Management">
      <Text modifiers={[font({ size: 16 })]}>{`Current Selection: ${selectedDate.toLocaleString()}`}</Text>

      <Picker
        modifiers={[pickerStyle("segmented")]}
        label="Display Style"
        selection={displayOptions[displayStyle]}
        onSelectionChange={(selection) => {
          setDisplayStyle(displayOptions.indexOf(selection as any));
        }}
      >
        {displayOptions.map((option) => (
          <Text key={option} modifiers={[tag(option)]}>
            {option}
          </Text>
        ))}
      </Picker>

      <Picker
        label="Picker Type"
        modifiers={[pickerStyle("menu")]}
        selection={typeOptions[pickerType]}
        onSelectionChange={(selection) => {
          setPickerType(typeOptions.indexOf(selection as any));
        }}
      >
        {typeOptions.map((option) => (
          <Text key={option} modifiers={[tag(option)]}>
            {option}
          </Text>
        ))}
      </Picker>

      <DatePicker
        title="Select Date/Time"
        onDateChange={(date) => {
          setSelectedDate(date);
        }}
        selection={selectedDate}
        displayedComponents={getDisplayedComponents() as any}
        modifiers={[
          datePickerStyle(displayOptions[displayStyle]),
          frame({ width: displayOptions[displayStyle] === "graphical" ? 350 : 300 }),
          cornerRadius(12),
        ]}
      />
    </Section>
  );
}
