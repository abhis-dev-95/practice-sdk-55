import { Button, Section, VStack } from "@expo/ui/swift-ui";
import { buttonStyle } from "@expo/ui/swift-ui/modifiers";
import React from "react";

export function ButtonsSection() {
  return (
    <Section title="🔘 Buttons">
      <VStack spacing={15}>
        <Button label="Default" />
        <Button label="Bordered" modifiers={[buttonStyle("bordered")]} />
        <Button label="Plain" modifiers={[buttonStyle("plain")]} />
        <Button label="Glass" modifiers={[buttonStyle("glass")]} />
        <Button label="Glass Prominent" modifiers={[buttonStyle("glassProminent")]} />
        <Button label="Bordered Prominent" modifiers={[buttonStyle("borderedProminent")]} />
        <Button label="Borderless" modifiers={[buttonStyle("borderless")]} />
      </VStack>
    </Section>
  );
}
