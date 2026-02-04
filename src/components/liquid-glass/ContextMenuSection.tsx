import { Button, ContextMenu, Divider, HStack, Menu, Section, Spacer, Text, Toggle, VStack } from "@expo/ui/swift-ui";
import {
  background,
  buttonStyle,
  cornerRadius,
  font,
  foregroundStyle,
  frame,
  labelStyle,
} from "@expo/ui/swift-ui/modifiers";
import React, { use } from "react";
import { AppContext } from "./AppContext";
import { AppState } from "./types";

export function ContextMenuSection() {
  const { contextMenuStates, updateContextMenuState, tasks, toggleTask } = use(AppContext) as AppState;

  const menuOptions = [
    {
      systemImage: "info.circle",
      title: "Task Overview",
      type: "button",
    },
    {
      title: "Filter Tasks",
      systemImage: "line.3.horizontal.decrease.circle",
      type: "submenu",
      items: [
        {
          title: "Show All",
          systemImage: "list.bullet",
          type: "button",
        },
        {
          title: "High Priority Only",
          systemImage: "exclamationmark.triangle.fill",
          type: "button",
        },
        {
          title: "Due Today",
          systemImage: "calendar.badge.clock",
          type: "button",
        },
        {
          title: "Overdue",
          systemImage: "calendar.badge.exclamationmark",
          type: "button",
        },
      ],
    },
    {
      title: "Show Completed Tasks",
      systemImage: "checkmark.circle",
      type: "switch",
      value: contextMenuStates["Show Completed Tasks"],
    },
    {
      title: "View Options",
      systemImage: "eye",
      type: "submenu",
      items: [
        {
          title: "Auto Refresh",
          systemImage: "arrow.clockwise",
          type: "switch",
          value: contextMenuStates["Auto Refresh"],
        },
        {
          title: "Notifications",
          systemImage: "bell",
          type: "switch",
          value: contextMenuStates["Notifications"],
        },
        {
          title: "Advanced Settings",
          systemImage: "gear",
          type: "submenu",
          items: [
            {
              title: "Dark Mode",
              systemImage: "moon.fill",
              type: "switch",
              value: contextMenuStates["Dark Mode"],
            },
            {
              title: "Reset All Settings",
              systemImage: "arrow.clockwise.circle",
              type: "button",
              destructive: true,
            },
            {
              title: "Export Data",
              systemImage: "square.and.arrow.up",
              type: "button",
            },
          ],
        },
      ],
    },
    {
      title: "Quick Actions",
      systemImage: "bolt",
      type: "submenu",
      items: [
        {
          title: "Mark All Complete",
          systemImage: "checkmark.circle.fill",
          type: "button",
        },
        {
          title: "Clear Completed",
          systemImage: "trash",
          type: "button",
          destructive: true,
        },
      ],
    },
    {
      title: "Help & Support",
      systemImage: "questionmark.circle",
      type: "button",
    },
  ];

  const renderMenuOption = (option: any, index: number): React.ReactElement | null => {
    switch (option.type) {
      case "button":
        return (
          <Button
            key={index}
            systemImage={option.systemImage}
            label={option.title}
            role={option.destructive ? "destructive" : undefined}
            onPress={() => {
              console.log(`Context menu action: ${option.title}`);
              // Handle specific actions
              if (option.title === "Mark All Complete") {
                tasks.filter((t) => !t.completed).forEach((task) => toggleTask(task.id));
              }
            }}
          />
        );

      case "switch":
        return (
          <Toggle
            key={index}
            isOn={option.value}
            label={option.title}
            onIsOnChange={(value) => {
              updateContextMenuState(option.title, value);
            }}
          />
        );

      case "submenu":
        return (
          <Menu key={index} label={option.title} systemImage={option.systemImage}>
            {option.items?.map((item: any, idx: number) => renderMenuOption(item, idx))}
          </Menu>
        );

      default:
        return null;
    }
  };

  return (
    <Section title="🔗 Menus & Actions">
      <VStack spacing={24}>
        <VStack spacing={8} alignment="center">
          <Text modifiers={[font({ size: 18, weight: "bold" })]}>Adaptive Menus</Text>
          <Text modifiers={[font({ size: 14 }), foregroundStyle("gray")]}>
            SwiftUI provides two main ways to offer additional actions: Context Menus (long-press) and Dropdown Menus
            (tap).
          </Text>
        </VStack>

        <VStack spacing={16} alignment="center">
          <VStack spacing={4} alignment="center">
            <Text modifiers={[font({ size: 14, weight: "semibold" })]}>Dropdown Menu (Menu Component)</Text>
            <Text modifiers={[font({ size: 12 }), foregroundStyle("secondary")]}>
              Standard menu that appears when you tap the button.
            </Text>
          </VStack>

          <HStack spacing={12} alignment="center">
            <Spacer />
            <Menu label="Options" systemImage="ellipsis.circle.fill" modifiers={[buttonStyle("bordered")]}>
              {menuOptions.map((option, index) => renderMenuOption(option, index))}
              <Divider />
              <Menu label="Advanced" systemImage="gearshape.2">
                <Button label="Stats" systemImage="chart.bar" onPress={() => {}} />
                <Button label="Labels" systemImage="tag" onPress={() => {}} />
              </Menu>
            </Menu>

            <Menu
              label="Primary"
              systemImage="play.circle.fill"
              onPrimaryAction={() => console.log("Primary Action Triggered")}
              modifiers={[buttonStyle("borderedProminent")]}
            >
              <Button label="Run Once" systemImage="play" onPress={() => {}} />
              <Button label="Schedule" systemImage="calendar" onPress={() => {}} />
              <Button label="Fast Run" systemImage="bolt" onPress={() => {}} />
            </Menu>

            <Menu label="Settings" systemImage="gear" modifiers={[labelStyle("iconOnly"), buttonStyle("bordered")]}>
              <Button label="Profile" systemImage="person" onPress={() => {}} />
              <Button label="Logout" systemImage="power" onPress={() => {}} />
            </Menu>
            <Spacer />
          </HStack>
        </VStack>

        <VStack spacing={16} alignment="center">
          <VStack spacing={4} alignment="center">
            <Text modifiers={[font({ size: 14, weight: "semibold" })]}>Context Menu (Long Press)</Text>
            <Text modifiers={[font({ size: 12 }), foregroundStyle("secondary")]}>
              Long press the element below to see the context-sensitive menu and preview.
            </Text>
          </VStack>

          <ContextMenu>
            <ContextMenu.Items>{menuOptions.map((option, index) => renderMenuOption(option, index))}</ContextMenu.Items>
            <ContextMenu.Trigger>
              <HStack
                spacing={8}
                alignment="center"
                modifiers={[background("#f8f9fa"), cornerRadius(12), frame({ height: 60 })]}
              >
                <Spacer />
                <Text modifiers={[font({ size: 16, weight: "medium" }), foregroundStyle("#495057")]}>
                  Hold to Explore
                </Text>
                <Spacer />
              </HStack>
            </ContextMenu.Trigger>
            <ContextMenu.Preview>
              <VStack spacing={12} modifiers={[background("white"), frame({ width: 250 })]}>
                <Text modifiers={[font({ size: 16, weight: "bold" })]}>Task Intelligence</Text>
                <Text modifiers={[font({ size: 14 }), foregroundStyle("gray")]}>
                  This preview can show dynamic content related to the element being held.
                </Text>
              </VStack>
            </ContextMenu.Preview>
          </ContextMenu>
        </VStack>

        <VStack spacing={8} alignment="leading" modifiers={[background("#f1f3f5"), cornerRadius(10)]}>
          <VStack spacing={4} alignment="leading" modifiers={[frame({ minHeight: 80 })]}>
            <Text modifiers={[font({ size: 13, weight: "semibold" })]}>Implementation Notes</Text>
            <Text modifiers={[font({ size: 11 }), foregroundStyle("secondary")]}>• Submenus: Nest Menu components</Text>
            <Text modifiers={[font({ size: 11 }), foregroundStyle("secondary")]}>
              • Primary Action: Split tap/hold behavior
            </Text>
            <Text modifiers={[font({ size: 11 }), foregroundStyle("secondary")]}>
              • labelStyle('iconOnly'): Compact triggers
            </Text>
          </VStack>
        </VStack>
      </VStack>
    </Section>
  );
}
