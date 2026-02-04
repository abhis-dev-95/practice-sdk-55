import { ContentUnavailableView, HStack, Picker, Section, Text, Toggle, VStack } from "@expo/ui/swift-ui";
import { font, foregroundStyle } from "@expo/ui/swift-ui/modifiers";
import React, { use } from "react";
import { AppContext } from "./AppContext";
import { AppState } from "./types";

export function TaskManagementSection() {
  const { tasks, toggleTask, taskFilter, setTaskFilter } = use(AppContext) as AppState;

  const filterOptions = ["all", "pending", "completed"];
  const filterIndex = filterOptions.indexOf(taskFilter);

  const filteredTasks = tasks.filter((task) => {
    if (taskFilter === "all") return true;
    if (taskFilter === "pending") return !task.completed;
    if (taskFilter === "completed") return task.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "gray";
    }
  };

  return (
    <Section title="✅ Task Management">
      <Picker
        label="Filter Tasks"
        selection={filterOptions[filterIndex]}
        onSelectionChange={(selection) => {
          setTaskFilter(selection as "all" | "pending" | "completed");
        }}
      />

      {filteredTasks.length === 0 ? (
        <ContentUnavailableView
          title="No tasks found"
          systemImage="checkmark.circle"
          description={`No ${taskFilter} tasks at the moment`}
        />
      ) : (
        <VStack spacing={8}>
          {filteredTasks.map((task) => (
            <HStack key={task.id} spacing={12} alignment="center">
              <Text modifiers={[font({ size: 24 })]}>{task.emoji}</Text>
              <VStack spacing={4} alignment="leading">
                <HStack spacing={8} alignment="center">
                  <Text modifiers={[font({ size: 16 }), ...(task.completed ? [foregroundStyle("gray")] : [])]}>
                    {task.title}
                  </Text>
                  <Text modifiers={[font({ size: 12 }), foregroundStyle(getPriorityColor(task.priority))]}>
                    {task.priority.toUpperCase()}
                  </Text>
                </HStack>
                <Text modifiers={[font({ size: 14 }), foregroundStyle("gray")]}>{task.description}</Text>
                <Text modifiers={[font({ size: 12 }), foregroundStyle("gray")]}>
                  {`Due: ${task.dueDate.toLocaleDateString()}`}
                </Text>
              </VStack>
              <Toggle isOn={task.completed} onIsOnChange={() => toggleTask(task.id)} />
            </HStack>
          ))}
        </VStack>
      )}
    </Section>
  );
}
